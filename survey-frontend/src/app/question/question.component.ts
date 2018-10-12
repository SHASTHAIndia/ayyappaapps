import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import {Question} from '../models/question';
import {QuestionService} from './question.service';
import {DataService} from '../data.service';
import { ApiService } from '../api.service';
import {Survey} from '../models/survey.model';
import {FormsModule} from '@angular/forms';
import { variable } from '../../../node_modules/@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionarray: String[] = [];
  message: string;
  srv: Survey;
  srname: String = '';
  survName: String;
  testing = '';
  qslist: Question[];
  activequestions: Array<object>;
  readonly readUrl = 'http://localhost:3000';
  constructor(private quesser: QuestionService,
  private dataservice: DataService,
  private apiService: ApiService,
  private http: HttpClient) { }

  ngOnInit() {
    this.dataservice.currentMessage.subscribe(message => this.srv = message);
    this.srname = this.message;
    this.getActiveQuestions();
  }
   // console.log(this.srv['_id']);
  public getActiveQuestions() {
     this.apiService.getActiveQuestions().subscribe((data: Array<object>) => {
       this.activequestions = data;
     });
   }
   assignquestions(frm): Observable<Response> {
    const id = this.srv['_id'];
    this.http.put(this.readUrl + '/question_map/' + id, this.questionarray).subscribe(res => {

        console.log(res);
      });
      return;
   }
   addquestion(value) {
    // console.log(value);
    // console.log(this.questionarray);
    for (let i = 0 ; i < this.questionarray.length; i++) {
      if (this.questionarray[i] === value) {
        this.questionarray.splice(i, 1);
        console.log(this.questionarray);
        return;
      }
// this.questionarray.push(value);
   }
   this.questionarray.push(value);
   console.log(this.questionarray);
   /* removefromlist(value) {
    this.questionarray.splice(value, 1);
   } */
  // this.qslist = this.quesser.getQuestions();
  /*receiveMessage($event) {
    this.survName = $event;
    console.log('hey');
  }*/
}
}
