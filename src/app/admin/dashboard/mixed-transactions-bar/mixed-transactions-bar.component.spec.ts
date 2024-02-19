import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedTransactionsBarComponent } from './mixed-transactions-bar.component';

describe('MixedTransactionsBarComponent', () => {
  let component: MixedTransactionsBarComponent;
  let fixture: ComponentFixture<MixedTransactionsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixedTransactionsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixedTransactionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
