import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOnboardingComponent } from './customer-onboarding.component';

describe('CustomerOnboardingComponent', () => {
  let component: CustomerOnboardingComponent;
  let fixture: ComponentFixture<CustomerOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerOnboardingComponent]
    });
    fixture = TestBed.createComponent(CustomerOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
