import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPageComponent } from './trainer-page.component';

describe('TrainerPageComponent', () => {
  let component: TrainerPageComponent;
  let fixture: ComponentFixture<TrainerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
