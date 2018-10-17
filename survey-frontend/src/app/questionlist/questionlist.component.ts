import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';
import {FormsModule} from '@angular/forms';
//import{ questionpopup} from '../questionpopup'
@Component({
  selector: 'app-questionlist',
  templateUrl: './questionlist.component.html',
  styleUrls: ['./questionlist.component.css']
})
export class QuestionlistComponent implements OnInit {
  
  readonly readUrl = 'http://localhost:3000';
  @Output() messageEvent = new EventEmitter();
  private questions: Array<object> = [];
  //private select: Array<object> = [];
  
  constructor(private apiService: ApiService,
    private _router: Router,
    private http: Http) { }
    id:number
    ngOnInit() {
      this.getQuestions();      
    }
    public getQuestions() {
       this.apiService.getQuestions().subscribe((option: Array<object>) => {
        this.questions = option;
        //console.log(this.questions);
        
      });
    }
    refresh(): void {
      window.location.reload();
  }
    public deleteQues(_id){
       if(confirm('Are you sure you want to delete this question?')){       
        this.apiService.deleteQuestion(_id).subscribe((option: Array<object>)=>{
          this.questions=option;
          this.getQuestions();
        });  
    }
  }
  public editQues(_id){
      this.apiService.editQuestion(_id).subscribe((option: Array<object>)=>{
      this.questions=option;
      console.log(this.questions);
      this.getQuestions();
  });
}
questions_type: any = ['TXT', 'TXTA', 'OPT', 'SLT', 'CHK'];
  choices: any = [{}];
options: any = [{}];
chooses: any = [{}];
form: any = [{}];

FormSet: any = [{
  Question: '',

  isMandatory: '',

  options: [{

      name: ''

  }],
  choices: [{

    name: ''

}],
chooses: [{

    name: ''

}]

}];



removeForm = function(index) {
  this.FormSet.splice(index, 1);

};
addNewOptionForSelect = function(item,option) {
  item.options.push({option});
    console.log(this.form)
    
};

addNewOptionForCheckbox = function(item, choice) {
    item.choices.push({choice});
      console.log(this.form);
};
addNewOptionForOption = function(item, choose) {
    item.chooses.push({choose});
      console.log(this.form);
};
removeChoose = function(form, index) {

  form.chooses.splice(index, 1);

};
removeChoices = function(form, index) {
  form.choices.splice(index, 1);
};
/*remove form options*/
 removeOption = function(form, index) {

      form.options.splice(index, 1);

  };
   ed=function(ques){
     
    //console.log('_id');
    console.log(ques);
   document.getElementById('quest').style.display='none';
     document.getElementById('edit').style.display='block';
    
   
    //  this.apiService.editQuestion(ques['_id']).subscribe((data: Array<object>) => {
    //   this.questions=data;
    //   console.log(this.questions);
      // let arr=this.questions.toString();
      // console.log(arr);
      
      
  //});
  }

  updateQues=function(form)
  {
    var arr=[];
    var optionLength=document.getElementsByClassName('option').length;
    for(var i=0;i<optionLength;i++)
    arr.push((document.getElementsByClassName('option')[i] as HTMLInputElement).value);
    console.log(arr);
    console.log(form.value.question_type)
    var updates=
    {
      "questionType":form.value.questionType,
      "question":form.value.question,
      "questionMandatory":form.value.questionMandatory,
      "questionStatus":form.value.questionStatus,
      "answerOptions":arr
      
    }
    console.log(updates);
    this.apiService.updateQuestion( updates ).subscribe(
      response => {
        alert( 'added.' );
      },
      err => console.log( err )
    );
  
  };
  
 questionArr(){
  let arr=this.questions.toString();

 
 }
}