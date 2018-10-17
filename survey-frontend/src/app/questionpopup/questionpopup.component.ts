import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-questionpopup',
  templateUrl: './questionpopup.component.html',
  styleUrls: ['./questionpopup.component.css']
})
export class QuestionpopupComponent implements OnInit {
  
// @Input() quescomp:Object;
  constructor() { }
    
    ngOnInit() {
      // console.log(this.quescomp)
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
  
 
  }

  

