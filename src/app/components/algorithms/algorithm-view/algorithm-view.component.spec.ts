import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmViewComponent } from './algorithm-view.component';

describe('AlgorithmViewComponent', () => {
  let component: AlgorithmViewComponent;
  let fixture: ComponentFixture<AlgorithmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
