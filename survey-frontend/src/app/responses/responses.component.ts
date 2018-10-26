import { Component, OnInit } from '@angular/core';
import {Survey} from '../models/survey.model';
import {DataService} from '../data.service';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {
  currentres: any = {
  'personId': '',
  'userName': '',
  'userAdhaar': '',
  'surveyId': '',
  'surveyCompletedTS': '',
  'resultSet': [
        ]
  };
  respons: any;
  srv: Survey;
  constructor(private dataservice: DataService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.dataservice.currentMessage.subscribe(message => this.srv = message);
    this.getResponses(this.srv['_id']);
    console.log(this.srv.surveyName);

  }
  public getResponses(id) {
   this.apiService.getresponses(id).subscribe(resp => {
    this.respons = resp;
     for (let i = 0; i < this.respons.length; i++) {
       if (this.respons[i]['surveyCompletedTS'] != null) {
         this.respons[i]['surveyCompletedTS'] = this.respons[i]['surveyCompletedTS'].substring(0, 10);
       }
     }
     console.log(this.respons);
   });
  }
details(res) {
  this.currentres.personId = res.personId;
  this.currentres.userName = res.userName;
  this.currentres.userAdhaar = res.userAdhaar;
  this.currentres.surveyId = res.surveyId;
  this.currentres.surveyCompletedTS = res.surveyCompletedTS;
  this.currentres.resultSet = res.resultSet;

  console.log(this.currentres.resultSet);
}
}
