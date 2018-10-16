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
  selected: Boolean = false;
  assqs: Array<object>;
  availablequestions: Array<object>;
  assignedquestions: Array<object> = [];
  assignedquestionsName = [];
  assignquestionrequestobject = {};
  questionarray: String[] = [];
  message: string;
  srv: Survey;
  srname: String = '';
  survName: String;
  testing = '';
  qslist: Question[];
  activequestions: Array<object> = [];
  readonly readUrl = 'http://localhost:3000';
  constructor(private quesser: QuestionService,
  private dataservice: DataService,
  private apiService: ApiService,
  private http: HttpClient) { }

  ngOnInit() {
    this.dataservice.currentMessage.subscribe(message => this.srv = message);
    this.srname = this.message;
    // this.getActiveQuestions();
    // this.getAssignedQuestions();
   //  console.log(this.assignedquestions);
   //  console.log(this.activequestions);
    this.getAvailableQuestions();

  }
   // console.log(this.srv['_id']);
  public getActiveQuestions() {
     this.apiService.getActiveQuestions().subscribe((data: Array<object>) => {
       this.activequestions = data;
     });
     return this.activequestions;
   }
   public getAssignedQuestions() {
    const id = this.srv['_id'];
     this.apiService.getAssignedQuestions(id).subscribe((data: Array<object>) => {
       this.assignedquestions = data['questions'];
      // console.log(this.assignedquestions);
      /* for (let i = 0; i < this.assignedquestions.length; i++) {
         this.assignedquestionsName.push(this.assignedquestions[i]['question']);
       } */
      // console.log(this.assignedquestionsName);
     });

   }
   assignquestions(): Observable<Response> {
    //  console.log(frm);
    //  console.log(this.assignedquestions);
    //  console.log(this.activequestions);
    //  this.assignquestionrequestobject = {'questions': this.questionarray};
    //  this.questionarray = [];
     console.log(this.questionarray);
     const id = this.srv['_id'];
     this.http.put(this.readUrl + '/survey/question_map/' + id, this.questionarray).subscribe(res => {

        console.log(res);
       });
      // this.questionarray = [];
      // console.log(this.questionarray);
       this.getAvailableQuestions();
      return;
   }
   addquestion(value): Observable<Response> {

    // for (let i = 0 ; i < this.questionarray.length; i++) {
    //    if (this.questionarray[i] === value) {
    //      this.questionarray.splice(i, 1);
    //     console.log(this.questionarray);
    //      return;
    //   }
 // this.questionarray.push(value);
  //  }

// console.log(this.selected);
// if (this.selected === true) {
    this.questionarray.push(value);
    console.log(this.questionarray);
    const id = this.srv['_id'];
    this.http.put(this.readUrl + '/survey/question_map/' + id, this.questionarray).subscribe(res => {

       console.log(res);
      });
      this.getAvailableQuestions();
      return;
   // this.assignquestions();
}
getAvailableQuestions() {
 // this.availablequestions = this.getActiveQuestions();
 //  this.getAssignedQuestions().subscribe( (data: Array <object>) =>{})
 // console.log(this.availablequestions);
 // const id = this.srv['_id'];
/* this.apiService.getAssignedQuestions(id).subscribe((data: Array<object>) => {
   for (let i = 0; i < data['questions'].length; i++) {
    this.assignedquestions.push(data['questions'][i]);
   }
  // console.log(this.assignedquestions);
});*/
  this.apiService.getActiveQuestions().subscribe((data: Array<object>) => {
    this.activequestions = data;
    const id = this.srv['_id'];
    this.apiService.getAssignedQuestions(id).subscribe((acqs: Array<object>) => {
      // for (let i = 0; i < acqs['questions'].length; i++) {
      //  this.assignedquestions.push(acqs['questions'][i]);
      // }
      this.assignedquestions = acqs['questions'];
      console.log(this.assignedquestions);
      if (this.assignedquestions != null) {
      for ( let i = 0; i < this.activequestions.length; i++) {

        for (let j = 0; j < this.assignedquestions.length; j++) {
          if (this.activequestions[i]['_id'] === this.assignedquestions[j]['_id'] ) {
            this.activequestions.splice(i, 1);
          }
        }
      }
      }
      console.log(this.assignedquestions);
      console.log(this.activequestions);
   });
   // console.log(this.activequestions);
  });
  // console.log(this.activequestions);
 // console.log(this.assignedquestions);
 /* for ( let i = 0; i < this.activequestions.length; i++) {
    for (let j = 0; j < this.assignedquestions.length; j++) {
      if (this.activequestions[i]['_id'] === this.assignedquestions[j]['_id'] ) {
        this.activequestions.splice(i, 1);
      }
    }
  } */
 // console.log(this.assignedquestions);
 // console.log(this.activequestions);
}
// togglevisibility(e, value) {
//   this.selected =  e.target.checked;
//   if (this.selected === true) {
//     this.questionarray.push(value);
//     console.log(this.questionarray);
// }
// }
}
