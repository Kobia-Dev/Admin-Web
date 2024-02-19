import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrodealerProductsComponent } from './agrodealer-products.component';

describe('AgrodealerProductsComponent', () => {
  let component: AgrodealerProductsComponent;
  let fixture: ComponentFixture<AgrodealerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrodealerProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrodealerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
