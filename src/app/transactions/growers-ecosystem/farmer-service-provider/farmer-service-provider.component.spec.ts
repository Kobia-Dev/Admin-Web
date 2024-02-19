import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerServiceProviderComponent } from './farmer-service-provider.component';

describe('FarmerServiceProviderComponent', () => {
  let component: FarmerServiceProviderComponent;
  let fixture: ComponentFixture<FarmerServiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerServiceProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
