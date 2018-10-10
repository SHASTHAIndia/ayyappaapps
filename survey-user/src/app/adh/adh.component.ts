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
  OnSubmit(name:string,adhar:number){
    this.surveyService.insertParticipant(name,adhar).subscribe(
      (data : any) =>{
    this.route.navigate(['/question']);
      }
    );
  }

}
