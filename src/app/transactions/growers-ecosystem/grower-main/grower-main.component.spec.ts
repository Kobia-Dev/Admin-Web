import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowerMainComponent } from './grower-main.component';

describe('GrowerMainComponent', () => {
  let component: GrowerMainComponent;
  let fixture: ComponentFixture<GrowerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
