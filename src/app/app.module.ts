import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebserviceService } from './services/webservice.service';
import { DatatransferService } from './services/datatransfer.service';
import { AuthGuard } from './services/canactivate.service';
import { RouterModule } from '@angular/router';
import { HttpModule, BrowserXhr } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './home/home.component';
import { ExamInstructionComponent } from './exam-instruction/exam-instruction.component';
import { ReviewQuestionComponent } from './question-type/review-question/review-question.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MyaccountService} from './services/myaccount.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    ExamInstructionComponent,
    ReviewQuestionComponent,
    LandingComponent,
    LoginComponent,
    MyaccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule, ReactiveFormsModule, NgxSpinnerModule,
    HttpModule,
    Ng2SearchPipeModule
  ],
  providers: [DatatransferService, WebserviceService, AuthGuard,MyaccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
