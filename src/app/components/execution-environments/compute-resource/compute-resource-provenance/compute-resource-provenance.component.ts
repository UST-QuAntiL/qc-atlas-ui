import { Component, Input, OnInit } from '@angular/core';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { EntityModelQpuDto } from 'api-qprov/models/entity-model-qpu-dto';
import { EntityModelProviderDto } from 'api-qprov/models/entity-model-provider-dto';
import { ProviderService } from 'api-qprov/services/provider.service';
import { EntityModelGateDto } from 'api-qprov/models/entity-model-gate-dto';
import { EntityModelGateCharacteristicsDto } from 'api-qprov/models/entity-model-gate-characteristics-dto';
import { EntityModelQubitDto } from 'api-qprov/models/entity-model-qubit-dto';
import { EntityModelQubitCharacteristicsDto } from 'api-qprov/models/entity-model-qubit-characteristics-dto';
import { MatTableDataSource } from '@angular/material/table';

export interface Qubit {
  qubitDefinition: EntityModelQubitDto;
  qubitCharacteristics: EntityModelQubitCharacteristicsDto;
}

export interface Gate {
  gateDefinition: EntityModelGateDto;
  gateCharacteristics: EntityModelGateCharacteristicsDto;
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
    'Qubit Name',
    'Connected Qubits',
    'Calibration Date',
    'T1 Time',
    'T2 Time',
    'Readout-Error',
  ];
  tableColumnsQubits: string[] = [
    'Qubit Name',
    'Connected Qubits',
    'Calibration Date',
    'T1 Time',
    'T2 Time',
    'Readout-Error',
  ];
  displayedDataGates = [];
  variableNamesGates: string[] = [
    'Gate Name',
    'Operating Qubits',
    'Calibration Date',
    'Gate Fidelity',
    'Gate Time',
  ];
  tableColumnsGates: string[] = [
    'Gate Name',
    'Operating Qubits',
    'Calibration Date',
    'Gate Fidelity',
    'Gate Time',
  ];

  constructor(private providerService: ProviderService) {
  }

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

          // TODO: display details
          console.log('Ready');
          this.ready = true;
          return;
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
      console.error('Error while loading qpus!');
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
}
