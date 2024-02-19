import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfProductTableComponent } from './type-of-product-table.component';

describe('TypeOfProductTableComponent', () => {
  let component: TypeOfProductTableComponent;
  let fixture: ComponentFixture<TypeOfProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfProductTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
