import { Component, OnInit, Injectable, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { WebserviceService } from '../../services/webservice.service';
import { DatatransferService } from '../../services/datatransfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from '../../services/canactivate.service'
import { Subscriber } from 'rxjs';
declare var $;

declare var $;
@Component({
  selector: 'app-review-question',
  templateUrl: './review-question.component.html',
  styleUrls: ['./review-question.component.css']
})
export class ReviewQuestionComponent implements OnInit {
  SubmitFeedbacks: FormGroup;
  currentquestion: number;
  questionno: any[];
  questions: any[];
  options: any[];
  private createQuizapi = this.getdata.appconstant + 'createQuiz';
  private getnextQueryapi = this.getdata.appconstant + 'getNextQuery';
  private getPreviousQueryapi = this.getdata.appconstant + 'getPreviousQuery';
  constructor(private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService, private http: Http, private getdata: DatatransferService, private getsession: AuthGuard, ) {
    this.SubmitFeedbacks = this.Formbuilder.group({
      "submittext": [null, Validators.compose([Validators.required])],
    })
    this.currentquestion = 1;

    this.questions = [{ "id": 1, "question1": "An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "flagtype": 0 },
    { "id": 2, "question1": "An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "flagtype": 0 },
    { "id": 3, "question1": "An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "flagtype": 0 },
    { "id": 4, "question1": "An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "flagtype": 0 },
    { "id": 5, "question1": "An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "flagtype": 0 }
    ]
    this.options = [{
      "id": 1, "option1": "Attach an Elastic IP to the instance", "option2": "Nothing. The instance is accessible from the Internet",
      "option3": "Launch a NAT instance and route all traffic to it", "option4": "Make an entry in the route table passing all traffic going outside the VPC to the NAT instance"
    },
    {
      "id": 2, "option1": "Attach an Elastic IP to the instance", "option2": "Nothing. The instance is accessible from the Internet",
      "option3": "Launch a NAT instance and route all traffic to it", "option4": "Make an entry in the route table passing all traffic going outside the VPC to the NAT instance"
    },
    {
      "id": 3, "option1": "Attach an Elastic IP to the instance", "option2": "Nothing. The instance is accessible from the Internet",
      "option3": "Launch a NAT instance and route all traffic to it", "option4": "Make an entry in the route table passing all traffic going outside the VPC to the NAT instance"
    },
    {
      "id": 4, "option1": "Attach an Elastic IP to the instance", "option2": "Nothing. The instance is accessible from the Internet",
      "option3": "Launch a NAT instance and route all traffic to it", "option4": "Make an entry in the route table passing all traffic going outside the VPC to the NAT instance"
    },
    {
      "id": 5, "option1": "Attach an Elastic IP to the instance", "option2": "Nothing. The instance is accessible from the Internet",
      "option3": "Launch a NAT instance and route all traffic to it", "option4": "Make an entry in the route table passing all traffic going outside the VPC to the NAT instance"
    },

    ]
  }
 
  ngOnInit() {
    this.timerfunction();
    this.gotofull();
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });


    /** Windows validation */
    $(window).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', (e) => {
      var state = (<any>document).fullScreen || (<any>document).mozFullScreen || (<any>document).webkitIsFullScreen;
      console.log(state)
      var event = state ? 'FullscreenOn' : 'FullscreenOff';
      if (event == "FullscreenOn") {
        $("#fullscreen").css({ "display": "block" });
      }
      if (event == "FullscreenOff") {
        this.fire();
      }
    });


    document.onkeydown = fkey;
    document.onkeypress = fkey
    document.onkeyup = fkey;

    function fkey(e) {
      e = e || window.event;
      if (e.keyCode === 122) {
        return (e.which || e.keyCode) != 122;
      }
      if (e.keyCode === 116) {
        return (e.which || e.keyCode) != 116;
      }
      else if (e.keyCode === 123) {
        return (e.which || e.keyCode) != 123;
      }
      else if (e.keyCode === 27) {
        return (e.which || e.keyCode) != 27;
      }
      else if ((e.which === 82) && e.ctrlKey) {
        return false;
      }
      else if ((e.which === 73) && e.ctrlKey && e.shiftKey) {
        return false;
      }
      else if ((e.ctrlKey) && (e.which === 82)) {
        return false;
      }
      else if ((e.ctrlKey) && (e.which === 116)) {
        return false;
      }
    }



  }

  // /** Full Screen */
  gotofull() {
    var i = <any>(document.getElementById("totalelement"));
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {

      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen();
    }
  }

  /** Check Eligiblity */
  fire() {
    window.close();
    alert("you are crossing the rules,You are not allowed to continue the exam")
    this.getdata.showNotification('bottom', 'right', "you are crossing the rules,You are not allowed to continue the exam", "danger");
    window.open('#/home');
  }
  questionstype = [{ "id": 1, "question1": "1An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "yesno": "yes" },
  { "id": 2, "question1": "2An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "yesno": "yes" },
  { "id": 3, "question1": "3An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "yesno": "yes" },
  { "id": 4, "question1": "4An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "yesno": "No" },
  { "id": 5, "question1": "5An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "yesno": "No" },
  { "id": 6, "question1": "2An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "yesno": "yes" },
  { "id": 7, "question1": "3An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "yesno": "yes" },
  { "id": 8, "question1": "4An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "yesno": "No" },
  { "id": 9, "question1": "5An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?", "yesno": "yes" },
  ]

  modalfeedback() {
    this.SubmitFeedbacks.reset();
    $("#submitFeedbackmodal").modal("show");
  }
  timerfunction() {
    var countDownDate = new Date().getTime();
    countDownDate = (countDownDate + (Number(this.duration) * 60000));

    var x = setInterval(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("timer").innerHTML = hours + ": "
        + minutes + ": " + seconds + " ";
      if (distance <= 0) {
        clearInterval(x);
      }
      // if (distance < 5)
      //   this.confirmendexam();

    }, 1000);
  }
  confirmsubmit() {
    if (this.SubmitFeedbacks.invalid) {

      this.markFormGroupTouched(this.SubmitFeedbacks);
      this.getdata.showNotification('bottom', 'right', ' Feedback is invalid !!', "danger");
      return false;
    }
    else {
      $("#submitFeedbackmodal").modal("hide");
      this.getdata.showNotification('bottom', 'right', ' Feedback is submitted successfully... !!', "success");
    }

  }
  private markFormGroupTouched(formGroup: FormGroup) {
    for (let i in formGroup.controls)
      formGroup.controls[i].markAsTouched();
  }

  size: any;
  checked = 'none';
  answertypeid = [];
  checkedquestion = ''
  Previous() {
    if (this.checked == 'true' && this.answertypeid.length != 0) {
      this.checkedquestion = 'true';
      console.log(this.checkedquestion = 'true')
    }
    else if (this.checked == 'false' && this.answertypeid.length == 0) {
      this.checkedquestion = 'false';
    }
    else {
      this.checkedquestion = 'none';
    }
    this.currentquestion = this.currentquestion - 1;
  }

  next() {
    if (this.checked == 'true' && this.answertypeid.length != 0) {
      this.checkedquestion = 'true';
    }
    else if (this.checked == 'false' && this.answertypeid.length == 0) {
      this.checkedquestion = 'false';
    }
    else {
      this.checkedquestion = 'none'
    }
    this.currentquestion = this.currentquestion + 1;
  }
  categoryid: any;
  subcatid: any;
  userid: any;
  duration:any;
  quizid:any;
  createQuiz(){
    let reqdata = "categoryid=" + this.categoryid + "&subcatid=" + this.subcatid + "&userid=" + this.userid;
    return this.makeapi.method(this.createQuizapi,reqdata, "postexam")
    .subscribe(data =>{
      this.size = Number(data.totalques);
      this.quizid = data.quizid;
      this.duration = data.duration;
    },
    Error =>{

    })
  }
  getFlagtype() {
    if (this.questions[this.currentquestion - 1].flagtype == 0) {
      return '0';
    }
    else {
      return '1';
    }

  }
  changeflagtype(index) {
    if (this.questions[index].flagtype == 0) {
      this.questions[index].flagtype = 1
    }
    else {
      this.questions[index].flagtype = 0;
    }
  }
  endexam() {
    $('#ednexammodal').modal('show');
  }
  confirmexamsubmit() {
    $("#ednexammodal").modal("hide");
    this.getdata.showNotification('bottom', 'right', ' Exam is successfully... !!', "success");
  }

  govalue() {
    this.currentquestion = $("#goquestion").val();
  }
}
