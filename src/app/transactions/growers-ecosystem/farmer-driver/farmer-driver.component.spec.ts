import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDriverComponent } from './farmer-driver.component';

describe('FarmerDriverComponent', () => {
  let component: FarmerDriverComponent;
  let fixture: ComponentFixture<FarmerDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
