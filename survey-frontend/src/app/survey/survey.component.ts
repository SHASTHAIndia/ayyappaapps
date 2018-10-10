import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Survey} from '../models/survey.model';
import {SurveyService} from './survey.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
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
  surveys: Survey[]; /*= [{'surveyName': 'Test Survey 2',
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
  constructor(private _surveyser: SurveyService,
              private _router: Router) { }

  ngOnInit() {
    this.surveys = this._surveyser.getSurveys();
  }
  addsurvey(frm) {
    this.surveys.push({
 'surveyName': frm.surveyName.value,
 'surveyMessage': frm.surveyMessage.value,
 'surveyDeclaration': frm.surveyDeclaration.value,
 'surveyStatus': frm.surveyStatus.value,
 'startDate': frm.startDate.value,
 'expiryDate': frm.expiryDate.value,
 'questions': []
    });
    this._router.navigateByUrl('/survey');
    console.log(JSON.stringify(this.surveys));
  }
  sendMessage(Name: String) {
    this.messageEvent.emit(Name);
  }
  /*addSurvey() {
    this._surveyser.save(this.survey);
  }*/

}
