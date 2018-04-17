import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDisplayComponent } from './cash-display.component';

describe('CashDisplayComponent', () => {
  let component: CashDisplayComponent;
  let fixture: ComponentFixture<CashDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
