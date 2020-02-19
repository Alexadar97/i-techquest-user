import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthGuard } from '../../services/canactivate.service'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { WebserviceService } from '../../services/webservice.service';
import { DatatransferService } from '../../services/datatransfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyaccountService} from '../../services/myaccount.service';

declare var $;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private toggleButton: any;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[0-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  username: any;
  logintype: any;
  userid: any;
  varsession: any;
  loginForm: FormGroup;
  signinForm: FormGroup;
  loginVssignup = true;
  // assets1 = this.getdata.appconstant + 'getImage?filename=';
  private loginapi = this.getdata.appconstant + 'login';
  private signupuserapi = this.getdata.appconstant + 'signup';
  private getCategoriesapi = this.getdata.appconstant + 'getCategories';
  private getTechnologiesapi = this.getdata.appconstant + 'getTechnologies';
  private getProfileImage  =this.getdata.appconstant+ 'getProfileImage';
  private getAllExaminationsapi = this.getdata.appconstant + 'getAllExaminations';

  constructor(private Formbuilder: FormBuilder, private router:Router, private element: ElementRef, private getsession: AuthGuard, private makeapi: WebserviceService, public getdata: DatatransferService,private myaccount:MyaccountService) { 
    if (this.myaccount.session() == null) {
      this.myaccount.sessionLogin = false;
    }
    else {
      this.myaccount.sessionLogin = true;
    }
    this.myaccount.callLogin.subscribe(data => this.loginpage())
    // this.updateprofile.getcallProfile.subscribe(data => this.loginpage())
    this.loginForm = Formbuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation)])],
      'password': [null, Validators.compose([Validators.required])],
    });
    this.signinForm = Formbuilder.group({
      'username': [null, Validators.compose([Validators.required])],
      // 'lastname': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],

    });
  }

  ngOnInit() {
    this.onloadfunction();
    this.getallExamination();
  }
  browse= true;
  browsebtn(){
    this.browse = !this.browse;
  }
  loginpage(){
    // this.router.navigateByUrl('login');
    $('#loginmodal').modal('show');
  }
  userimage: any;
  x:any;
  onloadfunction() {

    if (this.session() == null) {
        this.varsession = 'null'
        this.logintype = '';
        this.userid = '';
        this.username = '';
        this.x ='';
        // this.router.navigateByUrl('/landing');
        this.userimage = "assets/images/user.png"
        return true;
    }
    else {
        this.varsession = 'notnull'
        this.logintype = this.getsession.session().type;
        this.userid = this.getsession.session().userid;
        this.username = this.getsession.session().username;

        this.getprofileimage()
      
     
    }
// this.router.navigateByUrl('/landing');
    // this.listTitles = ROUTES.filter(listTitle => listTitle);
    // const navbar: HTMLElement = this.element.nativeElement;
    // this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
}
getprofileimage(){
  return this.makeapi.method(this.getProfileImage+'?filename=' + this.userid , "", "postresponse")
    .subscribe(data => {
      this.getdata.userimage(this.userid);

      setInterval(() => {
          this.userimage = this.getdata.userimagesrc['_value'];
      }, 0);
      this.getdata.charname=false
    },
      Error => {
        this.x= this.getsession.session().username.charAt(0);
        this.getdata.charname=true
      });
}
loginVssignupback=true;
signupnewuser() {
  this.loginVssignup = !this.loginVssignup
}
signupnewuserback(){
  this.loginVssignup =!this.loginVssignup
}
 /* login start */
 errormsg: any;
 login() {
   if (this.loginForm.invalid) {
     this.markFormGroupTouched(this.loginForm);
     this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
   }
   else {
     let requestdata = "loginUser=" + JSON.stringify(this.loginForm.value)
     return this.makeapi.method(this.loginapi, requestdata, "postlogin")
       .subscribe(response => {
         this.setCookie('cookies', response.headers.get('token'), 1)
         this.makeapi.getToken()
         var data = response.json();
         if ((data.status).toLowerCase() == "success") {
           this.errormsg = '';
           localStorage.setItem("Assessment-tool", JSON.stringify(data));
           $('#loginmodal').modal('hide');
           this.onloadfunction();
           this.getdata.showNotification('bottom', 'right', 'Logged-in  successfully', "success");
         }
         else {
           this.errormsg = data.message;
           this.getdata.showNotification('bottom', 'right', data.message, "danger");
         }
       },
         Error => {
          $('#loginmodal').modal('hide');
         });
   
   }
 }
 /*login end */
 /*sign up start */
 signin() {
   if (this.signinForm.invalid) {
     this.markFormGroupTouched(this.signinForm);
     this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
   }
   else {
     var getform = this.signinForm.value
     let requestdata = "signupdetails=" + JSON.stringify(getform)
     return this.makeapi.method(this.signupuserapi, requestdata, "postlogin")
     .subscribe(response => {
       this.setCookie('cookies', response.headers.get('token'), 1)
       this.makeapi.getToken()
       var data = response.json();
         if (data.status == "success") {
           this.errormsg = '';
           localStorage.setItem("Assessment-tool", JSON.stringify(data));
           $('#loginmodal').modal('hide');
           this.onloadfunction();
           this.getdata.showNotification('bottom', 'right', 'Signed in  successfully', "success");
         }
         else if (data.isexists == true) {
           this.getdata.showNotification('bottom', 'right', 'Email already exists !!', "danger");
           var getdata = this.signinForm.value;
           getdata.password = "";
           this.signinForm.patchValue(getdata)
           this.errormsg = "Email already exists";
         }
         else {
           this.errormsg = data.message;
           this.getdata.showNotification('bottom', 'right', data.message, "danger");
         }
       },
         Error => {
          $('#loginmodal').modal('hide');
         });
   }
 }
 /* sign up end */
 /*log-out*/
 logout(){
  this.myaccount.sessionLogin=false;
   this.router.navigateByUrl('/landing');
  this.getdata.showNotification('bottom','right',"Logout Successfully","success");
  localStorage.removeItem('Assessment-tool');
  this.deleteCookie('cookies');
  this.onloadfunction();
 }
 private markFormGroupTouched(formGroup: FormGroup) {
   (<any>Object).values(formGroup.controls).forEach(control => {
     control.markAsTouched();

     if (control.controls) {
       this.markFormGroupTouched(control);
     }
   });
 }

 myAccount(){
   this.router.navigateByUrl('/myaccount');
 }
 setCookie(cname, cvalue, exdays) {
   var d = new Date();
   d.setTime(d.getTime() + (exdays * 1000 * 60 * 60 * 24));
   var expires = "expires=" + d.toUTCString();
   window.document.cookie = cname + "=" + cvalue + "; " + expires;
 }
