import { Component, Input, OnInit } from '@angular/core';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { EntityModelQpuDto } from 'api-qprov/models/entity-model-qpu-dto';
import { EntityModelProviderDto } from 'api-qprov/models/entity-model-provider-dto';
import { ProviderService } from 'api-qprov/services/provider.service';
import * as shape from 'd3-shape';
import { Node, Edge } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';

export class Qubit {
  name: string;
  calibrationDate: string;
  t1Time: string;
  t2Time: string;
  readoutError: string;
}

export class Gate {
  name: string;
  operatingQubits: string;
  calibrationDate: string;
  gateFidelity: string;
  gateTime: string;
}

@Component({
  selector: 'app-compute-resource-provenance',
  templateUrl: './compute-resource-provenance.component.html',
  styleUrls: ['./compute-resource-provenance.component.scss'],
})
export class ComputeResourceProvenanceComponent implements OnInit {
  @Input() computeResource: ComputeResourceDto;

  ready?: boolean;
  provider?: EntityModelProviderDto;
  qpu?: EntityModelQpuDto;

  // fields for the tables
  displayedDataQubits = [];
  variableNamesQubits: string[] = [
    'name',
    'calibrationDate',
    't1Time',
    't2Time',
    'readoutError',
  ];
  tableColumnsQubits: string[] = [
    'Qubit Name',
    'Calibration Date',
    'T1 Time',
    'T2 Time',
    'Readout-Error',
  ];
  displayedDataGates = [];
  variableNamesGates: string[] = [
    'name',
    'operatingQubits',
    'calibrationDate',
    'gateFidelity',
    'gateTime',
  ];
  tableColumnsGates: string[] = [
    'Gate Name',
    'Operating Qubits',
    'Calibration Date',
    'Gate Fidelity',
    'Gate Time',
  ];

  // fields for the topology graph
  curve = shape.curveBundle;
  center$: Subject<boolean> = new Subject();
  update$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  edges: Edge[] = [];
  nodes: Node[] = [];

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    // load providers from QProv
    this.providerService.getProviders().subscribe((result) => {
      // abort if provider is not found
      this.getProviderDtoByName(result);
      if (!this.provider) {
        console.error('Provider with given name not found!');
        this.ready = true;
        return;
      }

      // search for QPU with given name from the given provider
      this.providerService
        .getQpUs({ providerId: this.provider.id })
        .subscribe((qpuResult) => {
          // abort if QPU is not found
          this.getQpuDtoByProviderAndName(qpuResult);
          if (!this.qpu) {
            console.error('QPU with given name not found!');
            this.ready = true;
            return;
          }

          // add qubit data
          this.addQubitDataForQpu();
        });
    });
  }

  /**
   * Update the provider with the resulting dto from the QProv API if available
   *
   * @param result the response from the QProv API with all available providers
   */
  getProviderDtoByName(result): void {
    if (result === null) {
      console.error('Error while loading provider!');
      return;
    }

    // search for provider specified in computeResource
    for (const providerDto of result._embedded.providerDtoes) {
      if (providerDto.name === this.computeResource.vendor) {
        this.provider = providerDto;
        return;
      }
    }
  }

  /**
   * Update the qpu with the resulting dto from the QProv API if available
   *
   * @param result the response from the QProv API with all available qpus from the provider
   */
  getQpuDtoByProviderAndName(result): void {
    if (result === null) {
      console.error('Error while loading QPUs!');
      return;
    }

    // search for qpu specified in computeResource
    for (const qpuDto of result._embedded.qpuDtoes) {
      if (qpuDto.name === this.computeResource.name) {
        this.qpu = qpuDto;
        return;
      }
    }
  }

  /**
   * Add the data about the characteristics of the qubits of the QPU
   */
  addQubitDataForQpu(): void {
    this.providerService
      .getQubits({ providerId: this.provider.id, qpuId: this.qpu.id })
      .subscribe((qubitResult) => {
        // iterate over qubits and retrieve characteristics and related gates
        for (const qubitDto of qubitResult._embedded.qubitDtoes) {
          const qubit = new Qubit();
          qubit.name = qubitDto.name;

          this.providerService
            .getQubitCharacterisitcs({
              providerId: this.provider.id,
              qpuId: this.qpu.id,
              qubitId: qubitDto.id,
              latest: true,
            })
            .subscribe((qubitCharacteristicsResult) => {

              // add entries if no characteristics are available
              if (
                qubitCharacteristicsResult._embedded.qubitCharacteristicsDtoes
                  .length < 1
              ) {
                qubit.calibrationDate = '-';
                qubit.t1Time = '-';
                qubit.t2Time = '-';
                qubit.readoutError = '-';
              } else {
                const currentCharacteristics =
                  qubitCharacteristicsResult._embedded
                    .qubitCharacteristicsDtoes[0];
                qubit.calibrationDate = new Date(
                  currentCharacteristics.calibrationTime
                ).toUTCString();
                qubit.t1Time = currentCharacteristics.t1Time.toString() + ' ns';
                qubit.t2Time = currentCharacteristics.t2Time.toString() + ' ns';
                qubit.readoutError =
                  currentCharacteristics.readoutError.toString() + '%';
              }
            });

          this.displayedDataQubits.push(qubit);

          // add details about gates on the current qubit
          this.addGateDataForQubit(qubitDto.id);
        }

        // update UI
        this.ready = true;
      });
  }

  /**
   * Add the data about the characteristics of the gates on the given qubit
   *
   * @param qubitId
   */
  addGateDataForQubit(qubitId): void {
    console.log(qubitId);
    // TODO
  }

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
}
