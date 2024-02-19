import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateAgribusinessComponent } from './deactivate-agribusiness.component';

describe('DeactivateAgribusinessComponent', () => {
  let component: DeactivateAgribusinessComponent;
  let fixture: ComponentFixture<DeactivateAgribusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateAgribusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateAgribusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
