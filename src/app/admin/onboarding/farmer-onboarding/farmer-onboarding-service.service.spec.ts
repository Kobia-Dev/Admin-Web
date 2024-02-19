import { TestBed } from '@angular/core/testing';

import { FarmerOnboardingServiceService } from './farmer-onboarding-service.service';

describe('FarmerOnboardingServiceService', () => {
  let service: FarmerOnboardingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerOnboardingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
