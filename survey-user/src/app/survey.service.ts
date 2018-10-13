import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 
@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  API_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }
  getQuestions() {
    var sid="5bbdda0d0648272d5c03a82c";
    return this.httpClient.get(`${this.API_URL}/survey/get_one/`+sid);
  }

  getUsers() {
    return this.httpClient.get(`${this.API_URL}/person/user`);
  }

   
  focusOutFunction(){

     return this.httpClient.get(`${this.API_URL}/person/user_verify/45678923456/5bc1c31d0c973907fce57bf9`);
  }
}