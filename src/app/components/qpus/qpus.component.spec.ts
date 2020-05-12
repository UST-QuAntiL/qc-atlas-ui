import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { QpusComponent } from "./qpus.component";

describe("QpusComponent", () => {
  let component: QpusComponent;
  let fixture: ComponentFixture<QpusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QpusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
