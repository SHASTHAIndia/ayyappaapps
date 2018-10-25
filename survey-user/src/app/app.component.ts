import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SurveyService } from './survey.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor(private surveyService: SurveyService, private route: Router) { }

  


  ngOnInit() {

   
    

  }

  

  
  


  


}

