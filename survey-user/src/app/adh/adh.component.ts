import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';

import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adh',
  templateUrl: './adh.component.html',
  styleUrls: ['./adh.component.css']
})
export class AdhComponent implements OnInit {

  constructor(private surveyService : SurveyService, private route : Router) { }
 
  /*userList:User[]=[];
  addUser(frm){
    var user: User;
    user=frm.value;
    console.log(frm.value);
    this.surveyService;
  }
  */

  

  ngOnInit() {
  }

}
