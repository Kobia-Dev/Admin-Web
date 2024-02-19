import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMarketTransactionsComponent } from './all-market-transactions.component';

describe('AllMarketTransactionsComponent', () => {
  let component: AllMarketTransactionsComponent;
  let fixture: ComponentFixture<AllMarketTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMarketTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMarketTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
