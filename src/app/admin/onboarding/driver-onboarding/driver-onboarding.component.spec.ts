import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverOnboardingComponent } from './driver-onboarding.component';

describe('DriverOnboardingComponent', () => {
  let component: DriverOnboardingComponent;
  let fixture: ComponentFixture<DriverOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverOnboardingComponent]
    });
    fixture = TestBed.createComponent(DriverOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
