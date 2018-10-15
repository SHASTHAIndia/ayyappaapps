import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpopupComponent } from './questionpopup.component';

describe('QuestionpopupComponent', () => {
  let component: QuestionpopupComponent;
  let fixture: ComponentFixture<QuestionpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
