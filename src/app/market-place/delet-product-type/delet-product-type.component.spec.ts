import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletProductTypeComponent } from './delet-product-type.component';

describe('DeletProductTypeComponent', () => {
  let component: DeletProductTypeComponent;
  let fixture: ComponentFixture<DeletProductTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletProductTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
