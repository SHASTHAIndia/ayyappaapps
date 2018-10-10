import {Injectable} from '@angular/core';
import {Survey} from '../models/survey.model';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class SurveyService {
readonly readUrl = 'http://localhost:3000';
surveylist: Survey []; /* = [
  {surveyName: 'Test Survey 2',
surveyMessage: 'Welcome Msg',
surveyDeclaration: 'Decl',
surveyStatus: 'A',
startDate: '2018-10-3',
expiryDate: '2018-10-28',
createdBy: '5bb5e0ead72cc717cc3be713',
createdOn: '03/10/2018',
questions:
[
'5bb49f110d9e321bcc8055b5',
'5bb5e1f1d72cc717cc3be714',
'5bb5e2afd72cc717cc3be718'
]},
{surveyName: 'Test Survey 3',
surveyMessage: 'Welcome Msg3',
surveyDeclaration: 'Decl3',
surveyStatus: 'A',
startDate: '2018-10-2',
expiryDate: '2018-10-20',
createdBy: '5bb5e0ead72cc717cc3be713',
createdOn: '03/10/2018',
questions:
[
'5bb49f110d9e321bcc8055b53',
'5bb5e1f1d72cc717cc3be7143',
'5bb5e2afd72cc717cc3be7183'
]}];
getSurveys(): Survey[] {
  return this.surveylist;
}
save(survey: Survey) {
  this.surveylist.push(survey);
}*/
constructor(private http: HttpClient) {}
getSurveys(): Survey[] {
  return this.surveylist;
}
save(survey: Survey) {
 // this.surveylist.push(survey);
 return this.http.post(this.readUrl + '/survey/survey', survey);
}
}

