import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NewquestionService} from '../newquestion.service';

@Component({
  selector: 'app-newquestion',
  templateUrl: './newquestion.component.html',
  styleUrls: ['./newquestion.component.css'],
  providers:[NewquestionService]
})
export class NewquestionComponent implements OnInit {

  selectedvalue: any = 'text';
question: any = {};
questions_type: any = ['TXT', 'TXTA', 'OPT', 'SLT', 'CHK'];
opt: any[] = [];
optforcheck: any[] = [];
i = 1;
j = 1;
choices: any = [{}];
options: any = [{}];
choose: any = [{}];



form: any = [{}];

FormSet: any = [{
 label: '',

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

  constructor(private _questionService : NewquestionService) { }
  // addoptions(){
  //   console.log()
  //  this.opt.push(this.customer);
  //  this.i++;
  //  console.log(this.opt)
  // }


  // addoptions = function() {

  //   this.choices.push({});
  //   console.log(this.choices)
  // };
  // addoptionforcheck(){
  //   this.options.push({});
  //   console.log(this.options)
  // }
  ngOnInit() {
  }

  addForm = function() {
    this.FormSet.push({

          label: '',

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

  addNewOption = function(item) {
    item.options.push({});
      console.log(this.form);
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
    //console.log(form.value.question_type)
    var questions=
    {
      "questionType":form.value.questionType,
      "question":form.value.question,
      "questionMandatory":form.value.questionMandatory,
      "questionStatus":form.value.questionStatus,
      "answerOptions":form.value.answerOptions
      
    }
    console.log(questions);
    this._questionService.addQuestion( questions ).subscribe(
      response => {
        alert( 'added.' );
      },
      err => console.log( err )
    );

  };
}
