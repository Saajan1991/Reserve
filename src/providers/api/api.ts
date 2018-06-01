import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class ApiProvider {

  authorization;
  public access_token;    //access token for authorization to api

  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello ApiProvider Provider');
  }

  loginCheck;
  //login using email and password to get access token
  login() {
    let data = {
      email: "test@mailinator.com",
      password: "123456"
    };
    let apiAddress = "https://accesscheck.herokuapp.com/api/auth/login";

    this.loading.present();

    let a = this.http.post(apiAddress, data)
      .subscribe((
        result => {
          let loginCheck = false;
          this.authorization = JSON.parse(JSON.stringify(result));
          this.access_token = this.authorization.access_token;
          console.log(this.authorization.access_token);
          loginCheck = true;
          return true;
        }),
        error => {
          console.log(error)
        },
        () => {
          this.loading.dismiss();
        });
    return false;
    // if (this.loginCheck == true) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
  }

  getBusiness() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };

    let response = this.http.get("http://accesscheck.herokuapp.com/api/businesses", httpOptions);
    return response;
  }

  getBusinessById(id) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };

    let response = this.http.get("http://accesscheck.herokuapp.com/api/businesses/" + id, httpOptions);
    return response;
  }

  getVenue(businessId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };
    let response = this.http.get("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues", httpOptions);
    return response;

  }

  getVenueDetails(businessId, venueId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };
    let response = this.http.get("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues/" + venueId, httpOptions);
    return response;
  }

  getEvent(businessId, venueId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };
    let response = this.http.get("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues/" + venueId + "/events", httpOptions);
    return response;
  }

  //get event details
  //
  getEventDetails(businessId, venueId, eventId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };
    let response = this.http.get("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues/" + venueId + "/events/" + eventId, httpOptions);
    return response;
  }

  //function to store venue
  storeVenue(businessId, data) {
    // let data = {
    //   name: "Venue Forest",
    //   sqm_capacity: "1234.56",
    //   ppl_capacity: "500"
    // };
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };
    let response = this.http.post("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues", data, httpOptions);
    return response;
  }

  storeBusiness(data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };
    let response = this.http.post("https://accesscheck.herokuapp.com/api/businesses", data, httpOptions);
    return response;
  }

  storeEvent(businessId, venueId, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };
    let response = this.http.post("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues/" + venueId + "/events", data, httpOptions);
    return response;
  }

}
