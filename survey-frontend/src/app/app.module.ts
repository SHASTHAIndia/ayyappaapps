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
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ResponsesComponent } from './responses/responses.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  {path: 'survey', component: SurveyComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'newquestion', component: NewquestionComponent},
  {path: 'userlist', component: UserListComponent},
  {path: 'questionlist', component: QuestionlistComponent },
  {path: 'questionpopup/:id', component: QuestionpopupComponent},
  {path: '', component: SignupComponent},
  {path: 'responses', component: ResponsesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'changepassword', component: ChangepasswordComponent}
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
    SignupComponent,
    LoginComponent,
    QuestionpopupComponent,
    ResponsesComponent,
    ChangepasswordComponent
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
