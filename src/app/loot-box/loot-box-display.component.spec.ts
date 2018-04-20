import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LootBoxDisplayComponent } from './loot-box-display.component';

describe('LootBoxDisplayComponent', () => {
  let component: LootBoxDisplayComponent;
  let fixture: ComponentFixture<LootBoxDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LootBoxDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LootBoxDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
