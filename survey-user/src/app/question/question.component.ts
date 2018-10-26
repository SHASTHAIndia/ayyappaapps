import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Survey } from '../models/survey.model';
import { Observable } from '../../../node_modules/rxjs';
import { Rsset } from '../models/rsset.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
   srv_id =0;
  constructor(private surveyService: SurveyService, private route: Router,private act_route: ActivatedRoute) {
    //this.act_route.params.subscribe( params => console.log(params['id']) );

    this.act_route.params.subscribe(params => {
     // console.log(params);
      this.srv_id = params['id'];
    });
    
   }
  //public sid: any = "5bbdda0d0648272d5c03a82c";
  //public sid: any = "5bb7402d6ef3300dbcda9dcb";
  private qns: Array<object> = [];
  //srv: Survey;
  srv:Array<object>= [];
  adhr: Array<object> = [];
  question: Array<object> = [];
  answerOptions: Array<object> = [];
  adh: Array<object> = [];
  qslis = [];
  anslis: Array<object> = [];
  rsArr: Rsset[] = [];

  //qscnt:any=0;



  ngOnInit() {
    this.surveyService.getQuestions(this.srv_id).subscribe((data: Array<object>) => {
     // this.srv = JSON.parse(data);
      this.srv=  data;
      
     
       //console.log(this.srv);
    });
  
    
   // this.surveyService.currentMessage.subscribe(message => this.srv = message);
    //this.getQuestions(this.srv['_id']);
    this.getQuestions(this.srv_id);
     //alert(this.srv_id);
    

  }


  addResult = function (frm): Observable<Response> {
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
    this.surveyService.addresponse(this.srv_id , rslt['userAdhaar'], rslt).subscribe(res => {
    //this.surveyService.addresponse(this.srv['_id'], rslt['userAdhaar'], rslt).subscribe(res => {
      alert(res.msg);
      this.route.navigate(['/']);
      //console.log(res);
    });
    return;

  };




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



  public focusOutFunction(adhaar) {
     //alert(this.srv_id);
    //console.log(adhaar);
    //this.surveyService.focusOutFunction(adhaar,this.srv['_id']).subscribe((data:Array<object>)=>
    this.surveyService.focusOutFunction(adhaar, this.srv_id).subscribe((data: Array<object>) => {

      this.adhr = data;
alert(this.adhr['msg']);
      if (this.adhr['survey_attended'] == true) {
        alert('User already attended the survey');

        this.route.navigate(['/']);
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

