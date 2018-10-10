import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhComponent } from './adh.component';

describe('AdhComponent', () => {
  let component: AdhComponent;
  let fixture: ComponentFixture<AdhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
