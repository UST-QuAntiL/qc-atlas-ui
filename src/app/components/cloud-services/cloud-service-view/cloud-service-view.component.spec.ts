import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudServiceViewComponent } from './cloud-service-view.component';

describe('CloudServiceViewComponent', () => {
  let component: CloudServiceViewComponent;
  let fixture: ComponentFixture<CloudServiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CloudServiceViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudServiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
