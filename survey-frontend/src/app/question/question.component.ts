import { Component, OnInit } from '@angular/core';
import {Question} from '../models/question';
import {QuestionService} from './question.service';
import {DataService} from '../data.service';
import { ApiService } from '../api.service';
import {Survey} from '../models/survey.model';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  message: string;
  srv: Survey;
  srname: String = '';
  survName: String;
  qslist: Question[];
  activequestions: Array<object>;
  constructor(private quesser: QuestionService,
  private dataservice: DataService,
  private apiService: ApiService) { }

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
  // this.qslist = this.quesser.getQuestions();
  /*receiveMessage($event) {
    this.survName = $event;
    console.log('hey');
  }*/
}
