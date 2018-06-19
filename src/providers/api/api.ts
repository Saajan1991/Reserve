import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ApiProvider {

  apiAddress = "http://accesscheck.herokuapp.com/api/";

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello ApiProvider Provider');
  }


  loginCheck: boolean;
  //login using email and password to get access token
  login(data1) {
    let data = {
      email: "test@mailinator.com",
      password: "123456"
    };

    try {
      return new Promise(resolve => {
        this.http.post(this.apiAddress + "auth/login", data)
          .subscribe(
            (result) => {
              let authorization = JSON.parse(JSON.stringify(result));
              let access_token = authorization.access_token;
              localStorage.setItem('token', access_token);
              resolve(authorization);
            },
            (error) => {
              console.log(error);
              resolve(error);
            });
      });
    } catch (error) {
      console.log(error);
    }

  }

  //function get List of business
  getBusiness() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.get(this.apiAddress + "businesses", httpOptions);
  }


  //function to Get Business Detail
  getBusinessById(id) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.get(this.apiAddress + "businesses/" + id, httpOptions);
  }

  //function to get Venues under Business
  getVenue(businessId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.get(this.apiAddress + "businesses/" + businessId + "/venues", httpOptions);
  }

  //function to get Venue Details
  getVenueDetails(businessId, venueId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.get(this.apiAddress + "businesses/" + businessId + "/venues/" + venueId, httpOptions);
  }

  //function to get Events under venues
  getEvent(businessId, venueId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.get(this.apiAddress + "businesses/" + businessId + "/venues/" + venueId + "/events", httpOptions);
  }

  //function to get event details
  getEventDetails(businessId, venueId, eventId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.get(this.apiAddress + "businesses/" + businessId + "/venues/" + venueId + "/events/" + eventId, httpOptions);
  }

  //function to get Sub Events under Events
  getSubEvents(businessId, venueId, eventId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.get(this.apiAddress + "businesses/" + businessId + "/venues/" + venueId + "/events/" + eventId + "/subevents", httpOptions);
  }

  //function to add venue 
  storeVenue(businessId, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.post(this.apiAddress + "businesses/" + businessId + "/venues", data, httpOptions);
  }

  //function to Add Business 
  storeBusiness(data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.post(this.apiAddress + "businesses", data, httpOptions);
  }

  //function to Add event 
  storeEvent(businessId, venueId, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      })
    };

    return this.http.post(this.apiAddress + "businesses/" + businessId + "/venues/" + venueId + "/events", data, httpOptions);
  }

}
