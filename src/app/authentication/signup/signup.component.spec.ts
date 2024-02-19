<<<<<<< HEAD
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { SignupComponent } from "./signup.component";
describe("SignupComponent", () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SignupComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
=======
>>>>>>> c7ab836d843e891b7fa981bf2c49347c4105b8bc
