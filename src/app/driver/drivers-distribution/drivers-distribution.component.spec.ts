import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversDistributionComponent } from './drivers-distribution.component';

describe('DriversDistributionComponent', () => {
  let component: DriversDistributionComponent;
  let fixture: ComponentFixture<DriversDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
