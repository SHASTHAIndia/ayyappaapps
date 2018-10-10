import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { SurveyComponent } from './survey/survey.component';
import {SurveyService} from './survey/survey.service';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './question/question.service';
import { NewquestionComponent } from './newquestion/newquestion.component';

const routes: Routes = [
  {path: 'survey', component: SurveyComponent},
  {path: 'question', component: QuestionComponent},
  {path:'newquestion', component:NewquestionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    QuestionComponent,
    NewquestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [SurveyService, QuestionService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
