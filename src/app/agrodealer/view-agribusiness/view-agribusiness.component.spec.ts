import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgribusinessComponent } from './view-agribusiness.component';

describe('ViewAgribusinessComponent', () => {
  let component: ViewAgribusinessComponent;
  let fixture: ComponentFixture<ViewAgribusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgribusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgribusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
