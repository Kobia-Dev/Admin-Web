import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsDistributionComponent } from './actors-distribution.component';

describe('ActorsDistributionComponent', () => {
  let component: ActorsDistributionComponent;
  let fixture: ComponentFixture<ActorsDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorsDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
