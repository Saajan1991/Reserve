import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello ApiProvider Provider');
  }


  loginCheck: boolean;
  //login using email and password to get access token
  async login(data) {
    // let data = {
    //   email: "test@mailinator.com",
    //   password: "123456"
    // };
    
    let apiAddress = "https://accesscheck.herokuapp.com/api/auth/login";

    this.http.post(apiAddress, data).subscribe((
      result => {
        let authorization = JSON.parse(JSON.stringify(result));
        let access_token = authorization.access_token;
        localStorage.setItem('token', access_token)
        console.log(authorization.access_token);
        this.loginCheck = true;
        return this.loginCheck;
      }),
      error => {
        console.log(error)
        this.loginCheck = false;
        return this.loginCheck;
      },
      () => { });

    // return await this.loginCheck;
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
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    let response = this.http.get("http://accesscheck.herokuapp.com/api/businesses", httpOptions);
    return response;
  }

  getBusinessById(id) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    let response = this.http.get("http://accesscheck.herokuapp.com/api/businesses/" + id, httpOptions);
    return response;
  }

  getVenue(businessId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };
    let response = this.http.get("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues", httpOptions);
    return response;

  }

  getVenueDetails(businessId, venueId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };
    let response = this.http.get("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues/" + venueId, httpOptions);
    return response;
  }

  getEvent(businessId, venueId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
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
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };
    let response = this.http.get("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues/" + venueId + "/events/" + eventId, httpOptions);
    return response;
  }

  getSubEvents(businessId, venueId, eventId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };
    let response = this.http.get("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues/" + venueId + "/events/" + eventId + "/subevents", httpOptions);
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
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };
    let response = this.http.post("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues", data, httpOptions);
    return response;
  }

  storeBusiness(data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };
    let response = this.http.post("https://accesscheck.herokuapp.com/api/businesses", data, httpOptions);
    return response;
  }

  storeEvent(businessId, venueId, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };
    let response = this.http.post("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues/" + venueId + "/events", data, httpOptions);
    return response;
  }

}
