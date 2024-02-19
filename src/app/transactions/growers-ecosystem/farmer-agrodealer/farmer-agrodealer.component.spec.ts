import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerAgrodealerComponent } from './farmer-agrodealer.component';

describe('FarmerAgrodealerComponent', () => {
  let component: FarmerAgrodealerComponent;
  let fixture: ComponentFixture<FarmerAgrodealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerAgrodealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerAgrodealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
