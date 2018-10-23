import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Survey } from '../models/survey.model';
import { SurveyService } from './survey.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { isoStringToDate } from '../../../node_modules/@angular/common/src/i18n/format_date';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  strDate: Date;
  readonly readUrl = 'http://localhost:3000';
  message: string;
  srname: String;
  rbod = {};
  @Output() messageEvent = new EventEmitter();
   updSur = {'surveyName': '',
 'surveyMessage': '',
 'surveyDeclaration': '',
 'surveyStatus': '',
 'startDate': new Date(),
 'expiryDate': new Date(),
 'questions': []
 };
  srv: Survey;
  result: any;
  testsur: object;
  surv = {};
  sur: any = {};
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
      for (let i = 0; i < this.surveys.length; i++) {
        this.surveys[i]['expiryDate'] = this.surveys[i]['expiryDate'].substring(0, 10);
      }
    //  this.surveys['expiryDate'] = this.surveys['startDate'].substring(0, 10);
       console.log(data);
    });

  }
  addsurvey(frm): Observable<Response> {
    this.surv = {
      'surveyName': frm.surveyName.value,
      'surveyMessage': frm.surveyMessage.value,
      'surveyDeclaration': frm.surveyDeclaration.value,
      'surveyStatus': frm.surveyStatus.value,
      'startDate': new Date(frm.startDate.value),
      'expiryDate': new Date(frm.expiryDate.value),
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
  deletesurvey(id): Observable<Response> {
    if (confirm('Are you sure you want to delete this survey?')) {
      // console.log(id);

      this.http.delete(this.readUrl + '/survey/survey/' + id).subscribe(res => {
        const body = res['_body'];
        const response = JSON.parse(body);
        alert(response.msg);
        // console.log(response.msg);
        this.apiService.getSurveys().subscribe((data: Array<object>) => {
          this.surveys = data;
          // console.log(this.surveys);
        });
      });
      return;
    }
  }
  // upsur(survey) {
  //   this.surv = survey;
  //   console.log(this.surv);
  // }

  upsur(survey) {
  // this.strDate = new Date(survey['starDate']);
   console.log(survey['startDate']);

  survey['startDate'] = survey['startDate'].substring(0, 10);
  survey['expiryDate'] = survey['expiryDate'].substring(0, 10);
   // console.log(this.strDate);
   this.updSur = survey;
     console.log(this.updSur);
   //  console.log(this.updSur['startDate']);
   //  console.log(this.updSur['expiryDate']);
  }
 updateSur() {
  //  console.log(this.updSur['_id']);
  //  console.log(this.updSur);
  // this.updSur['expiryDate'] = this.updSur['expiryDate'];
  // this.rbod = {
  //    'surveyName': this.updSur['surveyName'],
  //    'surveyMessage': this.updSur['surveyMessage'],
  //    'surveyStatus' : this.updSur['surveyStatus'],
  //    'surveyDeclaration' : this.updSur['surveyStatus'],
  //    'startDate' : this.updSur['startDate']
  // };
  // this.updSur['startDate'] = new Date(this.updSur['startDate']);
   this.apiService.updateSurvey(this.updSur['_id'], this.updSur).subscribe(res => {
     if (res['n'] != null) {
       alert('Updated Successfully');
     } else {
       alert('Updation Failed.Try Again');
     }
     console.log(res);
   });
    this.updSur = {'surveyName': '',
    'surveyMessage': '',
    'surveyDeclaration': '',
    'surveyStatus': '',
    'startDate': new Date(),
   'expiryDate': new Date(),
   'questions': []
    };
  }

}
