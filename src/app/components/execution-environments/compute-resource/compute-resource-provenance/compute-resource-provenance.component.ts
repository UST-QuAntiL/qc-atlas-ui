import { Subscription } from 'rxjs';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatSort } from '@angular/material/sort';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { EntityModelComputeResourcePropertyDto } from 'api-atlas/models/entity-model-compute-resource-property-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services';
import { CreateQpuRequestDto, QpuDto, SdkDto } from 'api-nisq/models';

// import { QpuSearchControllerService } from 'api-qprov/services';
import { QpuSearchControllerService } from '../../../../../../generated/api-qprov/services';
import {
  Qpu,
  QpuProperties,
  QpuPropsGate,
  Gate,
  Parameter,
} from '../../../../../../generated/api-qprov/models';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';
import { quantumComputationModelOptions } from '../../../../util/options';

export interface GateAttribute {
  date: string;
  basisGate: string;
  gate: string;
  gateError: number;
  gateLength: number;
}

export interface GateAttrs {
  date: string;
  gate: string;
  gateError: number;
  gateLength: number;
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

  computeResourceProperties: EntityModelComputeResourcePropertyDto[] = [];
  availableQuantumComputationModelOptions = quantumComputationModelOptions;
  qpu?: Qpu;
  gates?: Gate[];

  step = 4;
  gateParams?: Map<string, Map<string, Parameter[]>> = new Map();
  gateProps?: QpuPropsGate[] = [];

  valuesToShow?: Array<Map<string, any>> = [];

  displayedColumns: string[] = ['id', 'name', 'parameters', 'qasmDef'];
  columnsToDisplay: string[] = ['id', 'name', 'parameters', 'qasmDef'];
  gatePropsColumns: string[] = ['gate', 'name', 'parameters', 'qubits'];
  gateTableHeader: string[] = [
    'date',
    'basisGate',
    'gate',
    'gateError',
    'gateLength',
  ];

  gateData: GateAttribute[] = [];
  gateDataSource: MatTableDataSource<GateAttribute>;

  gateReduceData: GateAttribute;
  gateReduceMap: Map<string, GateAttrs[]> = new Map();
  gateReduceDataSource: MatTableDataSource<GateAttribute>;

  DATA;
  spans = [];

  expandedElement: Parameter | null;

  constructor(
    private executionEnvironmentService: ExecutionEnvironmentsService,
    private updateFieldService: UpdateFieldEventService,
    private qpuSearchService: QpuSearchControllerService
  ) {
    // this.cacheSpan('Basis Gate', (d) => d.basisGate);
    // console.log(this.spans);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.gateDataSource.filter = filterValue.trim().toLowerCase();

    if (this.gateDataSource.paginator) {
      this.gateDataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    // this.gateDataSource.paginator = this.paginator;
    // this.gateDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    console.log(this.computeResource.name);

    this.qpuSearchService
      .executeSearchQpuGet({
        backendName: this.computeResource.name,
      })
      .subscribe((query) => {
        this.qpu = query;
        this.gates = this.qpu.gates;
        this.gateProps = this.qpu.properties.gates;

        this.qpu.properties.gates.forEach((gate) => {
          let basisGate;
          this.qpu.basisGates.forEach((value, index, array) => {
            if (gate.name.startsWith(value)) {
              basisGate = value;
            }
          });

          const gateError = gate.parameters.find(
            (value, _index) => value.name === 'gate_error'
          ).value;

          const gateLength = gate.parameters.find(
            (value, _index) => value.name === 'gate_length'
          ).value;

          this.gateData.push({
            date: String(gate.parameters[0].date),
            basisGate,
            gate: gate.name,
            gateError,
            gateLength,
          });
        });

        this.gateDataSource = new MatTableDataSource(this.gateData);
        this.gateDataSource.paginator = this.paginator;
        this.gateDataSource.sort = this.sort;
      });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
