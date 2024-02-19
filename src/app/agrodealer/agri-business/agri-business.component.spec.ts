import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriBusinessComponent } from './agri-business.component';

describe('AgriBusinessComponent', () => {
  let component: AgriBusinessComponent;
  let fixture: ComponentFixture<AgriBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
