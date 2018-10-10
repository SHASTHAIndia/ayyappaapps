import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  survName: String;
  title = 'admprof';
  surveys: any[] = [{'surveyName': 'Test Survey 2',
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
]}];
  stitle: String = '';
  smessage: String = '';
  ssdate: String = '';
  esdate: String = '';
  decl: String = '';
  sts: String = '';
  addsurvey(frm) {
    this.surveys.push({
  'surveyName': this.stitle,
 'surveyMessage': this.smessage,
 'surveyDeclaration': this.decl,
 'surveyStatus': this.sts,
 'startDate': this.ssdate,
 'expiryDate': this.esdate,
    });
    console.log(JSON.stringify(this.surveys));
  }
  receiveMessage($event) {
    this.survName = $event;
  }
}
