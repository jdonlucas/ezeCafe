import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExtraComponent } from './extra.component';

describe('ExtraComponent', () => {
  let component: ExtraComponent;
  let fixture: ComponentFixture<ExtraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
