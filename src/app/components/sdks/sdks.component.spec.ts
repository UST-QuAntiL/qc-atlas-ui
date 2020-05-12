import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SdksComponent } from "./sdks.component";

describe("SdksComponent", () => {
  let component: SdksComponent;
  let fixture: ComponentFixture<SdksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SdksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
