import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  n_password: string;
  c_password: string;
  p1:string;p2:string;
  submitAttempt: boolean = false;
  constructor(private apiService: ApiService,
    private _router: Router,
    private http: Http) { }

  ngOnInit() {
  }
  
  submitForm = function (form) {
    //console.log("hello")
    
    var password =
    {
      "oldPassword": form.value.oldPassword,
      "newPassword": form.value.newPassword,
      "userName": "admin"
    }
    // console.log(password);

    this.apiService.changePassword(password).subscribe((data: Array<object>) => {
      
       //console.log(data);
       alert(data['msg']);
    });
    
    /* this.apiService.changePassword( password ).subscribe(
      response => {   
        alert("Password changed successfully!")     
      },
      err => console.log( err )
    ); */
  }
  
  setPassword=function(){
     this.p1=document.getElementById("new_Password").nodeValue;
    this.p2=document.getElementById("confirm_password").nodeValue;
    console.log(this.p1);
    console.log(this.p2);
  }
}
