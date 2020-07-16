import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationPropertiesComponent } from './publication-properties.component';

describe('PublicationPropertiesComponent', () => {
  let component: PublicationPropertiesComponent;
  let fixture: ComponentFixture<PublicationPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
