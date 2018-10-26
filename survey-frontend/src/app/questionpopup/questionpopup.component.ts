import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { QuestionlistComponent } from '../questionlist/questionlist.component';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questionpopup',
  templateUrl: './questionpopup.component.html',
  styleUrls: ['./questionpopup.component.css']
})
export class QuestionpopupComponent implements OnInit {
  
// @Input() quescomp:Object;


@Input() question:any;
  constructor(private apiService: ApiService,private _location: Location  ) { }
    
    ngOnInit() {
      
      
      console.log(this.question)
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
  updateQues = function (form): Observable<Response> {
    var arr = [];
    var optionLength = document.getElementsByClassName('option').length;
    for (var i = 0; i < optionLength; i++)
      arr.push((document.getElementsByClassName('option')[i] as HTMLInputElement).value);
    console.log(arr);
    console.log(form.value.question_type)
    var updates =
    {
      "id":this.question._id,
      "questionType": form.value.questionType,
      "question": form.value.question,
      "questionMandatory": form.value.questionMandatory,
      "questionStatus": form.value.questionStatus,
      "answerOptions": arr

    }
    console.log(updates);    
    this.apiService.updateQuestion(this.question._id,updates).subscribe(response => {  
        console.log(response);      
        alert('updated.');
        this._location.back();
      },
      err => console.log(err)
    );
    return ;
  };
  }

  

