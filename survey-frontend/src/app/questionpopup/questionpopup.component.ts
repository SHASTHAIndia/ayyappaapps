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
  

  constructor(private apiService: ApiService,
    private _router: Router,
    private http: Http) { }
    _id:number;
    ngOnInit() {
      this.editQuest(this._id)
    }
  
 public editQuest(_id){
   
    this.apiService.editQuestion(_id).subscribe((data: Array<object>) => {
      
  });
  }

  
}
