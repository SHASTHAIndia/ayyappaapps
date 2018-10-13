import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewquestionService {

  private _addQuestionUrl = 'http://localhost:3000';
  private _http: Http;

  constructor( http: Http ) {
    this._http = http;
  }

  addQuestion(questions ): Observable<Response> {
    return this._http.post( this._addQuestionUrl+'/question/question', questions );
  }


}
