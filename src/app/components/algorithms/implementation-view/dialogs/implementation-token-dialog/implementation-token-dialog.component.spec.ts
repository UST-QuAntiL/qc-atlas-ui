import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationTokenDialogComponent } from './implementation-token-dialog.component';

describe('ImplementationTokenDialogComponent', () => {
  let component: ImplementationTokenDialogComponent;
  let fixture: ComponentFixture<ImplementationTokenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImplementationTokenDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementationTokenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
