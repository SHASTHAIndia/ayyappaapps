import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { ViewComponent } from './view/view.component';
import {RouterModule,Routes} from '@angular/router';
const routes:Routes=[
  {path:'question',component:QuestionComponent},
  {path:'question/:id',component:QuestionComponent},
  {path:'',component:ViewComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
