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
  username: any;
  logintype: any;
  userid: any;
  filter = '';
  sessionnull = true;
  private getCategoriesapi = this.getdata.appconstant + 'getCategories';
  private filterSubCategory = this.getdata.appconstant + 'filterExaminationUser';
  private getTechnologiesapi = this.getdata.appconstant + 'getTechnologies';
  private getAllExaminationsapi = this.getdata.appconstant + 'getAllExaminations';
  constructor(private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService, private http: Http, private getdata: DatatransferService, private getsession: AuthGuard, ) { }

  ngOnInit() {
    this.getCategories();
    // this.getTechnologies();
    this.getallExamination()
    this.session();
    if (this.session() == null) {
      this.sessionnull = true;
      this.router.navigateByUrl('/exam-instruction');
      return true;
    }
    else {
      this.sessionnull = false;
      this.logintype = this.getsession.session().type;
      this.userid = this.getsession.session().userid;
      this.username = this.getsession.session().username;

      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
    }
    document.onkeydown = fkey;
    document.onkeypress = fkey
    document.onkeyup = fkey;

    function fkey(e) {
      e = e || window.event;
      if (e.keyCode === 122) {
        return (e.which || e.keyCode) != 122;
      }
      else if (e.keyCode === 123) {
        return (e.which || e.keyCode) != 123;
      }
      else if (e.keyCode === 93) {
        return (e.which || e.keyCode) != 93;
      }
      else if (e.keyCode === 27) {
        return (e.which || e.keyCode) != 27;
      }
      else if ((e.which === 73) && e.ctrlKey && e.shiftKey) {
        return false;
      }
    }
  }
  session() {
    return JSON.parse(localStorage.getItem("Assessment-tool"));
  }

  allCategories: any;
  getCategories() {
    let reqdata = "status=" + "published"
    return this.makeapi.method(this.getCategoriesapi, reqdata, "postduriCat")
      .subscribe(data => {
        this.allCategories = data;
        if (data.length > 0) {
          this.gettechnology(data[0]._id);
        }


        console.log(this.allCategories)
      },
        Error => {
        });
  }
  allTechnologies: any;
  gettechnology(value) {
    return this.makeapi.method(this.getTechnologiesapi + "?categoryid=" + value, "", "postduriCat")
      .subscribe(data => {
        if (data.length > 0) {
          this.allTechnologies = data[0].sub;
        } else {
          this.allTechnologies = [];
        }
        console.log(this.allTechnologies)
      },
        Error => {
        });
  }
  allExamination: any;
  getallExamination() {
    let reqdata = "status=" + "published"
    return this.makeapi.method(this.getAllExaminationsapi, reqdata, "postexam")
      .subscribe(data => {
        this.allExamination = data;
      },
        Error => {
        });
  }

  Startexam(index) {
    
    if (this.session() == null) {
      this.sessionnull = true;
    }
    else { 
      var singleExam=this.allExamination[index]
      this.getdata.setsingleExamData(singleExam,'/exam-instruction');
    }
  }
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 1000 * 60 * 60 * 24));
    var expires = "expires=" + d.toUTCString();
    window.document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  FilterByCategorylist = [];
  FilterByTechnology = [];
  FilterByLevellist = [];
  

  filterBy(event, filterBy) {
    if (event.target.checked == true) {
      if (filterBy == "techname") {
        let val = $(".checksingle1:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByTechnology = val;
      }
      else if (filterBy == "level") {
        let val = $(".checksingle2:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByLevellist = val;
      }
      else {
        let val = $(".checksingle3:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByCategorylist = val;
      }
    }



    else {
      if (filterBy == "techname") {
        let val = $(".checksingle1:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByTechnology = val;
      }
      else if (filterBy == "level") {
        let val = $(".checksingle2:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByLevellist = val;
      }
      else {
        let val = $(".checksingle3:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByCategorylist = val;
      }
    }

    this.filterbySearch()
  }
  
  checkAllTechnology(ischecked) {
    if (ischecked == true) {
      $('.checksingle1:checkbox').prop('checked', true);
      var checkforFilter = $('.checksingle1:checked').map(function () {
        return $(this).val();
      }).get();
      this.FilterByTechnology = checkforFilter;
    }
    else {
      $('.checksingle1:checkbox').prop('checked', false);
      this.FilterByTechnology = [];
    }
  }

  checkAllLevel(ischecked) {
    if (ischecked == true) {
      $('.checksingle2:checkbox').prop('checked', true);
      var checkforFilter = $('.checksingle2:checked').map(function () {
        return $(this).val();
      }).get();
      this.FilterByLevellist = checkforFilter;
    }
    else {
      $('.checksingle2:checkbox').prop('checked', false);
      this.FilterByLevellist = [];
    }
  }

  checkAllCategoty(ischecked) {
    if (ischecked == true) {
      $('.checksingle3:checkbox').prop('checked', true);
      var checkforFilter = $('.checksingle3:checked').map(function () {
        return $(this).val();
      }).get();
      this.FilterByCategorylist = checkforFilter;
    }
    else {
      $('.checksingle3:checkbox').prop('checked', false);
      this.FilterByCategorylist = [];
    }
  }



  filterbySearch() {
    let reqdata = "filterby=" + JSON.stringify({ "searchstr": this.filter, "techid": this.FilterByTechnology, "level": this.FilterByLevellist, "category": this.FilterByCategorylist, "status": "published" })
    return this.makeapi.method(this.filterSubCategory, reqdata, "post")
      .subscribe(data => {
       this.allExamination = data;
      },
        Error => {
        });
  }
}
