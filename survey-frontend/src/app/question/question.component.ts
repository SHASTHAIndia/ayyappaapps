import { Component, OnInit } from '@angular/core';
import {Question} from '../models/question';
import { QuestionService } from './question.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  srname: String;
  survName: String;
  qslist: Question[];
  constructor(private quesser: QuestionService) { }

  ngOnInit() {
    this.qslist = this.quesser.getQuestions();
  }
  receiveMessage($event) {
    this.survName = $event;
  }
}
