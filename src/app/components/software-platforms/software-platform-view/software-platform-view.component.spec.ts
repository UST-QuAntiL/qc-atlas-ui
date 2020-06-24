import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwarePlatformViewComponent } from './software-platform-view.component';

describe('SoftwarePlatformViewComponent', () => {
  let component: SoftwarePlatformViewComponent;
  let fixture: ComponentFixture<SoftwarePlatformViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwarePlatformViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwarePlatformViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
