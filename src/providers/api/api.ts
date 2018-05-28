import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  login(){
    let data = JSON.stringify({
      email: "test@mailinator.com",
      password: "123456"
    })
    // let test = "https://accesscheck.herokuapp.com";
    let apiAddress = "https://accesscheck.herokuapp.com/api/auth/login";
    let a = this.http.post(apiAddress, data);
    return a;
  }

  getBusiness(){
    
    this.http.get("http://accesscheck.herokuapp.com/api/businesses");
  }

}
