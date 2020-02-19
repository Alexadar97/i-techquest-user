import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { ExamInstructionComponent } from './exam-instruction/exam-instruction.component';
import { ReviewQuestionComponent } from './question-type/review-question/review-question.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
        { path: '', redirectTo: 'landing', pathMatch: 'full' },
        { path : 'landing', component : LandingComponent},
        { path: 'home', component: HomeComponent },
        { path: 'exam-instruction', component: ExamInstructionComponent},
        { path: 'myaccount', component: MyaccountComponent},
    ]
},
// { path :'login', component : LoginComponent},
{ path: 'exampage', component: ReviewQuestionComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
