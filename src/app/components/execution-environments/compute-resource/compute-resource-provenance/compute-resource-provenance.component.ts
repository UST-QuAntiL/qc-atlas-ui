// import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Node, Edge } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';

import { QpuService, QpuSearchControllerService } from 'api-qprov/services';
import { Qpu, QpuPropsGate, Gate } from 'api-qprov/models';

export interface GateAttribute {
  date: string;
  basisGate: string;
  gate: string | undefined;
  gateError: number | undefined;
  gateLength: number | undefined;
}

export interface QPUProp {
  key: string;
  label: string;
  icon: string;
  value?: number | string | Date;
}

@Component({
  selector: 'app-compute-resource-provenance',
  templateUrl: './compute-resource-provenance.component.html',
  styleUrls: ['./compute-resource-provenance.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ComputeResourceProvenanceComponent implements OnInit {
  @Input() computeResource: ComputeResourceDto;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // qraph
  center$: Subject<boolean> = new Subject();
  update$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  curve = shape.curveLinear;

  qGraphEdges: Edge[] = [];
  qGraphNodes: Node[] = [];
  qGraphEdgesS;
  qGraphNodesS;

  // qraph builder/handler
  qGraphHandler = {
    next: (gEdge): void => {
      const edgeList: string[] = [];
      const nodeSet: Set<number> = new Set();

      gEdge.forEach((edge) => {
        const sid: number = edge.source;
        const tid: number = edge.target;
        const eid: number = edge.id;

        // check if we know the source/target node already
        if (!nodeSet.has(sid)) {
          // add node to set
          nodeSet.add(sid);
          // add edge to graph
          this.qGraphNodes.push({ id: sid.toString(), label: sid.toString() });
        }
        if (!nodeSet.has(tid)) {
          // add node to set
          nodeSet.add(tid);
          // add edge to graph
          this.qGraphNodes.push({ id: tid.toString(), label: tid.toString() });
        }

        // check if we know this edge or its reverse already
        const nPairEdge: string = sid.toString() + tid.toString();
        const nPairEdgeRev: string = tid.toString() + sid.toString();
        if (!edgeList.includes(nPairEdge)) {
          // add edge and reverse edge to list
          edgeList.push(nPairEdge);
          edgeList.push(nPairEdgeRev);
          // add edge to graph
          this.qGraphEdges.push({
            id: eid.toString(),
            source: sid.toString(),
            target: tid.toString(),
          });
        }
      });

      // update graph (see: https://swimlane.github.io/ngx-graph/demos/interactive-demo#triggering-update)
      this.qGraphNodes = [...this.qGraphNodes];
      this.qGraphEdges = [...this.qGraphEdges];
      this.updateGraph();

      this.qGraphEdgesS = JSON.stringify(this.qGraphEdges);
      this.qGraphNodesS = JSON.stringify(this.qGraphNodes);
    },
  };

  // qpu
  qpu?: Qpu;
  gates?: Gate[];

  // gate table
  gateProps?: QpuPropsGate[] = [];
  gateTableHeader: string[] = [
    'date',
    'basisGate',
    'gate',
    'gateError',
    'gateLength',
  ];

  gateData: GateAttribute[] = [];
  gateDataSource: MatTableDataSource<GateAttribute>;

  // qpu properties
  qpuProperties: Set<QPUProp>;
  maxShots: QPUProp = {
    key: 'maxShots',
    label: 'Max. Shots',
    icon: 'settings_input_component',
  };
  maxCircuits: QPUProp = {
    key: 'maxExperiments',
    label: 'Max. Circuits',
    icon: 'nfc',
  };
  // fix key
  quantumVolume: QPUProp = {
    key: 'url',
    label: 'Quantum Volume',
    icon: '',
  };
  backendVersion: QPUProp = {
    key: 'backendVersion',
    label: 'Backend Version',
    icon: 'model_training',
  };
  nQubits: QPUProp = {
    key: 'nQubits',
    label: '# of Qubits',
    icon: 'blur_linear',
  };

  constructor(
    private qpuSearchControllerService: QpuSearchControllerService,
    private qpuService: QpuService
  ) {}

  // qraph
  centerGraph(): void {
    console.log('centering qraph...');
    this.center$.next(true);
  }
  fitGraph(): void {
    console.log('fitting qraph...');
    this.zoomToFit$.next(true);
  }
  updateGraph(): void {
    console.log('updating qraph...');
    this.update$.next(true);
  }

  // table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.gateDataSource.filter = filterValue.trim().toLowerCase();

    if (this.gateDataSource.paginator) {
      this.gateDataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    // fetch graph data
    this.qpuService
      .getQubitGraph({ backendName: this.computeResource.name })
      .subscribe(this.qGraphHandler);

    // fetch qpu data
    this.qpuSearchControllerService
      .executeSearchQpuGet({
        backendName: this.computeResource.name,
      })
      .subscribe((query) => {
        this.qpu = query;
        this.qpu.provider = this.qpu.provider?.toUpperCase();

        // fill qpu properties to show in ui
        this.nQubits.value = this.qpu.nQubits;
        this.backendVersion.value = this.qpu.backendVersion;
        this.maxCircuits.value = this.qpu.maxExperiments;
        this.maxShots.value = this.qpu.maxShots;
        this.qpuProperties = new Set([
          this.nQubits,
          this.maxShots,
          this.maxCircuits,
          this.backendVersion,
        ]);

        this.gates = this.qpu.gates;
        this.gateProps = this.qpu.properties?.gates;

        this.qpu.properties?.gates?.forEach((gate) => {
          let basisGate;
          this.qpu?.basisGates?.forEach((value) => {
            if (gate.name?.startsWith(value)) {
              basisGate = value;
            }
          });

          const gateError = gate.parameters.find(
            (value) => value.name === 'gate_error'
          ).value;

          const gateLength = gate.parameters.find(
            (value) => value.name === 'gate_length'
          ).value;

          this.gateData.push({
            date: String(gate.parameters[0].date),
            basisGate,
            gate: gate.name,
            gateError,
            gateLength,
          });
        });

        // create a mat-table with pahinator and sorting
        this.gateDataSource = new MatTableDataSource(this.gateData);
        this.gateDataSource.paginator = this.paginator;
        this.gateDataSource.sort = this.sort;
      });
  }
}
