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


  
   
  ngOnInit() {
    this.getQuestions();
   
  }
  

 public getQuestions() {
    this.surveyService.getQuestions().subscribe((data: Array<object>) => {
      this.qns = data['questions'];
    /*  var i;
     for(i=0;i<=this.qns.length;i++)
    console.log(this.qns[i]['question']);*/
    });
  }
 
 public focusOutFunction(adhar:any){
   
     var body = adhar;
     console.log(adhar);
   

  this.surveyService.focusOutFunction().subscribe((data:Array<object>)=>
  {
    this.adhr = data;
  
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

