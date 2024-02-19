import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriProcessorsComponent } from './agri-processors.component';

describe('AgriProcessorsComponent', () => {
  let component: AgriProcessorsComponent;
  let fixture: ComponentFixture<AgriProcessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriProcessorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriProcessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
