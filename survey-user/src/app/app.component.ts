import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SurveyService } from './survey.service';
import { Router } from '@angular/router';
import {Rsset} from './models/rsset.model';
import { Observable } from '../../node_modules/rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private surveyService: SurveyService, private route: Router) { }
  // public sid: any = "5bbdda0d0648272d5c03a82c";
 // public sid: any = "5bb7402d6ef3300dbcda9dcb";
 public sid: any = '5bbf92b40631ff25109b2262';
  private qns: Array<object> = [];

  adhr: Array<object> = [];
  question: Array<object> = [];
  answerOptions: Array<object> = [];
  adh: Array<object> = [];
  qslis = [];
anslis: Array<object> = [];
rsArr: Rsset[] = [];
// qscnt:any=0;



  ngOnInit() {

    this.getQuestions(this.sid);



  }

  addResult = function(frm): Observable<Response> {
   // console.log(frm.value)
  const qstnCount = Object.keys(this.question).length;
   // console.log("sree"+ Object.keys(this.question).length);
   const resultArr = [];
    for (let i = 0; i < qstnCount; i++) {
  //  /*  resultArr[i]['question']=frm.value.question+i;
  //   resultArr[i]['answer']=frm.value.answer+i; */
  //   const val = 'frm.value.' + 'question' + (i + 1);
  //   console.log(this.anslis[i]);
   //  console.log(this.rsArr);
   //  resultArr[i] = frm.value.question1;
 //  resultArr[i]['question'] = this.question['question'];
 this.qslis[i] = this.question[i]['question'];
 this.rsArr[i] = {
   'question': this.qslis[i],
   'answer': this.anslis[i]
  };
 // console.log(this.rsArr[i].question); // = this.question[i]['question'];
  // this.rsArr[i]['answer'] = this.anslis[i];
  // resultArr[i]=frm.value.answer+i;

    }
// const qst1 =  resultArr[1].value;
console.log(this.rsArr);
// console.log(this.question);
 console.log(this.anslis);

   // console.log(frm.value.question1);
//   console.log(resultArr);


    const rslt = {

      'userAdhaar': frm.value.Adhar,
      'userName': frm.value.Name,
      'userGender': frm.value.gender,
      'surveyCompletedTS': Date.now,
      'resultSet': this.rsArr,

      // "txtAnswer":frm.value.qst,
      // "optAnswer":frm.value.qstop,
      // "chkAnswer":frm.value.qstchk,
      // "txtArea":frm.value.qsta,
      // "selectAnswer":frm.value.qstslt,





    };
  //  console.log(rslt);
   // console.log(this.question)
    // console.log(frm.value)
this.surveyService.addresponse(this.sid, rslt['userAdhaar'], rslt).subscribe(res => {
  console.log(res);
});
return ;

  };



  public getQuestions(sid) {
    this.surveyService.getQuestions(sid).subscribe((data: Array<object>) => {

      this.qns = data['questions'];
      for (var key in this.qns) {
        this.question.push(this.qns[key]);
}


      for (var key in this.qns) {
        this.answerOptions.push(this.qns[key]);

        // console.log(this.answerOptions)


      }





    });
  }

 public focusOutFunction(adhaar) {
  // console.log(adhaar);
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

