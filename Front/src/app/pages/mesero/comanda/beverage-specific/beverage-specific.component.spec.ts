import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageSpecificComponent } from './beverage-specific.component';

describe('BeverageSpecificComponent', () => {
  let component: BeverageSpecificComponent;
  let fixture: ComponentFixture<BeverageSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeverageSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeverageSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
