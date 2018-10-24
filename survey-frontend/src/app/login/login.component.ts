import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { Router } from '@angular/router';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';
//import {TokenPayload} from '../authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /* credentials: TokenPayload = {
    userName: '',
    password: ''
  }; */

  constructor(private apiService: ApiService,
    private _router: Router,
    private http: Http ) { }

  ngOnInit() {
  }
  submitForm=function(form){
    
   //console.log("hello")
    var user=
    {
      "userName":form.value.userName,
      "password":form.value.password
    }
    //console.log(user);

    this.apiService.login( user ).subscribe((res) => {
      if(res.status)
      {
        alert('succ');
        this.router.navigateByUrl('/surveyList');
      }
      else 
      {
        //alert('fail');
        alert(res.msg);
      }
     
     
    }, (err) => {
      alert(err);
      //console.error(err);
    }); 
    /* this.apiService.postAdmin( user ).subscribe(
      response => {        
      },
      err => console.log( err )
    ); */
  }

}
