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
    id:number
    ngOnInit() {
      this.getQuestions();      
    }
    public getQuestions() {
       this.apiService.getQuestions().subscribe((option: Array<object>) => {
        this.questions = option;
        //console.log(this.questions);
        
      });
    }
    refresh(): void {
      window.location.reload();
  }
    public deleteQues(_id){
       alert('are you sure?')
        this.apiService.deleteQuestion(_id).subscribe((option: Array<object>)=>{
          this.questions=option;
          this.getQuestions();
          
    });
  }
  public editQues(_id){
      this.apiService.editQuestion(_id).subscribe((option: Array<object>)=>{
      this.questions=option;
      console.log(this.questions);
      this.getQuestions();
  });
}
}