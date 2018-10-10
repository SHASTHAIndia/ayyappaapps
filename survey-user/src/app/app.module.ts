import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AdhComponent } from './adh/adh.component';
import { QuestionComponent } from './question/question.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule} from './app-routing.module';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    AdhComponent,
    QuestionComponent,
    RegisterComponent,
    ViewComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
