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
  private loginapi = this.getdata.appconstant + 'login';
  private signupuserapi = this.getdata.appconstant + 'signup';
  constructor(private Formbuilder: FormBuilder, private router:Router, private element: ElementRef, private getsession: AuthGuard, private makeapi: WebserviceService, private getdata: DatatransferService) { 

    this.loginForm = Formbuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation)])],
      'password': [null, Validators.compose([Validators.required])],
    });
    this.signinForm = Formbuilder.group({
      'username': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],

    });
  }

  ngOnInit() {
    this.onloadfunction()
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
        this.router.navigateByUrl('/home');
        this.userimage = "assets/image/user.png"
        return true;
    }
    else {
        this.varsession = 'notnull'
        this.logintype = this.getsession.session().type;
        this.userid = this.getsession.session().userid;
        this.username = this.getsession.session().username;
        this.x= this.getsession.session().username.charAt(0);
        this.getdata.userimage(this.userid);

        if (this.userid == undefined)
            this.userimage = "assets/image/user.png"
        else {
            this.userimage = this.getdata.userimagesrc;
            this.userimage = this.userimage._value;
            setInterval(() => {
                this.userimage = this.getdata.userimagesrc;
                this.userimage = this.userimage._value;
            }, 1000);
        }
    }
this.router.navigateByUrl('/myaccount');
    // this.listTitles = ROUTES.filter(listTitle => listTitle);
    // const navbar: HTMLElement = this.element.nativeElement;
    // this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
}

signupnewuser() {
  this.loginVssignup = !this.loginVssignup
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
           this.router.navigateByUrl('/home');
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
          this.router.navigateByUrl('/home')
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
           this.router.navigateByUrl('/home');
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
          this.router.navigateByUrl('/home')
         });
   }
 }
 /* sign up end */
 /*log-out*/
 logout(){
   this.router.navigateByUrl('/landing');
  this.getdata.showNotification('bottom','right',"Logout Successfully","success");
  localStorage.removeItem('Assessment-tool');
  this.deleteCookie('cookies');
  this.onloadfunction()
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
   this.router.navigateByUrl('myaccount');
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
}
