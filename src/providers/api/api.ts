import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiProvider {

  authorization;
  public access_token;

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  login() {
    let data = {
      email: "test@mailinator.com",
      password: "123456"
    };
    let apiAddress = "https://accesscheck.herokuapp.com/api/auth/login";
    let a = this.http.post(apiAddress, data);

    a.subscribe((result => {
      this.authorization = JSON.parse(JSON.stringify(result));
      this.access_token = this.authorization.access_token;
      console.log(this.authorization.access_token);
      alert(result);
      alert("login success");
      alert(this.access_token);
    }));

    return a;
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

  getEventDetails(businessId, venueId, eventId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.access_token
      })
    };
    let response = this.http.get("https://accesscheck.herokuapp.com/api/businesses/" + businessId + "/venues/" + venueId + "/events/" + eventId, httpOptions);
    return response;
  }

}
