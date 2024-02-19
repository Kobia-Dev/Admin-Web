import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrodealerDistributionComponent } from './agrodealer-distribution.component';

describe('AgrodealerDistributionComponent', () => {
  let component: AgrodealerDistributionComponent;
  let fixture: ComponentFixture<AgrodealerDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrodealerDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrodealerDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
