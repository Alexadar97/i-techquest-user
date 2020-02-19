import { Component, OnInit } from '@angular/core';
import { DatatransferService } from '../services/datatransfer.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';


declare var $;
@Component({
  selector: 'app-exam-instruction',
  templateUrl: './exam-instruction.component.html',
  styleUrls: ['./exam-instruction.component.css']
})
export class ExamInstructionComponent implements OnInit {

  constructor(private getdata: DatatransferService, private router:Router) { }

  ngOnInit() {
  this.quest()
  }
  submit(){
    $('#exam').modal('show')
  }
  confirmsubmit(){
    // this.getdata.showNotification('bottom', 'right', 'Start Exam  Successfully !!', "success");
    $('#exam').modal('hide')
    this.router.navigateByUrl('/exampage');
  }
  questions=[{"questions":"1) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"},
  {"questions":"2) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"},
  {"questions":"3) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"},
  {"questions":"4) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"},
  {"questions":"5) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"},
  {"questions":"6) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"},
  {"questions":"7) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"},
  {"questions":"8) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"},
  {"questions":"9) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"},
  {"questions":"10) An instance is launched into the public subnet of a VPC. Which of the following must be done in order for it to be accessible FROM the Internet?"}]
yesno=[{"yesno":"yes"},{"yesno":"No"},{"yesno":"yes"},{"yesno":"yes"},{"yesno":"yes"},{"yesno":"yes"},{"yesno":"yes"},{"yesno":"yes"},{"yesno":"yes"},{"yesno":"yes"}]
  quest(){
 console.log(this.questions)
}
}
