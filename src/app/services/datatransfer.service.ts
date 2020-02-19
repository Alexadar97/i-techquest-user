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
  // appconstant = "http://13.127.198.178:8080/iTechQuest/";
  // appconstant = "http://172.30.1.240:9999/iTechQuest/";
  // appconstant = "http://localhost:6060/iTechQuest/";
  // appconstant = "http://172.30.1.26:6060/iTechQuest/";
// appconstant = "http://172.30.1.240:9999/iTechQuest/";

appconstant="http://139.59.75.83:9999/iTechQuest/"
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
  charname=true
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

  setsingleExamData(singleExamData,navigatePage) {
    this.router.navigate([navigatePage], { queryParams: { categoryid: singleExamData.categoryid, categoryname: singleExamData.categoryname,techid:singleExamData.subcatid,techname:singleExamData.subcatid,examid: singleExamData._id,examname: singleExamData.name,size:singleExamData.size,duration:singleExamData.duration } });
  }

  

  userimage(userid) {
    var image = this.appconstant+ 'getProfileImage?filename=' +userid + "&timestamp=" + new Date().getTime();
    this.userimagesrc.next(image);
  }

}
