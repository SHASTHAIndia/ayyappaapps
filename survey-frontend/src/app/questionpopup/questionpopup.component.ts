import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-questionpopup',
  templateUrl: './questionpopup.component.html',
  styleUrls: ['./questionpopup.component.css']
})
export class QuestionpopupComponent implements OnInit {
  private questions: Array<object> = [];

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

constructor(private apiService: ApiService,
  private _router: Router,
  private http: Http) { }
  _id:number;
  ngOnInit() {
    this.editQuestion(this._id);
  }

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
 public editQuestion(_id){
    this.apiService.editQuestion(_id).subscribe((option: Array<object>) => {
      this.questions=option;
      console.log(this.questions);
      
  });
  }

  
}
