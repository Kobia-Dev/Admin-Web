import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFarmerComponent } from './customer-farmer.component';

describe('CustomerFarmerComponent', () => {
  let component: CustomerFarmerComponent;
  let fixture: ComponentFixture<CustomerFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFarmerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
