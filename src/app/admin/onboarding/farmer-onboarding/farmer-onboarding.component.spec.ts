import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerOnboardingComponent } from './farmer-onboarding.component';

describe('FarmerOnboardingComponent', () => {
  let component: FarmerOnboardingComponent;
  let fixture: ComponentFixture<FarmerOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerOnboardingComponent]
    });
    fixture = TestBed.createComponent(FarmerOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
