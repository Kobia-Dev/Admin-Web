import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDriverComponent } from './customer-driver.component';

describe('CustomerDriverComponent', () => {
  let component: CustomerDriverComponent;
  let fixture: ComponentFixture<CustomerDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
