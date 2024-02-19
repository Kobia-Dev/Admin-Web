import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorPerRegionComponent } from './actor-per-region.component';

describe('ActorPerRegionComponent', () => {
  let component: ActorPerRegionComponent;
  let fixture: ComponentFixture<ActorPerRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorPerRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorPerRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
