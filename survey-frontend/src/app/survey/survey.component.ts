import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Survey } from '../models/survey.model';
import { SurveyService } from './survey.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';
import {DataService} from '../data.service';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  readonly readUrl = 'http://localhost:3000';
  message: string;
  srname: String;
  @Output() messageEvent = new EventEmitter();
  /*surveyName: String = 'hello';
  surveyMessage: String = null;
  surveyDeclaration: string = null;
  surveyStatus: string = null;
  startDate: string = null;
  expiryDate: string = null;
  createdBy: string = null;
  createdOn: string = null;
  questions: string[] = null;
  survey: Survey = {
  surveyName: this.surveyName,
  surveyMessage: this.surveyMessage,
  surveyDeclaration: this.surveyDeclaration,
  surveyStatus: this.surveyStatus,
  startDate: this.startDate,
  expiryDate: this.expiryDate,
  createdBy: this.createdBy,
  createdOn: this.createdOn,*/
  /* questions: {
      type: "array",
      }, */

  /*questions: this.questions
  };*/
  srv: Survey;
  result: any;
  testsur: object;
  surv: Survey;
  sur: any = {};
  // surveys: Survey[] = [];
  /*surveys: Survey[];*/ /* = [{'surveyName': 'Test Survey 2',
  'surveyMessage': 'Welcome Msg',
  'surveyDeclaration': 'Decl',
  'surveyStatus': 'A',
  'startDate': '03/10/2018',
  'expiryDate': '23/10/2018',
  'createdBy': '5bb5e0ead72cc717cc3be713',
  'createdOn': '03/10/2018',
  'questions':
  [
  '5bb49f110d9e321bcc8055b5',
  '5bb5e1f1d72cc717cc3be714',
  '5bb5e2afd72cc717cc3be718'
 ]},
 {'surveyName': 'Test Survey 3',
 'surveyMessage': 'Welcome Msg3',
 'surveyDeclaration': 'Decl3',
 'surveyStatus': 'A',
 'startDate': '03/10/2018',
 'expiryDate': '23/10/2018',
 'createdBy': '5bb5e0ead72cc717cc3be713',
 'createdOn': '03/10/2018',
 'questions':
 [
 '5bb49f110d9e321bcc8055b53',
 '5bb5e1f1d72cc717cc3be7143',
 '5bb5e2afd72cc717cc3be7183'
]}];*/
  /*stitle: String = '';
  smessage: String = '';
  ssdate: String = '';
  esdate: String = '';
  decl: String = '';
  sts: String = '';
  qs: String[] ;*/

   surveys: Array<object> = [];

  constructor(private apiService: ApiService,
    private _router: Router,
    private http: Http,
    private dataservice: DataService) { }

  ngOnInit() {
    this.dataservice.currentMessage.subscribe(message => this.srv = message);
    this.getSurveys();
    // this.surveys = this.http.get(this.url + '/survey/survey');
    // console.log(this.http.get(this.readUrl + '/survey/survey'));
    // this.sur = JSON.stringify(this.http.get(this.readUrl + '/survey/survey'));
    // console.log(this.sur);
    // this.surveys.push(this.sur);

    // this.http.get(this.readUrl + '/survey/survey').subscribe(data => { this.result = (data['_body'] | JSON);
       // this.surveys.push(data['_body']|JSON);
    // console.log(data);
  // console.log(data['_body']);
  // });

   /*  this.http.get(this.readUrl + '/survey/survey').subscribe(data => {
      this.surveys.push(data['_body']);
      //console.log(data);
      console.log(data['_body']);
    }); */
  }

  public getSurveys() {
    this.apiService.getSurveys().subscribe((data: Array<object>) => {
      this.surveys = data;
      // console.log(data);
    });

  }
  addsurvey(frm): Observable<Response> {
    /*this.surveys.push({
 'surveyName': frm.surveyName.value,
 'surveyMessage': frm.surveyMessage.value,
 'surveyDeclaration': frm.surveyDeclaration.value,
 'surveyStatus': frm.surveyStatus.value,
 'startDate': frm.startDate.value,
 'expiryDate': frm.expiryDate.value,
 'questions': []
    });*/
    this.surv = {
      'surveyName': frm.surveyName.value,
      'surveyMessage': frm.surveyMessage.value,
      'surveyDeclaration': frm.surveyDeclaration.value,
      'surveyStatus': frm.surveyStatus.value,
      'startDate': frm.startDate.value,
      'expiryDate': frm.expiryDate.value,
      'questions': []
    };
    console.log(this.surv);
    this.http.post(this.readUrl + '/survey/survey', this.surv).subscribe(res => {
    this.result = res;
      console.log(res);
      this.apiService.getSurveys().subscribe((data: Array<object>) => {
        this.surveys = data;
        // console.log(data);
      });
    });
    console.log(this.result);
    return;
    // console.log(this.testsur);
    // this._router.navigateByUrl('/survey');

    // console.log(frm);
  }
  sendMessage(srvy: Survey) {
  console.log(this.message);
  this.dataservice.changeMessage(srvy);
  this.dataservice.currentMessage.subscribe(message => this.srv = message);
  console.log(this.srv);
  // console.log(Name);
  // this.messageEvent.emit(Name);
  }
  /*addSurvey(frm) {
    this.surveys = {
      'surveyName': frm.surveyName.value,
      'surveyMessage': frm.surveyMessage.value,
      'surveyDeclaration': frm.surveyDeclaration.value,
      'surveyStatus': frm.surveyStatus.value,
      'startDate': frm.startDate.value,
      'expiryDate': frm.expiryDate.value,
      'questions': []
         };
    return this._surveyser.save(this.surveys);
  }*/

}
