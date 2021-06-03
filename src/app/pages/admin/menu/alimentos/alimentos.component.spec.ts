import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlimentosComponent } from './alimentos.component';

describe('AlimentosComponent', () => {
  let component: AlimentosComponent;
  let fixture: ComponentFixture<AlimentosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
