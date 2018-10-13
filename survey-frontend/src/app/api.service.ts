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
  getQuestions() {
    return this.httpClient.get(`${this.API_URL}/question/question`);
  }
  // editQuestion(id){
  //   return this.httpClient.put(`${this.API_URL}/question/question/:id`);
  // }
  deleteQuestion(id){
    return this.httpClient.delete(`${this.API_URL}/question/question/:id`);
  
  }
}


