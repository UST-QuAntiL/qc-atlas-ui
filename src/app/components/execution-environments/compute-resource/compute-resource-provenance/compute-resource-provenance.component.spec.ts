import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputeResourceProvenanceComponent } from './compute-resource-provenance.component';

describe('ComputeResourceProvenanceComponent', () => {
  let component: ComputeResourceProvenanceComponent;
  let fixture: ComponentFixture<ComputeResourceProvenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputeResourceProvenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputeResourceProvenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
