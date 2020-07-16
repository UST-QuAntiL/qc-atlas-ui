import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationAlgorithmsListComponent } from './publication-algorithms-list.component';

describe('PublicationAlgorithmsListComponent', () => {
  let component: PublicationAlgorithmsListComponent;
  let fixture: ComponentFixture<PublicationAlgorithmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationAlgorithmsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationAlgorithmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
