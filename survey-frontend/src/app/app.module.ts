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
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuardService } from './auth-guard.service';
import { EqualValidator } from './equal-validator.directive';
import { AuthenticateService } from './authenticate.service';

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: '', component: LoginComponent},
  {path: 'survey', component: NavbarComponent,
  children: [
  {path: 'question', component: QuestionComponent, canActivate: [AuthGuardService]},
  {path: 'newquestion', component: NewquestionComponent, canActivate: [AuthGuardService]},
  {path: 'userlist', component: UserListComponent, canActivate: [AuthGuardService]},
  {path: 'questionlist', component: QuestionlistComponent, canActivate: [AuthGuardService] },
  {path: 'questionpopup', component: QuestionpopupComponent, canActivate: [AuthGuardService]},
  {path: 'responses', component: ResponsesComponent, canActivate: [AuthGuardService]},
  {path: 'surveyList', component: SurveyComponent, canActivate: [AuthGuardService]},
  /* {path: 'surveyList', component: SurveyComponent}, */
  {path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuardService]}
  ]}
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
    ChangepasswordComponent,
    NavbarComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpClientModule,
    // HttpClient
  ],
  providers: [SurveyService, QuestionService, DataService, AuthenticateService, AuthGuardService],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
