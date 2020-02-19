import { Component, OnInit, Injectable, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router, ActivatedRoute } from '@angular/router';
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
  currentquestion: 1;
  questionno: any[];
  questions: any[];
  options: any[];
  singleExamData: any[];
  Object = Object;

  private createQuizapi = this.getdata.appconstant + 'createQuiz';
  private getnextQueryapi = this.getdata.appconstant + 'getNextQuiz';
  private getPreviousQueryapi = this.getdata.appconstant + 'getPreviousQuery';
  private getQueryapi = this.getdata.appconstant + 'getQuery';
  private getExamReviewStatusapi = this.getdata.appconstant + 'getExamReviewStatus';
  private addFeedBackapi = this.getdata.appconstant + 'addFeedback';
  private submitQuizapi = this.getdata.appconstant + 'submitQuiz';
  constructor(private Formbuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private makeapi: WebserviceService, private http: Http, private getdata: DatatransferService, private getsession: AuthGuard, ) {
    this.SubmitFeedbacks = this.Formbuilder.group({
      "submittext": [null, Validators.compose([Validators.required])],
    })


    this.singleExamData = [{
      "_id": this.examid, "categoryid": this.categoryid, "subcatid": this.techid, "name": this.examname, "techname": this.techname,
      "categoryname": this.categoryname, "size": this.size, "duration": this.duration
    }]
  }

  ngOnInit() {
    this.addReviewmodalScript()
    //  this.timerfunction()
    this.gotofull();
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
    // this.createQuiz()

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
      this.createQuiz();
    }

  }



  categoryname: any;
  techid: any;
  examname: any;
  techname: any;
  session() {
    return JSON.parse(localStorage.getItem("Assessment-tool"));
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
    // window.close();
    // alert("you are crossing the rules,You are not allowed to continue the exam")
    // this.getdata.showNotification('bottom', 'right', "you are crossing the rules,You are not allowed to continue the exam", "danger");
    // window.open('#/home');
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
      document.getElementById("timer").innerHTML = hours + " : "
        + minutes + " : " + seconds + "  ";
      if (distance <= 0) {
        clearInterval(x);
      }
      if (distance < 5)
        this.confirmexamsubmit();

    }, 1000);
  }

  // confirmsubmit() {
  //   if (this.SubmitFeedbacks.invalid) {

  //     this.markFormGroupTouched(this.SubmitFeedbacks);
  //     this.getdata.showNotification('bottom', 'right', ' Feedback is invalid !!', "danger");
  //     return false;
  //   }
  //   else {
  //     $("#submitFeedbackmodal").modal("hide");
  //     this.getdata.showNotification('bottom', 'right', ' Feedback is submitted successfully... !!', "success");
  //   }

  // }
  private markFormGroupTouched(formGroup: FormGroup) {
    for (let i in formGroup.controls)
      formGroup.controls[i].markAsTouched();
  }

  size: any;
  answertypeid = [];


  questionid = 0;
  previous() {
    if (this.marked == 'true' && this.answersids.length != 0) {
      this.markedquestion = 'true'
    }
    else if (this.marked == 'false' && this.answersids.length == 0) {
      this.markedquestion = 'false'
    }
    else {
      this.markedquestion = 'none'
    }
    this.questionid = this.currentquestion - 0;
    this.getPreviousQuery();
  }
  next() {
    if (this.marked == 'true' && this.answersids.length != 0) {
      this.markedquestion = 'true'
    }
    else if (this.marked == 'false' && this.answersids.length == 0) {
      this.markedquestion = 'false'
    }
    else {
      this.markedquestion = 'none'
    }
    this.questionid = this.currentquestion + 0;
    this.getnextQuery();
  }
  categoryid: any;
  subcatid: any;
  userid: any;
  duration: any;
  quizid: any;
  examid: any;
  exam: any;
  Displayquestion: any;
  createQuiz() {
    let reqdata = "categoryid=" + this.categoryid + "&subcatid=" + this.techid + "&userid=" + this.userid + "&examid=" + this.examid + "&techid=" + this.techid;
    return this.makeapi.method(this.createQuizapi, reqdata, "postexam")
      .subscribe(data => {
        this.size = Number(data.totalques);
        this.quizid = data.quizid
        this.duration = data.duration
        this.getnextQuery();
        this.timerfunction();
      },
        Error => {
        });
  }

  type: any;
  markedquestion = ''
  questionGetingTime: any;
  Quizdata = [];
  answersid = []
  question: any;
  feedback: any;
  getnextQuery() {
    let reqdata;
    if (this.answersids.length != 0) {
      reqdata = "nextquestion=" + JSON.stringify({
        "userid": this.userid, "quizid": this.quizid, "questionid": this.questionid, "markedquestion": this.markedquestion, "answersids": this.answersids, "starttime": this.questionGetingTime, "feedback": this.feedback
      })
    }
    else {
      reqdata = "nextquestion=" + JSON.stringify({
        "userid": this.userid, "quizid": this.quizid, "questionid": this.questionid, "markedquestion": this.markedquestion, "feedback": this.feedback, "answersids": this.answersid,
      })
    }

    return this.makeapi.method(this.getnextQueryapi, reqdata, "postexam")
      .subscribe(data => {
        this.ExamReviewStatus()
        // $('#feedback').val("");
        this.questionGetingTime = new Date().getTime();
        this.answersids = [];

        if (data.quizdata.answeredids != undefined) {
          this.answersids = data.quizdata.answeredids.split(",")
        }
        else {
          this.answersids = [];
        }
        if (data) {
          this.markedquestion = data.markedquestion;
          this.Quizdata = data.quizdata.answers;
          this.currentquestion = data.quizdata._id;
          this.question = data.quizdata.question;
          this.type = data.quizdata.type
          for (var k = 0; k < this.Quizdata.length; k++) {
            if (this.answersids.includes((k + 1).toString())) {
              this.Quizdata[k]['checked'] = 'true';
              console.log(  this.Quizdata[k]['checked'])
            }
            else {
              this.Quizdata[k]['checked'] = 'false';
              console.log(  this.Quizdata[k]['checked'])
            }
          }
          if (data.markedquestion == 'true') {
            this.marked = 'true'
          }
          else if (data.markedquestion == 'false') {
            this.marked = 'false'
          }
          else if (data.markedquestion == 'none') {
            this.marked = 'none'
          }
          else {
            this.marked = 'none'
          }
        }
      },
        Error => {
        });
  }
  
  getPreviousQuery() {
    let reqdata;
    if (this.answersids.length != 0) {
      reqdata = "previousquestion=" + JSON.stringify({
        "userid": this.userid, "quizid": this.quizid, "questionid": this.questionid, "markedquestion": this.markedquestion, "answersids": this.answersids, "starttime": this.questionGetingTime, "feedback": this.feedback
      })
    }
    else {
      reqdata = "previousquestion=" + JSON.stringify({
        "userid": this.userid, "quizid": this.quizid, "questionid": this.questionid, "markedquestion": this.markedquestion, "feedback": this.feedback , "answersids": this.answersid,
      })
    }
    return this.makeapi.method(this.getPreviousQueryapi, reqdata, "postexam")
      .subscribe(data => {
        this.ExamReviewStatus();
        // $('#feedback').val("");
        this.questionGetingTime = new Date().getTime();
        this.answersids = [];

        if (data.quizdata.answeredids != undefined && (data.quizdata.answeredids != ""))
          this.answersids = data.quizdata.answeredids.split(",")
        else
          this.answersids = [];
        this.markedquestion = data.markedquestion;
        this.Quizdata = data.quizdata.answers;
        this.currentquestion = data.quizdata._id;
        this.question = data.quizdata.question;
        this.type = data.quizdata.type
        for (var k = 0; k < this.Quizdata.length; k++) {
          if (this.answersids.includes((k + 1).toString())) {
            this.Quizdata[k]['checked'] = 'true';
          }
          else {
            this.Quizdata[k]['checked'] = 'false';
          }
        }
        if (data.markedquestion == 'true') {
          this.marked = 'true'
        }
        else if (data.markedquestion == 'false') {
          this.marked = 'false'
        }
        else if (data.markedquestion == 'none') {
          this.marked = 'none'
        }
        else {
          this.marked = 'none'
        }
      },
        Error => {
        });
  }
  reviewStatusData: any = {};

  ExamReviewStatus() {
    let reqdata = "quizid=" + this.quizid + "&userid=" + this.userid;
    return this.makeapi.method(this.getExamReviewStatusapi, reqdata, "postexam")
      .subscribe(data => {
        this.reviewStatusData = data;
      },
        Error => {
        });
  }
  updatedQuestionId: any;
  getQuery() {
    {
      let reqdata;
      if (this.answersids.length != 0) {
        reqdata = "nextquestion=" + JSON.stringify({
          "userid": this.userid, "quizid": this.quizid, "questionid": this.questionid, "markedquestion": this.markedquestion, "answersids": this.answersids, "starttime": this.questionGetingTime, "feedback": this.feedback, "updatequestionid": this.updatedQuestionId,
        })
      }
      else {
        reqdata = "nextquestion=" + JSON.stringify({
          "userid": this.userid, "quizid": this.quizid, "questionid": this.questionid, "markedquestion": this.markedquestion, "feedback": this.feedback, "updatequestionid": this.updatedQuestionId,
        })
      }

      return this.makeapi.method(this.getQueryapi, reqdata, "postexam")
        .subscribe(data => {
          this.ExamReviewStatus()
          // $('#feedback').val("");
          this.questionGetingTime = new Date().getTime();

          if (data.quizdata.answeredids != undefined && (data.quizdata.answeredids != ""))
            this.answersids = data.quizdata.answeredids.split(",")
          else
            this.answersids = [];
          this.markedquestion = data.markedquestion;
          this.Quizdata = data.quizdata.answers;
          this.currentquestion = data.quizdata._id;
          this.question = data.quizdata.question;
          this.type = data.quizdata.type
          for (var k = 0; k < this.Quizdata.length; k++) {
            if (this.answersids.includes((k + 1).toString())) {
              this.Quizdata[k]['checked'] = 'true';
            }
            else {
              this.Quizdata[k]['checked'] = 'false';
            }
          }
          if (data.markedquestion == 'true') {
            this.marked = 'true'
          }
          else if (data.markedquestion == 'false') {
            this.marked = 'false'
          }
          else if (data.markedquestion == 'none') {
            this.marked = 'none'
          }
          else {
            this.marked = 'none'
          }
        },
          Error => {
          });
    }
  }

  flag(currentquestion) {
    if (this.marked == "true")
      this.markedquestion = 'none';
    else if (this.answersids.length == 0)
      this.markedquestion = 'false';
    else if (this.answersids.length != 0)
      this.markedquestion = 'true';

    this.updatedQuestionId = this.currentquestion - 1;
    this.questionid = currentquestion - 1;
    this.getQuery();
  }
  // getFlagtype() {
  //   if (this.questions[this.currentquestion - 1].flagtype == 0) {
  //     return '0';
  //   }
  //   else {
  //     return '1';
  //   }

  // }
  // changeflagtype(index) {
  //   if (this.questions[index].flagtype == 0) {
  //     this.questions[index].flagtype = 1
  //   }
  //   else {
  //     this.questions[index].flagtype = 0;
  //   }
  // }
  endexam() {
    $('#ednexammodal').modal('show');
  }
  finalScaleValue1 = 5;
  finalScaleValue2 = 5;
  finalScaleValue3 = "yes";
  showresult = "false"
  confirmexamsubmit() {
    this.markedquestion = 'none'
    this.questionid = this.questionid + 1;
    this.submitQuiz();
    // this.Feedbacksubmit();
    $('#examresult').modal('show')


  }
  Feedbacksubmit() {
    let reqdata = "feedback=" + JSON.stringify({ "userid": this.userid, "categoryid": this.categoryid, "subcatid": this.subcatid, "question1": "On a scale of 1 to 5 how would you rate this exam", "question2": "On the scale of 1 to 5 How likely would you recommend skillguruu to your friends", "question3": "Did you learn anything new in this exam?", "answer1": this.finalScaleValue1, "answer2": this.finalScaleValue2, "answer3": this.finalScaleValue3, })

    return this.makeapi.method(this.addFeedBackapi, reqdata, "postexam")
      .subscribe(data => {
        if (data.status == "success") {
          this.showresult = "true";
        }
      },
        Error => {
        });
  }

  govalue() {
    this.currentquestion = $("#goquestion").val();
  }

  addReviewmodalScript() {
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = 'assets/js/classie.js';
    document.body.appendChild(js);

    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = 'assets/js/uiMorphingButton_fixed.js';
    document.body.appendChild(js);

    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = 'assets/js/reviewModalFunctionScript.js';
    document.body.appendChild(js);

  }

  reviewquestion() {
    this.ExamReviewStatus()
    $("#reviewquestion").modal("show");
    ;
  }
  answersids = []
  marked = 'none'
  pushsizeArray = []

  answer(event, type) {
    if (type == 'multiple') {
      let val = $(".checksingle:checkbox:checked").map(function () {
        var getdata = this.value;
        return getdata;
      }).get();
      this.answersids = val;
      if (this.marked != 'none' && this.answersids.length == 0) {
        this.marked = 'false'
        this.pushsizeArray[this.currentquestion - 1] = { "questionno": (this.currentquestion), };
        this.markedquestion = 'none';
      }

    }
    else {
      this.answersids[0] = event.target.value;
      if (this.marked != 'none' && this.answersids.length != 0) {
        this.marked = 'true'
        this.pushsizeArray[this.currentquestion - 1] = { "questionno": (this.currentquestion) };
        this.markedquestion = 'none';
      }
    }
  }
  overview(questionno) {
    if (this.marked == 'true' && this.answersids.length != 0) {
      this.markedquestion = 'true'
    }
    else if (this.marked == 'false' && this.answersids.length == 0) {
      this.markedquestion = 'false'
    }
    else {
      this.markedquestion = 'none'
    }
    this.updatedQuestionId = this.currentquestion - 1;
    this.questionid = questionno - 1;
    this.getQuery();
    $("#reviewquestion").modal("hide");
  }
  resultData = { "score": 0, "totalquestions": 0, "takentime": 0, "correctanswers": 0 };
  submitQuiz() {
    let reqdata;
    reqdata = "nextquestion=" + JSON.stringify({
      "userid": this.userid, "quizid": this.quizid, "questionid": this.questionid, "markedquestion": this.markedquestion, "answersids": this.answersids, "starttime": this.questionGetingTime, "feedback": this.feedback
    })
    return this.makeapi.method(this.submitQuizapi, reqdata, "postexam")
      .subscribe(data => {
        this.resultData = data
        console.log(this.resultData)
        $('#feedback').val("");
        this.questionGetingTime = new Date().getTime();
        this.answersids = [];

        if (data.quizdata.answeredids != undefined)
          this.answersids = data.quizdata.answeredids.split(",")
        else
          this.answersids = [];


        this.markedquestion = data.markedquestion;
        this.Quizdata = data.quizdata.answers;
        this.currentquestion = data.quizdata._id;
        this.question = data.quizdata.question;
        this.type = data.quizdata.type
        for (var k = 0; k < this.Quizdata.length; k++) {
          if (this.answersids.includes((k + 1).toString())) {
            this.Quizdata[k]['checked'] = 'true';
          }
          else {
            this.Quizdata[k]['checked'] = 'false';
          }
        }
        if (data.markedquestion == 'true') {
          this.marked = 'true'
        }
        else if (data.markedquestion == 'false') {
          this.marked = 'false'
        }
        else if (data.markedquestion == 'none') {
          this.marked = 'none'
        }
      },
        Error => {
        });
  }
  /*feedback*/

  feedbackerror = "";

  gobackexam(){
    $('#examresult').modal('hide');
    $('#ednexammodal').modal('hide');
    this.router.navigateByUrl('/landing');
  

  }

  modalfeedback() {
    this.SubmitFeedbacks.reset();
    $("#feedback").modal("show");
  }
  ConfirmFeedbackquestion(feedback) {
    if (feedback.length < 3) {
      this.feedbackerror = "Minimum 3 characters are required";
      return false
    }
    else {
      this.feedback = feedback
      $("#feedback").modal("hide");
    }
  }
}
