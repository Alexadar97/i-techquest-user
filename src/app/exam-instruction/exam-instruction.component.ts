import { Component, OnInit } from '@angular/core';
import { DatatransferService } from '../services/datatransfer.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import { Router, ActivatedRoute } from '@angular/router';
import { MyaccountService } from './../services/myaccount.service';
import { AuthGuard } from './../services/canactivate.service'
declare var $;
@Component({
  selector: 'app-exam-instruction',
  templateUrl: './exam-instruction.component.html',
  styleUrls: ['./exam-instruction.component.css']
})
export class ExamInstructionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private getdata: DatatransferService, private router: Router, public myaccount: MyaccountService, private getsession: AuthGuard, ) {

    if (this.myaccount.session() == null) {
      this.myaccount.sessionLogin = false;
    }
    else {
      this.myaccount.sessionLogin = true;
    }
  }
  categoryid: any;
  categoryname: any;

  techid: any;
  techname: any;

  examid: any;
  examname: any;

  size: any;
  duration: any;

  userid: any;
  username: any;
  answersids = []
  ngOnInit() {
    this.username = this.getsession.session().username;


    if (this.getsession.session() == null) {
      this.router.navigateByUrl('/home');
    }
    else {
      this.userid = this.getsession.session().userid;



      this.route.queryParams
        .filter(params => params.categoryid)
        .subscribe(params => {
          this.categoryid = params.categoryid;
        });
      this.route.queryParams
        .filter(params => params.categoryname)
        .subscribe(params => {
          this.categoryname = params.categoryname;
        });
    
    this.route.queryParams
      .filter(params => params.techid)
      .subscribe(params => {
        this.techid = params.techid;
      });
    this.route.queryParams
      .filter(params => params.techname)
      .subscribe(params => {
        this.techname = params.techname;
      });

    this.route.queryParams
      .filter(params => params.examid)
      .subscribe(params => {
        this.examid = params.examid;
      });
    this.route.queryParams
      .filter(params => params.examname)
      .subscribe(params => {
        this.examname = params.examname;
      });

    this.route.queryParams
      .filter(params => params.size)
      .subscribe(params => {
        this.size = params.size;
      });
    this.route.queryParams
      .filter(params => params.duration)
      .subscribe(params => {
        this.duration = params.duration;
      });
  }

}
startexam = true;
start(){
  this.startexam = !this.startexam;
}
startExam(){
  $('#exam').modal('show')
}
submitlogin(){
  this.myaccount.callLoginModal('call');
}


session() {
  return JSON.parse(localStorage.getItem("Assessment-tool"));
}

confirmstartExam() {
  $('#exam').modal('hide');

  var singleExamData = { "_id": this.examid, "categoryid": this.categoryid, "subcatid": this.techid, "name": this.examname, "techname": this.techname,
   "categoryname": this.categoryname, "size": this.size, "duration": this.duration }
  this.getdata.setsingleExamData(singleExamData, '/exampage');

}
}
