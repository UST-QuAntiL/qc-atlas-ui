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

import { QpuService } from '../../../../../../generated/api-qprov/services';
import { Qpu, Gate } from '../../../../../../generated/api-qprov/models';

export interface GateAttribute {
  gateDate: string;
  // basisGate: string;
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

  curve = shape.curveBundle;

  qGraphEdges: Edge[] = [];
  qGraphNodes: Node[] = [];

  // qpu
  qpu?: Qpu;
  gates?: Gate[];
  bGates?: Gate[];

  // gate table
  // gateProps?: QpuPropsGate[] = [];
  gateTableHeader: string[] = ['gateDate', 'gate', 'gateError', 'gateLength'];

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

  constructor(private qpuService: QpuService) {}

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
    // fetch qpu data
    this.qpuService
      .findByQpuCompKeyBackendName({
        backendName: this.computeResource.name,
      })
      .subscribe((query) => {
        this.qpu = query;
        if (this.qpu === null) {
          return;
        }
        this.qpu.providerId = this.qpu.providerId?.toUpperCase();

        // convert timestamps to milliseconds format
        this.qpu.onlineDate = String(Number(this.qpu.onlineDate) * 1000);
        this.qpu.lastUpdateDate = String(
          Number(this.qpu.lastUpdateDate) * 1000
        );

        // fill qpu properties to show in ui
        this.nQubits.value = this.qpu.nqubits;
        this.backendVersion.value = this.qpu.backendVersion;
        this.maxCircuits.value = this.qpu.maxExperiments;
        this.maxShots.value = this.qpu.maxShots;
        this.qpuProperties = new Set([
          this.nQubits,
          this.maxShots,
          this.maxCircuits,
          this.backendVersion,
        ]);

        // Qraph
        const nodeSet: Set<string> = new Set();
        const edgeList: string[] = [];

        // Qraph Nodes
        this.qpu.qubits?.forEach((qubit) => {
          const t1 = qubit.parameters?.find((param) => param.name === 't1')
            ?.value;
          const t2 = qubit.parameters?.find((param) => param.name === 't2')
            ?.value;
          const readoutError = qubit.parameters?.find(
            (param) => param.name === 'readout_error'
          )?.value;

          const tooltip: string =
            'T1: <strong>' +
            t1 +
            '</strong><br />' +
            'T2: ' +
            t2 +
            '<br />Readout Error: ' +
            readoutError;

          const qN: Node = {
            id: String(qubit.providerGivenId),
            label: String('Q' + qubit.providerGivenId),
            data: { t1, t2, tooltip },
          };

          // check if we know the source/target node already
          if (qN.label && !nodeSet.has(qN.label)) {
            // add node to set
            nodeSet.add(qN.label);
            // add edge to graph
            this.qGraphNodes.push(qN);
          }
        });

        this.gates = this.qpu.gates;
        this.bGates = this.gates?.filter((gate) => gate.qasmDef);
        this.bGates?.forEach(
          (bg) => (bg.qasmDef = bg.qasmDef?.replace('gate ', ''))
        );

        this.gates?.forEach((gate) => {
          const gateDate = String(
            Number(gate.gateParameters?.find((param) => param.date)?.value) *
              1000
          );
          const gateError = gate.gateParameters?.find(
            (param) => param.name === 'gate_error'
          )?.value;
          const gateLength = gate.gateParameters?.find(
            (param) => param.name === 'gate_error'
          )?.value;

          if (gateDate) {
            this.gateData.push({
              gateDate,
              gate: gate.name,
              gateError,
              gateLength,
            });
          }

          // Qraph Edges
          if (gate.qubits?.length === 2) {
            const sid = Number(gate.qubits?.sort().pop());
            const tid = Number(gate.qubits?.pop());
            const eid = String(gate.name);

            // check if we know this edge or its reverse already
            const nPairEdge: string = sid.toString() + tid.toString();
            const nPairEdgeRev: string = tid.toString() + sid.toString();
            const tooltip: string =
              'Error: ' + gateError + '<br />' + 'Length: ' + gateLength;

            if (!edgeList.includes(nPairEdge)) {
              // add edge and reverse edge to list
              edgeList.push(nPairEdge);
              edgeList.push(nPairEdgeRev);
              // add edge to graph
              this.qGraphEdges.push({
                id: eid,
                label: eid,
                source: sid.toString(),
                target: tid.toString(),
                data: { tooltip },
              });
            }
          }
        });

        this.qGraphNodes = [...this.qGraphNodes];
        this.qGraphEdges = [...this.qGraphEdges];
        this.updateGraph();

        // create a mat-table with pahinator and sorting
        this.gateDataSource = new MatTableDataSource(this.gateData);
        this.gateDataSource.paginator = this.paginator;
        this.gateDataSource.sort = this.sort;
      });
  }
}
