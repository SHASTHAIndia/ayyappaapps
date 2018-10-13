import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Survey } from './models/survey.model';

@Injectable()
export class DataService {
  srv: Survey;
  private messageSource = new BehaviorSubject(this.srv);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(survey: Survey) {
    this.messageSource.next(survey);
  }

}
