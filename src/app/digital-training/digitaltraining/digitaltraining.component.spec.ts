import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitaltrainingComponent } from './digitaltraining.component';

describe('DigitaltrainingComponent', () => {
  let component: DigitaltrainingComponent;
  let fixture: ComponentFixture<DigitaltrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitaltrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitaltrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
