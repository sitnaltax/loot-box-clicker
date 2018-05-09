import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDisplayComponent } from './trainer-display.component';

describe('TrainerDisplayComponent', () => {
  let component: TrainerDisplayComponent;
  let fixture: ComponentFixture<TrainerDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
