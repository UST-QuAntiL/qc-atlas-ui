import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationImplementationsListComponent } from './publication-implementations-list.component';

describe('PublicationImplementationsListComponent', () => {
  let component: PublicationImplementationsListComponent;
  let fixture: ComponentFixture<PublicationImplementationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationImplementationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationImplementationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
