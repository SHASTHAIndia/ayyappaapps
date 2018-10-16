import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {HttpModule, Http, Response} from '@angular/http';
import {HttpClientModule } from '@angular/common/http';
import { SurveyComponent } from './survey/survey.component';
import {SurveyService} from './survey/survey.service';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './question/question.service';
import { NewquestionComponent } from './newquestion/newquestion.component';
import { UserListComponent } from './user-list/user-list.component';
import { QuestionlistComponent } from './questionlist/questionlist.component';
import { DataService } from './data.service';
import { QuestionpopupComponent } from './questionpopup/questionpopup.component';
import { ResponsesComponent } from './responses/responses.component';


const routes: Routes = [
  {path: 'survey', component: SurveyComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'newquestion', component: NewquestionComponent},
  {path: 'userlist', component: UserListComponent},
  {path: 'questionlist', component: QuestionlistComponent },
  {path: 'questionpopup/:id', component: QuestionpopupComponent},
  {path: 'responses', component: ResponsesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    QuestionComponent,
    NewquestionComponent,
    UserListComponent,
    QuestionlistComponent,
    QuestionpopupComponent,
    ResponsesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpClientModule,
    // HttpClient
  ],
  providers: [SurveyService, QuestionService, DataService],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
