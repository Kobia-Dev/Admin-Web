import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersProductsComponent } from './farmers-products.component';

describe('FarmersProductsComponent', () => {
  let component: FarmersProductsComponent;
  let fixture: ComponentFixture<FarmersProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmersProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
