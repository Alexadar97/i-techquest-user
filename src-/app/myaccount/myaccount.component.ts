import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { WebserviceService } from './../services/webservice.service';
import { DatatransferService } from './../services/datatransfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from './../services/canactivate.service'

declare var $;

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  constructor(private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService,  private getdata: DatatransferService, private getsession: AuthGuard, ) { }
  public enable: boolean;
  ngOnInit() {
    this.enable = true; 
  }
  profileImageName: any;
  profileImageFile: any;
  assets2 = 'assets/img/user.jpg';


  changeProfileImage(event) {
    if (event.target.files[0].size > 3145728) {
      this.getdata.showNotification('bottom', 'right', 'File size must be less than 3 MB !!', "danger");
      return false;
    }
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      this.profileImageName = file.name;
      this.profileImageFile = file;
    }
   
  }
  disable(){ 
    this.enable = !this.enable; 
    $("#exam").modal('hide')
  }

  
}
