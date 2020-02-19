import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MyaccountService {


sessionLogin=false;


  private messageSource = new BehaviorSubject('myaccount');
  currentMessage = this.messageSource.asObservable();


  private callLoginModalapi = new BehaviorSubject('call');
  callLogin = this.callLoginModalapi.asObservable();

  private Myaccountsource = new BehaviorSubject('getcallProfile');
  currentprofile = this.Myaccountsource.asObservable();

  private callProfileupdate = new BehaviorSubject('callProfile');
  callProfile = this.callProfileupdate.asObservable();

  constructor() { 
    if (this.session() == null) {
      this.sessionLogin=false;
    }
    else{
      this.sessionLogin=true;
    }
    
  }
  
  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  callLoginModal(data: any){
    this.callLoginModalapi.next(data);
  }

  changeProfile(message:any){
    this.Myaccountsource.next(message)
  }
  getcallProfile(data:any){
    this.callProfileupdate.next(data)
  }
/** Get Session Data */
session() {
  return JSON.parse(localStorage.getItem("Assessment-tool"));
}


}