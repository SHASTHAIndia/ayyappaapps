import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-questionlist',
  templateUrl: './questionlist.component.html',
  styleUrls: ['./questionlist.component.css']
})
export class QuestionlistComponent implements OnInit {
  
  readonly readUrl = 'http://localhost:3000';
  @Output() messageEvent = new EventEmitter();
  private questions: Array<object> = [];

  constructor(private apiService: ApiService,
    private _router: Router,
    private http: Http) { }
    id: number;
    private headers=new Headers({'Content-Type': 'application/json'});
    ngOnInit() {
      this.getQuestions();
      
    }
    public getQuestions() {
       this.apiService.getQuestions().subscribe((option: Array<object>) => {
        this.questions = option;
        console.log(this.questions[0]);
        
      });
    }
    // public deleteQuestion(id){
    //   if(confirm( "Are you sure?")){
    //     this.apiService.deleteQuestion(id).subscribe((option: Array<object>)=>{
    //       this.questions=option;
    //     })
    //   }
    // }

}
