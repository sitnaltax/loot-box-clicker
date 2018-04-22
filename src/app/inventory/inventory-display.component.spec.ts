import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDisplayComponent } from './inventory-display.component';

describe('InventoryDisplayComponent', () => {
  let component: InventoryDisplayComponent;
  let fixture: ComponentFixture<InventoryDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
