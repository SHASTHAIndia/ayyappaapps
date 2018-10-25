import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
 import { Survey } from './models/survey.model';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  srv: Survey;
  private messageSource = new BehaviorSubject(this.srv);
  currentMessage = this.messageSource.asObservable();


  API_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  changeMessage(survey: Survey) {
    this.messageSource.next(survey);
  }
  
  getQuestions(sid) {
    // var sid="5bbdda0d0648272d5c03a82c";
    return this.httpClient.get(`${this.API_URL}/survey/get_one/` + sid);
  }

  getUsers() {
    return this.httpClient.get(`${this.API_URL}/person/user`);
  }

  focusOutFunction(adhaar, sid) {

     return this.httpClient.get(`${this.API_URL}/person/user_verify/` + adhaar + `/` + sid);
  }
  getSurvey(){
    return this.httpClient.get(`${this.API_URL}/survey/active_only`);

  }
  addresponse(sid, adrno, rsset) {
    return this.httpClient.post(`${this.API_URL}/result/save/` + sid + '/' + adrno, rsset);
  }
}
