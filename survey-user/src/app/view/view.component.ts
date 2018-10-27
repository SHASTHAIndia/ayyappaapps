import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { SurveyService } from '../survey.service';
 import { Survey } from '../models/survey.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {



  srv={};
  surveys:Array<object> = [];
  constructor(private surveyService: SurveyService, private route: Router) { }

  ngOnInit() {
    this.getSurvey();
  }


public getSurvey() {
  this.surveyService.getSurvey().subscribe((data: Array<object>) => {
    this.surveys = data;
    for (let i = 0; i < this.surveys.length; i++) {
      this.surveys[i]['expiryDate'] = this.surveys[i]['expiryDate'].substring(0, 10);
    }
   console.log(this.surveys);


    // console.log(data);
  });



}

sendMessage(srvy: Survey) {

  this.surveyService.changeMessage(srvy);
  this.surveyService.currentMessage.subscribe(message => this.srv = message);
 // console.log(this.srv);
  // console.log(Name);
  // this.messageEvent.emit(Name);
}
}
