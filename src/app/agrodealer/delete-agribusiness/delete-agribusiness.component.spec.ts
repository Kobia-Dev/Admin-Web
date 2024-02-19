import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAgribusinessComponent } from './delete-agribusiness.component';

describe('DeleteAgribusinessComponent', () => {
  let component: DeleteAgribusinessComponent;
  let fixture: ComponentFixture<DeleteAgribusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAgribusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAgribusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
