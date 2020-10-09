import { cloneDeep } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ComputeResourceDto, SoftwarePlatformDto } from 'api-atlas/models';
import { ExecutionEnvironmentsService } from 'api-atlas/services';
import { CreateQpuRequestDto, QpuDto, SdkDto } from 'api-nisq/models';
import { QpuService, SdksService } from 'api-nisq/services';
import { ChangePageGuard } from '../../../../services/deactivation-guard';

const selectUsedSdks = (
  softwarePlatforms: SoftwarePlatformDto[],
  sdks: SdkDto[]
): SdkDto[] =>
  sdks.filter((sdk) => !!softwarePlatforms.find((sp) => sp.name === sdk.name));

@Component({
  selector: 'app-compute-resource-selection-criteria',
  templateUrl: './compute-resource-selection-criteria.component.html',
  styleUrls: ['./compute-resource-selection-criteria.component.scss'],
})
export class ComputeResourceSelectionCriteriaComponent implements OnInit {
  @Input()
  public computeResource: ComputeResourceDto;

  oldQpu?: QpuDto;
  qpu?: QpuDto;

  constructor(
    public readonly guard: ChangePageGuard,
    private readonly nisqQpuService: QpuService,
    private readonly sdkService: SdksService,
    private readonly executionEnvironmentsService: ExecutionEnvironmentsService
  ) {}

  ngOnInit(): void {
    this.nisqQpuService.getQpus({}).subscribe((list) => {
      const found = list.qpuDtoList.find(
        (qpu) => qpu.name === this.computeResource.name
      );
      if (found) {
        this.qpu = found;
        this.oldQpu = cloneDeep(found);
      } else {
        this.createNewQpu();
      }
    });
  }

  saveQpu(): void {
    this.collectSdkIds().subscribe((supportedSdkIds) => {
      const body: CreateQpuRequestDto = {
        supportedSdkIds,
        ...this.qpu,
      };
      this.nisqQpuService
        .updateQpu({ qpuId: this.qpu.id, body })
        .subscribe((newQpu) => {
          this.qpu = newQpu;
          this.oldQpu = cloneDeep(newQpu);
        });
    });
  }

  private createNewQpu(): void {
    this.collectSdkIds().subscribe((supportedSdkIds) => {
      const body: CreateQpuRequestDto = {
        name: this.computeResource.name,
        supportedSdkIds,
      };
      this.nisqQpuService.createQpu({ body }).subscribe((newQpu) => {
        this.qpu = newQpu;
        this.oldQpu = cloneDeep(newQpu);
      });
    });
  }

  private collectSdkIds(): Observable<string[]> {
    // Concurrently get all existing Software Platforms / SDKs
    const existingResources = forkJoin([
      this.executionEnvironmentsService.getSoftwarePlatformsOfComputeResource({
        computeResourceId: this.computeResource.id,
        page: -1,
        size: -1,
      }),
      this.sdkService.getSdks(),
    ]);

    // Create any missing SDKs and add them to our SDK list
    const synchronizedResources = existingResources.pipe(
      switchMap(([softwarePlatforms, sdks]) =>
        this.synchronizeSdks(
          softwarePlatforms._embedded?.softwarePlatforms ?? [],
          sdks.sdkDtos
        )
      )
    );

    return synchronizedResources.pipe(
      map(([softwarePlatforms, sdks]) =>
        selectUsedSdks(softwarePlatforms, sdks).map((sdk) => sdk.id)
      )
    );
  }

  // Create needed SDKs and return a list of all SDKs
  private synchronizeSdks(
    softwarePlatforms: SoftwarePlatformDto[],
    sdks: SdkDto[]
  ): Observable<[SoftwarePlatformDto[], SdkDto[]]> {
    const toCreate = softwarePlatforms.filter(
      (sp) => !sdks.find((sdk) => sdk.name === sp.name)
    );
    console.log(`Need to create ${toCreate.length} SDKs`);
    return forkJoin([
      of(softwarePlatforms),
      forkJoin(
        toCreate
          .map((sp) => {
            const body: SdkDto = {
              name: sp.name,
            };
            return this.sdkService.createSdk({ body });
          })
          .concat(sdks.map((sdk) => of(sdk)))
      ),
    ]);
  }
}
