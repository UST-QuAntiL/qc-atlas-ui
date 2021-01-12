import { Component, Input, OnInit } from '@angular/core';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';

@Component({
  selector: 'app-compute-resource-provenance',
  templateUrl: './compute-resource-provenance.component.html',
  styleUrls: ['./compute-resource-provenance.component.scss']
})
export class ComputeResourceProvenanceComponent implements OnInit {

  @Input() computeResource: ComputeResourceDto;

  constructor() { }

  ngOnInit(): void {
  }

}
