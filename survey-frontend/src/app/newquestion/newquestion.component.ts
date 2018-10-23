import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newquestion',
  templateUrl: './newquestion.component.html',
  styleUrls: ['./newquestion.component.css'],
  
})
export class NewquestionComponent implements OnInit {
  editQuestion:boolean=false;
  selectedvalue: any = 'text';
question: any = {};
questions_type: any = ['TXT', 'TXTA', 'OPT', 'SLT', 'CHK'];
opt: any[] = [];
optforcheck: any[] = [];
i = 1;
j = 1;
choices: any = [{}];
options: any = [{}];
chooses: any = [{}];
answerOptions: any= [{}];




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

  constructor(private apiService : ApiService, private router: Router) { }
  ngOnInit() {
  }

  addForm = function() {
    this.FormSet.push({

      Question: '',

          isMandatory: '',

          options: [{

              name: ''

          }, { }],
          choices: [{

            name: ''
        }],
        chooses: [{
            name: ''
        }]

      });
      console.log(this.FormSet);

  };
  removeForm = function(index) {
    this.FormSet.splice(index, 1);

};
/*to add new form Options*/

addNewOption = function(item,option) {
  item.options.push({option});
    console.log(this.form)
    
};

addNewOption1 = function(item, choice) {
    item.choices.push({choice});
      console.log(this.form);
};
addNewOption2 = function(item, choose) {
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
  submitForm=function(form)
  {
    var arr=[];
    var optionLength=document.getElementsByClassName('option').length;
    for(var i=0;i<optionLength;i++)
    arr.push((document.getElementsByClassName('option')[i] as HTMLInputElement).value);
    console.log(arr);
    console.log(form.value.question_type)
    var questions=
    {
      "questionType":form.value.questionType,
      "question":form.value.question,
      "questionMandatory":form.value.questionMandatory,
      "questionStatus":form.value.questionStatus,
      "answerOptions":arr
      
    }
    console.log(questions);
    this.apiService.postQuestion( questions ).subscribe(
      response => {
        alert( 'added.' );
        this.router.navigate(['/survey/questionlist'])
      },
      err => console.log( err )
    );
  
  };
}
