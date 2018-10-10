import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  constructor(private router:Router ,private surveyService:SurveyService) { }

  ngOnInit() {

    this.surveyService.getQuestions().subscribe(
      (data:any) =>{
        this.surveyService.qns = data;
      }
    );
  }

}