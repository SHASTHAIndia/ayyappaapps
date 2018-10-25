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
  //public sid: any = "5bbdda0d0648272d5c03a82c";
  public sid: any = "5bb7402d6ef3300dbcda9dcb";
  private qns: Array<object> = [];

  adhr: Array<object> = [];
  question:Array<object>=[];
  answerOptions:Array<object>=[];

  adh:Array<object>=[];


//qscnt:any=0;



  ngOnInit() {

    this.getQuestions(this.sid);

    

  }

  addResult=function(frm){
   // console.log(frm.value)

  var qstnCount = Object.keys(this.question).length;
   //console.log("sree"+ Object.keys(this.question).length);
   var resultArr=[];
   for(var i=1;i<=qstnCount;i++)
   {
   /*  resultArr[i]['question']=frm.value.question+i;
    resultArr[i]['answer']=frm.value.answer+i; */

    resultArr[i]=frm.value.question1;
    //resultArr[i]=frm.value.answer+i;
    
   }
  /* resultArr[1]['question']=frm.value.question1;
    resultArr[1]['answer']=frm.value.answer1;
    resultArr[2]['question']=frm.value.question2;
    resultArr[2]['answer']=frm.value.answer2;*/
    
   //console.log(frm.value.question1);
   console.log(resultArr);
  

    var rslt={

      "userAdhaar":frm.value.Adhar,
      "userName":frm.value.Name,
      "userGender":frm.value.gender,
      "surveyCompletedTS": Date.now,
      "resultSet":resultArr,

      "txtAnswer":frm.value.qst,
      "optAnswer":frm.value.qstop,
      "chkAnswer":frm.value.qstchk,
      "txtArea":frm.value.qsta,
      "selectAnswer":frm.value.qstslt,
    

    


    }
   // console.log(this.question)
    //console.log(frm.value)

 

  }
  


  public getQuestions(sid) {
    this.surveyService.getQuestions(sid).subscribe((data: Array<object>) => {

      this.qns = data['questions'];
      for (var key in this.qns) {
        this.question.push(this.qns[key]);



      }


      for (var key in this.qns) {
        this.answerOptions.push(this.qns[key]);

        //console.log(this.answerOptions)
    

      }





    });
  }
 
 public focusOutFunction(adhaar){
  //console.log(adhaar);
  this.surveyService.focusOutFunction(adhaar,this.sid).subscribe((data:Array<object>)=>
  {
  
    this.adhr=data;
    
    if(this.adhr['survey_attended']==true){
      alert('User already attended the survey');
    }
   
     // console.log(this.adhr)

  });

 
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

