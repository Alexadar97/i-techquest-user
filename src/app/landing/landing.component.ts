import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { WebserviceService } from './../services/webservice.service';
import { DatatransferService } from './../services/datatransfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from './../services/canactivate.service';
import { MyaccountService} from './../services/myaccount.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  paramField: any;
  private getCategoriesapi = this.getdata.appconstant + 'getCategories';
  
  constructor(private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService,  private getdata: DatatransferService, private getsession: AuthGuard,private myaccount:MyaccountService ) { }

  ngOnInit() {
  this.getCategories();
  // this.myaccount.currentMessage.subscribe(message => this.paramField = message);

  //   this.myaccount.clldashboard.subscribe(data => this.categorylist())
  }
  categorylist(){
    this.router.navigateByUrl('/home')
  }
  allCategories :any;
  getCategories() {
    let reqdata = "status=" + "published"
    return this.makeapi.method(this.getCategoriesapi, reqdata, "postduriCat")
      .subscribe(data => {
        this.allCategories = data;
     
      },
        Error => {
        });
  }
}
