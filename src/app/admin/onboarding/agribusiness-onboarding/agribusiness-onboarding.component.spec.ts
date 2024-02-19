import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgribusinessOnboardingComponent } from './agribusiness-onboarding.component';

describe('AgribusinessOnboardingComponent', () => {
  let component: AgribusinessOnboardingComponent;
  let fixture: ComponentFixture<AgribusinessOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgribusinessOnboardingComponent]
    });
    fixture = TestBed.createComponent(AgribusinessOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
