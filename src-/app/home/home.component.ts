import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
import { DatatransferService } from '../services/datatransfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from './../services/canactivate.service'
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private getCategoriesapi = this.getdata.appconstant + 'getCategories';
  private filterSubCategory = this.getdata.appconstant + 'filterSubCategory';
  private getAllSubCategoriesapi = this.getdata.appconstant + 'getAllSubCategories';

  constructor(private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService, private http: Http, private getdata: DatatransferService, private getsession: AuthGuard,) { }

  ngOnInit() {
  }
  FilterByCategorylist = [];
  FilterByTechnologylist =[];
  FilterByLevellist = [];

  filterBy(event,filterBy){
    if(event.target.check == true){
      if(filterBy == "category"){
        let val = $(".checksingle1:checkbox:checked").map(function(){
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByCategorylist = val;
      }
      else if(filterBy == "level"){
        let val = $(".checksingle2:checkbox:checked").map(function(){
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByLevellist = val;
      }
      else{
        let val = $(".checksingle3:checkbox:checked").map(function(){
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByLevellist = val;
      }
    }
  return 0;
  }
//   filterBy(event, filterBy) {
//     if (event.target.checked == true) {
//      if (filterBy == "level") {
//         let val = $(".checksingle2:checkbox:checked").map(function () {
//           var getdata = this.value;
//           return getdata;
//         }).get();
//         this.FilterByLevellist = val;
//       }
//       else if(filterBy == "technology"){
//         let val = $(".checksingle3:checkbox:checked").map(function(){
//           var getdata = this.value;
//           return getdata;
//         }).get();
//         this.FilterByTechnologylist =val;

//       }
//       else {
//         let val = $(".checksingle1:checkbox:checked").map(function () {
//           var getdata = this.value;
//           return getdata;
//         }).get();
//         this.FilterByCategorylist = val;
//       }
//     }
//     else {
//     if (filterBy == "level") {
//         $('.checksingleAllLevel:checkbox').prop('checked', false);
//         let val = $(".checksingle3:checkbox:checked").map(function () {
//           var getdata = this.value;
//           return getdata;
//         }).get();
//         this.FilterByLevellist = val;
//       }
//       else if(filterBy == "technology"){
// $('.checksingle')

//       }
//       else {
//         $('.checksingleAllCategory:checkbox').prop('checked', false);
//         let val = $(".checksingle4:checkbox:checked").map(function () {
//           var getdata = this.value;
//           return getdata;
//         }).get();
//         this.FilterByCategorylist = val;
//       }
//     }

//   }

  SubCategories:any;
  getSubCategories() {
    let reqdata = "status=" + "published"
    return this.makeapi.method(this.getAllSubCategoriesapi, reqdata, "postduriCat")
      .subscribe(data => {
        this.SubCategories = data;
        console.log(data)
      },
        Error => {
        });
  }
  allCategories :any;
  getCategories() {
    let reqdata = "status=" + "published"
    return this.makeapi.method(this.getCategoriesapi, reqdata, "postduriCat")
      .subscribe(data => {
        this.allCategories = data;
     console.log(this.allCategories)
      },
        Error => {
        });
  }
  
}
