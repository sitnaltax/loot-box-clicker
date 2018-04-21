import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDisplayComponent } from './equipment-display.component';

describe('EquipmentDisplayComponent', () => {
  let component: EquipmentDisplayComponent;
  let fixture: ComponentFixture<EquipmentDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
