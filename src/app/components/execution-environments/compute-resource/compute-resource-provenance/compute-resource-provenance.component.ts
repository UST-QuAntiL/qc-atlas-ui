import { Component, Input, OnInit } from '@angular/core';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { EntityModelQpuDto } from 'api-qprov/models/entity-model-qpu-dto';
import { EntityModelProviderDto } from 'api-qprov/models/entity-model-provider-dto';
import { ProviderService } from 'api-qprov/services/provider.service';
import * as shape from 'd3-shape';
import { Node, Edge } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';

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
      if (
        providerDto.name.toLowerCase() ===
        this.computeResource.vendor.toLowerCase()
      ) {
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
      if (
        qpuDto.name.toLowerCase() === this.computeResource.name.toLowerCase()
      ) {
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
          const qubit = {
            id: qubitDto.id,
            name: qubitDto.name,
            calibrationDate: '-',
            t1Time: '-',
            t2Time: '-',
            readoutError: '-',
          };

          this.providerService
            .getQubitCharacterisitcs({
              providerId: this.provider.id,
              qpuId: this.qpu.id,
              qubitId: qubitDto.id,
              latest: true,
            })
            .subscribe((qubitCharacteristicsResult) => {
              if (
                qubitCharacteristicsResult._embedded.qubitCharacteristicsDtoes
                  .length > 0
              ) {
                const currentCharacteristics =
                  qubitCharacteristicsResult._embedded
                    .qubitCharacteristicsDtoes[0];
                qubit.calibrationDate = new Date(
                  currentCharacteristics.calibrationTime
                ).toUTCString();
                qubit.t1Time = currentCharacteristics.t1Time.toString() + ' µs';
                qubit.t2Time = currentCharacteristics.t2Time.toString() + ' µs';
                qubit.readoutError =
                  currentCharacteristics.readoutError.toString() + '%';
              }
            });

          this.displayedDataQubits.push(qubit);

          // add details about gates on the current qubit
          this.addGateDataForQubit(qubitDto);
        }

        // generate topology graph nodes for the QPU
        this.generateTopologyGraphNodes();

        // update UI
        this.ready = true;
      });
  }

  /**
   * Add the data about the characteristics of the gates on the given qubit
   *
   * @param qubitDto the Dto of the qubit to retrieve the gates for
   */
  addGateDataForQubit(qubitDto): void {
    this.providerService
      .getGates({
        providerId: this.provider.id,
        qpuId: this.qpu.id,
        qubitId: qubitDto.id,
      })
      .subscribe((gateResponse) => {
        // iterate over qubits and retrieve characteristics and related gates
        const gatesToAdd = [];
        gateResponse._embedded.gateDtoes.forEach((gateDto) => {
          const gate = {
            id: gateDto.id,
            name: gateDto.name,
            operatingQubits: '-',
            multiQubit: false,
            calibrationDate: '-',
            gateTime: '-',
            gateFidelity: '-',
          };

          if (gateDto.multiQubitGate) {
            // filter duplicate gate entries from multiple
            if (this.getGateById(gateDto.id) !== null) {
              return;
            }

            const operatingQubitNames = [];
            for (const operatingQubit of gateDto.operatingQubits) {
              const qubit = this.getQubitById(operatingQubit);
              if (qubit !== null) {
                operatingQubitNames.push(qubit.name);
              }
            }

            gate.operatingQubits = operatingQubitNames.sort().join(', ');
            gate.multiQubit = true;
          } else {
            gate.operatingQubits = qubitDto.name;
          }

          // load gate characteristics
          this.providerService
            .getGateCharacterisitcs({
              providerId: this.provider.id,
              qpuId: this.qpu.id,
              qubitId: qubitDto.id,
              gateId: gateDto.id,
              latest: true,
            })
            .subscribe((gateCharacteristicsResult) => {
              if (
                gateCharacteristicsResult._embedded.gateCharacteristicsDtoes
                  .length > 0
              ) {
                const currentCharacteristics =
                  gateCharacteristicsResult._embedded
                    .gateCharacteristicsDtoes[0];
                gate.calibrationDate = new Date(
                  currentCharacteristics.calibrationTime
                ).toUTCString();

                if (currentCharacteristics.gateTime !== 0) {
                  gate.gateTime =
                    currentCharacteristics.gateTime.toString() + ' ns';
                }

                if (currentCharacteristics.gateFidelity !== 0) {
                  gate.gateFidelity =
                    currentCharacteristics.gateFidelity.toString() + ' %';
                }
              }
            });

          this.displayedDataGates.push(gate);
          gatesToAdd.push(gate);
        });

        // update topology graph for the QPU
        this.generateTopologyGraphEdges(gatesToAdd);
      });
  }

  /**
   * Generate the topology graph nodes from the qubits of the QPU
   */
  generateTopologyGraphNodes(): void {
    for (const qubit of this.displayedDataQubits) {
      const node: Node = {
        id: String(qubit.name),
        label: String('Q' + qubit.name),
      };
      this.nodes.push(node);
    }

    this.update$.next(true);
    this.zoomToFit$.next(true);
  }

  /**
   * Generate the topology graph nodes from the qubits of the QPU
   */
  generateTopologyGraphEdges(gatesToAdd): void {
    for (const gate of gatesToAdd) {
      // edges are only needed for multi-qubit gates
      if (gate.multiQubit) {
        const operatingQubits = gate.operatingQubits
          .replace(/ /g, '')
          .split(',');

        // only multi qubit gates on two qubits are supported
        if (operatingQubits.length !== 2) {
          continue;
        }

        this.edges.push({
          id: gate.name,
          label: gate.name,
          source: operatingQubits[0],
          target: operatingQubits[1],
        });
      }
    }

    this.update$.next(true);
    this.center$.next(true);
    this.zoomToFit$.next(true);
  }

  /**
   * Get a qubit by Id
   *
   * @param id the Id of the qubit to return
   */
  getQubitById(id): any {
    for (const qubit of this.displayedDataQubits) {
      if (qubit.id === id) {
        return qubit;
      }
    }
    return null;
  }

  /**
   * Get a gate by Id
   *
   * @param id the Id of the gate to return
   */
  getGateById(id): any {
    for (const gate of this.displayedDataGates) {
      if (gate.id === id) {
        return gate;
      }
    }
    return null;
  }

  centerGraph(): void {
    this.center$.next(true);
  }

  fitGraph(): void {
    this.zoomToFit$.next(true);
  }
}
