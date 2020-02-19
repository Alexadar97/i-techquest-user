import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { Router } from '@angular/router';

declare var $: any;
@Injectable()
export class DatatransferService {
  appcode: any;
  userid: any;
  logintype: any;
  user_email: any;

  // Local Server
  // appconstant = "http://172.30.1.200:5555/iTechQuest/";
  appconstant = "http://13.127.198.178:8080/iTechQuest/";
  // appconstant = "http://172.30.1.240:9999/iTechQuest/";
  // appconstant = "http://localhost:6060/iTechQuest/";
  // appconstant = "http://172.30.1.26:6060/iTechQuest/";
// new appconstant = "http://172.30.1.240:9999/iTechQuest/";
  //QA-Server
  //appconstant = "https://13.127.167.85:8443/iTechQuest/";

  // Demo-Server
  // appconstant = "https://sevael.in/iTechQuest/";

  // getsession = JSON.parse(localStorage.getItem("sevinvoicesession"));
  constructor(private router: Router) {

  }
  public session: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  public userimagesrc: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);

  getsession(value) {
    this.session.next(value);
  }
  showNotification(from, align, msg, type) {

    $.notify({
      icon: 'notifications',
      message: msg

    }, {
        type: type,
        timer: 2000,
        placement: {
          from: from,
          align: align
        }
      });
  }

  categoryid: any;
  subcatid: any;
  subcatnamemodal: any
  size: any;
  duration: any;
  examdetail(name, size, duration) {
    this.subcatnamemodal = (name);
    this.size = size;
    this.duration = duration
  }

  geteditexam(categoryid, subcatid, userid, page) {
    if (page === 'instruction') {
      this.router.navigate(['/exampage'], { queryParams: { categoryid: this.categoryid, subcatid: this.subcatid, userid: this.userid } });
    }
    else {
      this.categoryid = categoryid;
      this.subcatid = subcatid;
      this.userid = userid;
      this.router.navigate(['/exampage'], { queryParams: { categoryid: this.categoryid, subcatid: this.subcatid, userid: this.userid } });
    }
  }

  userimage(userid) {
    var image = this.appconstant + 'getImage?filename=' + userid + "&timestamp=" + new Date().getTime();
    console.log(1)
    this.userimagesrc.next(image);
    console.log(this.userimagesrc + "dffs")
  }
  changeimage(image) {
    this.userimagesrc.next(image);
    console.log(this.userimagesrc + "service")
  }
}
