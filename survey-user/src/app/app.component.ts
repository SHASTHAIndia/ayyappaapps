import { Component, OnInit } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { SurveyService } from './survey.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private surveyService : SurveyService, private route : Router) { }

  private qns: Array<object> = [];
  private adhr: Array<object> = [];
  question:Array<object>=[];
  Option:Array<object>=[];


  
   
  ngOnInit() {
    this.getQuestions();
   
  }
  
 public getQuestions() {
    this.surveyService.getQuestions().subscribe((data: Array<object>) => {
      console.log(data)
      this.qns = data['questions'];
    
      for(var key in this.qns){
        this.question.push(this.qns[key]);
        }
      console.log(this.question)
    
    });
  }
 
 public focusOutFunction(){
 

  this.surveyService.focusOutFunction().subscribe((data:Array<object>)=>
  {
    this.adhr = data;
    console.log(data)
  
  }
  );

  }


  
 private_prevSelected: any;

    handleChange(evt) {
      var target = evt.target;
      if (target.checked) {
        this.route.navigate(['/question'])
        
      } 
    } 

  
  title = 'sur';

    
  }

