import { EventEmitter, Injectable } from '@angular/core';
import { FieldUpdate } from '../util/FieldUpdate';

@Injectable({
  providedIn: 'root',
})
export class UpdateFieldEventService {
  updateAlgorithmFieldChannel: EventEmitter<FieldUpdate> = new EventEmitter<
    FieldUpdate
  >();

  updateImplementationFieldChannel: EventEmitter<
    FieldUpdate
  > = new EventEmitter<FieldUpdate>();

  updatePublicationFieldChannel: EventEmitter<FieldUpdate> = new EventEmitter<
    FieldUpdate
  >();

  updateSoftwarePlatformFieldChannel: EventEmitter<
    FieldUpdate
  > = new EventEmitter<FieldUpdate>();

  updateCloudServiceFieldChannel: EventEmitter<FieldUpdate> = new EventEmitter<
    FieldUpdate
  >();

  updateComputeResourceFieldChannel: EventEmitter<
    FieldUpdate
  > = new EventEmitter<FieldUpdate>();

  constructor() {}
}
