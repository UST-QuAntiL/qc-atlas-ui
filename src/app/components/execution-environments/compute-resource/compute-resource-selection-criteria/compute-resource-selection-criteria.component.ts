import { Component, Input, OnInit } from '@angular/core';

import { ComputeResourceDto } from 'api-atlas/models';
import { QpuService } from 'api-nisq/services';
import { QpuDto } from 'api-nisq/models';

@Component({
  selector: 'app-compute-resource-selection-criteria',
  templateUrl: './compute-resource-selection-criteria.component.html',
  styleUrls: ['./compute-resource-selection-criteria.component.scss'],
})
export class ComputeResourceSelectionCriteriaComponent implements OnInit {
  @Input()
  public computeResource: ComputeResourceDto;

  qpu?: QpuDto;

  constructor(private readonly nisqQpuService: QpuService) {}

  ngOnInit(): void {
    this.nisqQpuService.getQpus({}).subscribe((list) => {
      const found = list.qpuDtoList.find(
        (qpu) => qpu.name === this.computeResource.name
      );
      if (found) {
        this.qpu = found;
      } else {
        // TODO: create new QPU
        this.qpu = {};
      }
    });
  }

  saveQpu(): void {
    // TODO: missing endpoint in backend
  }
}
