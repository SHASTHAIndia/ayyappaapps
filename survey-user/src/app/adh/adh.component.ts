import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adh',
  templateUrl: './adh.component.html',
  styleUrls: ['./adh.component.css']
})
export class AdhComponent implements OnInit {

  constructor(private surveyService : SurveyService, private route : Router) { }

  ngOnInit() {
  }
  OnSubmit(frm){
    alert('thankyu');
   console.log(frm.value);
  }

}
