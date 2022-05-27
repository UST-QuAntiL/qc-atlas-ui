import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlrPropertiesComponent } from './slr-properties.component';

describe('SlrPropertiesComponent', () => {
  let component: SlrPropertiesComponent;
  let fixture: ComponentFixture<SlrPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlrPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlrPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
