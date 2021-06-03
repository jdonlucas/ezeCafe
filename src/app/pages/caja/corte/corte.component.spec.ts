import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CorteComponent } from './corte.component';

describe('CorteComponent', () => {
  let component: CorteComponent;
  let fixture: ComponentFixture<CorteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
