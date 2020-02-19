import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
import { DatatransferService } from '../services/datatransfer.service';
import { AuthGuard } from './../services/canactivate.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginapi = this.getdata.appconstant + 'login';
  private signupuserapi = this.getdata.appconstant + 'signup';


  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[0-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  loginVssignup = true;
  loginForm: FormGroup;
  signinForm: FormGroup;
  constructor(private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService, private getsession: AuthGuard, private getdata: DatatransferService, ) {
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
    
  }
  // username: any;
  // logintype: any;
  // userid: any;
  // sessionnull = true;
  // p1 = 1;
  // onloadfunction() {


  //   this.session();
  //   if (this.session() == null) {
  //     this.sessionnull = true;
  //     this.router.navigateByUrl('/practiceexams');
  //     return true;
  //   }
  //   else {
  //     this.sessionnull = false;
  //     this.logintype = this.getsession.session().type;
  //     this.userid = this.getsession.session().userid;
  //     this.username = this.getsession.session().username;

  //     document.addEventListener('contextmenu', function (e) {
  //       e.preventDefault();
  //     });
  //   }
  //   document.onkeydown = fkey;
  //   document.onkeypress = fkey
  //   document.onkeyup = fkey;

  //   function fkey(e) {
  //     e = e || window.event;
  //     console.log(e.keyCode)
  //     if (e.keyCode === 122) {
  //       return (e.which || e.keyCode) != 122;
  //     }
  //     else if (e.keyCode === 123) {
  //       return (e.which || e.keyCode) != 123;
  //     }
  //     else if (e.keyCode === 93) {
  //       return (e.which || e.keyCode) != 93;
  //     }
  //     else if (e.keyCode === 27) {
  //       return (e.which || e.keyCode) != 27;
  //     }
  //     else if ((e.which === 73) && e.ctrlKey && e.shiftKey) {
  //       return false;
  //     }
  //   }
  // }
  /*click new user start*/
  signupnewuser() {
    this.loginVssignup = !this.loginVssignup
  }
  /*click new user end*/
  /** Get Session Data */
  session() {
    return JSON.parse(localStorage.getItem("Assessment-tool"));
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
            this.router.navigateByUrl('/home');
            this.getdata.showNotification('bottom', 'right', 'Sign in  successfully', "success");
          }
          else {
            this.errormsg = data.message;
            this.getdata.showNotification('bottom', 'right', data.message, "danger");
          }
        },
          Error => {
            this.router.navigateByUrl('/home');
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
            this.router.navigateByUrl('/home');
            // this.onloadfunction();
            this.getdata.showNotification('bottom', 'right', 'Sign in  successfully', "success");
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
            this.router.navigateByUrl('/home');
          });
    }
  }
  /* sign up end */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 1000 * 60 * 60 * 24));
    var expires = "expires=" + d.toUTCString();
    window.document.cookie = cname + "=" + cvalue + "; " + expires;
  }
}