/** Get Session Data */
session() {
    return JSON.parse(localStorage.getItem("Assessment-tool"));
}

deleteCookie(cname) {
  var d = new Date(); 
  d.setTime(d.getTime() - (1000*60*60*24)); 
  var expires = "expires=" + d.toUTCString(); 
  window.document.cookie = cname+"="+"; "+expires;
}

openCity(evt, cityName) {
  var i, tabcontentli, tablinks;
  tabcontentli = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontentli.length; i++) {
    tabcontentli[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

allTechnologies: any;
gettechnology(value) {
  return this.makeapi.method(this.getTechnologiesapi + "?categoryid=" + value, "", "postduriCat")
    .subscribe(data => {
      if (data.length > 0) {
        this.allTechnologies = data[0].sub;
      } else {
        this.allTechnologies = [];
      }
      console.log(this.allTechnologies)
    },
      Error => {
      });
}
allCategories: any;
getCategories() {
  let reqdata = "status=" + "published"
  return this.makeapi.method(this.getCategoriesapi, reqdata, "postduriCat")
    .subscribe(data => {
      this.allCategories = data;
      if (data.length > 0) {
        this.gettechnology(data[0]._id);
      }


      console.log(this.allCategories)
    },
      Error => {
      });
}
allExamination: any;
getallExamination() {
  let reqdata = "status=" + "published"
  return this.makeapi.method(this.getAllExaminationsapi, reqdata, "postexam")
    .subscribe(data => {
      this.allExamination = data;
    },
      Error => {
      });
}
}
