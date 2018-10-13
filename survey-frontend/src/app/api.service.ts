import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }
  getSurveys() {
    return this.httpClient.get(`${this.API_URL}/survey/survey`);
  }
  getActiveQuestions() {
    return this.httpClient.get(`${this.API_URL}/question/active_only`);
  }
  getQuestions(){
    return this.httpClient.get(`${this.API_URL}/question/question`);
  }

  //SREERAG
  getUsers() {
    return this.httpClient.get(`${this.API_URL}/person/user`);
  }
}


