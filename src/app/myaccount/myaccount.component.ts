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
import { MyaccountService} from './../services/myaccount.service'
declare var $;

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  profileForm:FormGroup;
  changepasswordForm:FormGroup;
  
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[0-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
show='true';
  private saveimageapi = this.getdata.appconstant + 'saveProfileImage';
  private changepasswordapi = this.getdata.appconstant + 'changePassword';
  private getProfileapi = this.getdata.appconstant + 'getProfileDetails';
  private updateProfileapi = this.getdata.appconstant + 'updateProfileDetails';
  private getTechnologiesapi = this.getdata.appconstant + 'getTechnologies';
  private getAllExaminationsapi  =this.getdata.appconstant+ 'getAllExaminations';
  private getProfileImage  =this.getdata.appconstant+ 'getProfileImage';
  private getHistory  =this.getdata.appconstant+ 'getHistory';
  constructor(private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService,  private getdata: DatatransferService, private getsession: AuthGuard, private myaccount:MyaccountService ) {
   
    if (this.myaccount.session() == null) {
      this.myaccount.sessionLogin = false;
    }
    else {
      this.myaccount.sessionLogin = true;
    }
    this.profileForm = Formbuilder.group({
      '_id': [null],
      'username': [null, Validators.compose([Validators.required])],
      // 'lname': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation)])],
    });
    this.changepasswordForm = Formbuilder.group({
      'password': [null, Validators.compose([Validators.required])],
      'cpassword': [null, Validators.compose([Validators.required])],


    });

    // if (this.updateprofife.session() == null) {
    //   this.updateprofife.sessionLogin=false;
    // }
    // else{
    //   this.updateprofife.sessionLogin=true;
    // }
   }
   public isViewable: boolean;
   public edit: boolean;
  public enable: boolean;
  assets1 = this.getProfileImage + '?filename=';
  ngOnInit() {
    this.userid = this.getsession.session().userid;
    this.email = this.getsession.session().email;
this.getallExamination();
this.getHistories();

    this.enable = true; 
    this.url = 'assets/images/user.png';
    this.isViewable = true;
    this.edit = true;
    this.assets2 = this.getdata.appconstant + 'getProfileImage?filename=' + this.userid + "&timestamp=" + new Date().getTime();
 
    this.GetUserprofile();
  }
  disable(){ 
    this.enable = !this.enable; 
    this.isViewable = !this.isViewable;
    this.edit = !this.edit;
  }
  errormsg=''
  email:0;
  userid:any;
  changepassword(){
    let getform = this.changepasswordForm.value;
    if (getform.password != getform.cpassword) {
      this.errormsg = "Password and Confirm Password are Mismatching"
      return false
    }
    else if (this.changepasswordForm.invalid) {
      this.markFormGroupTouched(this.changepasswordForm);
      this.getdata.showNotification('bottom', 'right', ' Invalid Password or Confirm Password !!', "danger");
      return false;
    }
    else {
      let reqdata = "email=" + this.email + "&password=" + this.changepasswordForm.value.password;
      return this.makeapi.method(this.changepasswordapi, reqdata, "post")
        .subscribe(data => {
          if (data.status == "success") {
            this.show = 'false'
            this.errormsg = '';
            this.getdata.showNotification('bottom', 'right', ' New password changed Successfully !!!', "success");
          }
          else {
          }
        },
          Error => {
          });
    }
  }

  userProfile:any;
  username:any;
  GetUserprofile() {
    let reqdata = "userid=" + this.userid;
    return this.makeapi.method(this.getProfileapi, reqdata, "post")
      .subscribe(data => {
        this.userProfile = data;
        this.username = data[0].username;
    
        console.log(this.userProfile)
        var getform=this.profileForm.value;
        getform=data[0];
        this.profileForm.patchValue(getform)
      },
        Error => {
        });
  }

  SubmitProfile() {

    if (this.profileForm.invalid) {
     this.markFormGroupTouched(this.profileForm);
     return false;
   }
   else {
     let reqdata = "updateobj=" + JSON.stringify(this.profileForm.value);

     return this.makeapi.method(this.updateProfileapi, reqdata, "post")
       .subscribe(data => {
         if (data.status == "success") {
            console.log(data)
           this.errormsg = '';
           this.getdata.showNotification('bottom', 'right', 'Profile Updated successfully !!', "success");
           this.enable = !this.enable; 
           this.isViewable = !this.isViewable;
           this.edit = !this.edit;
          //  this.editImage();
           this.saveImage();
         }
         else {
         }
       },
         Error => {
         });
   }
 }


  assets2 = 'assets/images/image.png';


  thumblineImage:any;
  thumblineImageFile:any
  url: any;
  Filename: any;
  uploadimage(event) {
    let files = event.target.files;
    console.log(files)
    if (files) {
      this.Filename = files[0].name;
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.url=e.target.result;
        }
        reader.readAsDataURL(files[0]);
    }
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      this.thumblineImage = file.name;
      this.thumblineImageFile = file;
      console.log(this.thumblineImage)
      console.log(this.thumblineImageFile)
    }
   
  }
  singleCategoryImage: any
  singleCategoryImageFile: any;
  thumblineImageFile1: any;
  editimgid: any;


  changeCategoryImage(event,id) {
    if (event.target.files[0].size > 3145728) {
      this.getdata.showNotification('bottom', 'right', 'File size must be less than 3 MB !!', "danger");
      return false;
    }
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      this.singleCategoryImage = file.name;
      this.singleCategoryImageFile = file;
    }
    this.editimgid=id;
    this.thumblineImageFile1 = file;
    // this.editImage()
    this.saveImage();
  }

  // changeProfileImage(event) {
  //   this.viewimage= !this.viewimage
  //   if (event.target.files[0].size > 3145728) {
  //     this.getdata.showNotification('bottom', 'right', 'File size must be less than 3 MB !!', "danger");
  //     return false;
  //   }
  //   let fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     var file: File = fileList[0];
  //     this.profileImageName = file.name;
  //     this.profileImageFile = file;
  //   }
  //   this.editImage()
  // }

  saveImage() {
    let finalformdata: FormData = new FormData();
    finalformdata.append("filename", (this.userid));
    finalformdata.append("flag",('category'));
    finalformdata.append("file", (this.thumblineImageFile));
    this.makeapi.method(this.saveimageapi, finalformdata, 'file')
      .subscribe(
        data => {
          if (data.status == 'success') {
            this.getdata.charname=false
            this.assets2 = this.getProfileImage + '?filename=' + this.userid + "&timestamp=" + new Date().getTime();
            this.getdata.userimage(this.userid);
          //  this. editImage();
          }
          else {
          }
        },
        Error => {
        });
  }

  // editImage() {
  //   let finalformdata: FormData = new FormData();
  //   finalformdata.append("filename", (this.userid));
  //   finalformdata.append("flag", ("user"));
  //   finalformdata.append("file", (this.thumblineImageFile));
  //   this.makeapi.method(this.saveimageapi, finalformdata, 'file')
  //     .subscribe(
  //       data => {
  //         if (data.status == 'success') {
  //           this.assets2 = this.getProfileImage + '?filename=' + this.userid + "&timestamp=" + new Date().getTime();
  //           this.getdata.changeimage(this.assets2);
  //         }
  //         else {
  //         }
  //       },
  //       Error => {
  //       });
  // }
  // getimages(){
  //   let finalformdata: FormData = new FormData();
  //   finalformdata.append("filename", (this.userid));
  //   this.makeapi.method(this.getProfileImage, finalformdata, 'file')
  //     .subscribe(
  //       data => {
  //         console.log(data)
  //       },
  //       Error => {
  //       });
  // }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  allExamination: any;
  getallExamination() {
    let reqdata = "status=" + "published"
    return this.makeapi.method(this.getAllExaminationsapi, reqdata, "postexam")
      .subscribe(data => {
        this.allExamination = data;
        console.log(data)
      },
        Error => {
        });
  }

  getAllHistory:any;
  getHistories() {
    let reqdata = "userid=" + this.userid
    return this.makeapi.method(this.getHistory, reqdata, "postexam")
      .subscribe(data => {
        this.getAllHistory = data;
        console.log(data)
      },
        Error => {
        });
  }
}
