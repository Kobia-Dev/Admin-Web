import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOnboardingComponent } from './warehouse-onboarding.component';

describe('WarehouseOnboardingComponent', () => {
  let component: WarehouseOnboardingComponent;
  let fixture: ComponentFixture<WarehouseOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseOnboardingComponent]
    });
    fixture = TestBed.createComponent(WarehouseOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
