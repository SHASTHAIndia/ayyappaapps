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
  getQuestions() {
    return this.httpClient.get(`${this.API_URL}/question/question`);
  }

getAssignedQuestions(id) {
  return this.httpClient.get(`${this.API_URL}/survey/get_one/` + id);
}
postQuestion( questions ){
  return this.httpClient.post(`${this.API_URL}/question/question`,questions);
}
updateQuestion( updates ){
  return this.httpClient.put(`${this.API_URL}/question/question`,updates);
}
  // SREERAG

  getUsers() {
    return this.httpClient.get(`${this.API_URL}/person/user`);
  }
  deleteQuestion(_id) {
    return this.httpClient.delete(`${this.API_URL}/question/question/` + _id);
  }
  editQuestion(_id) {
    return this.httpClient.get(`${this.API_URL}/question/get_one/` + _id);
  }
  getresponses(id) {
    return this.httpClient.get(`${this.API_URL}/survey/responses/` + id);
  }
  
  postAdmin(user){
    return this.httpClient.post(`${this.API_URL}/admin/admin`,user);
  }
  updateSurvey(id, reqbody) {
    return this.httpClient.put(`${this.API_URL}/survey/survey/` + id, reqbody);
  }
}


