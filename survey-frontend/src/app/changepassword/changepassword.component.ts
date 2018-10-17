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

  constructor(private apiService: ApiService,
    private _router: Router,
    private http: Http) { }

  ngOnInit() {
  }
  submitForm=function(form){
    console.log("hello")
    var password=
    {
      "userName":form.value.userName,
      "password":form.value.password
    }
    console.log(password);
    this.apiService.changePassword( password ).subscribe(
      response => {        
      },
      err => console.log( err )
    );
  }

}
