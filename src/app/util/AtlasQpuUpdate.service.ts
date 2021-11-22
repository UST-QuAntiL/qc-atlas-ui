import { Injectable } from '@angular/core';
import { ComputeResourceDto } from 'generated/api-atlas/models';
import { ExecutionEnvironmentsService } from 'generated/api-atlas/services';
import { EntityModelQpuDto } from 'generated/api-qprov/models';
import { ProviderService } from 'generated/api-qprov/services/provider.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AtlasQpuUpdateService {
  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private providerService: ProviderService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  runQpuUpdate(): void {
    this.executionEnvironmentsService
      .getComputeResources()
      .subscribe((data) => {
        this.providerService.getProviders().subscribe((result) => {
          this.getListOfProvidersAndQpus(result, data.content);
        });
      });
  }

  getListOfProvidersAndQpus(result, computeResources): void {
    if (result === null || result._embedded == null) {
      console.error('Error while loading provider!');
      return;
    } else {
      result._embedded.providerDtoes.forEach((providerDto) => {
        this.providerService
          .getQpUs({ providerId: providerDto.id })
          .subscribe((res) => {
            const qpus = res._embedded.qpuDtoes;
            const vendor = providerDto.name;
            this.AddAllQpusFromQprov(vendor, qpus, computeResources);
          });
      });
    }
  }

  AddAllQpusFromQprov(
    vendor: string,
    qpus: EntityModelQpuDto[],
    computeResources: ComputeResourceDto[]
  ): void {
    if (computeResources.length > 0) {
      const relevantVendorQpuNames = computeResources
        .filter(
          (computeResource) => computeResource.vendor.trim() === vendor.trim()
        )
        .map((each) => each.name);
      qpus.forEach((element) => {
        if (!relevantVendorQpuNames.includes(element.name)) {
          const computeResourceDto: ComputeResourceDto = {
            id: null,
            name: element.name,
            vendor,
          };
          this.executionEnvironmentsService
            .createComputeResource({ body: computeResourceDto })
            .subscribe(
              (computeResource: ComputeResourceDto) => {
                console.log('Added to Atlas DB ', computeResource.name);
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Could not create compute resource from qprov'
                );
              }
            );
        }
      });
    } else {
      qpus.forEach((element) => {
        const computeResourceDto: ComputeResourceDto = {
          id: null,
          name: element.name,
          vendor,
        };
        this.executionEnvironmentsService
          .createComputeResource({ body: computeResourceDto })
          .subscribe(
            (computeResource: ComputeResourceDto) => {
              console.log('Added to Atlas DB ', computeResource.name);
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Could not create compute resource from qprov'
              );
            }
          );
      });
    }
  }
}
