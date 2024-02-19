import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersDistributionComponent } from './farmers-distribution.component';

describe('FarmersDistributionComponent', () => {
  let component: FarmersDistributionComponent;
  let fixture: ComponentFixture<FarmersDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmersDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
