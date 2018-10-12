import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  readonly rootUrl ='http://localhost:3000';
  qns:any=[];


  constructor(private http : HttpClient) { }
 insertParticipant( name: string,adhar:string){ 
   var body = {
     Name:name,
     Adhar:adhar
   }
   return this.http.post(this.rootUrl +'/person/',body);
 }
 getQuestions(){
   return this.http.get(this.rootUrl +'/question/question');
 }
getAnswers(){

  var body = this.qns.map(x=> x.QnID);
  return this.http.post(this.rootUrl + '/api/Answers',body);
}
}
  