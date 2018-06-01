import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController } from 'ionic-angular';

import { TestPage } from '../test/test';
import { FaceDetailPage } from '../face-detail/face-detail';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eventList: any;
businessList;
  constructor(public navCtrl: NavController,
    private api: ApiProvider,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    formBuilder: FormBuilder) {
  }

  login() {
    // this.api.login();
    this.api.login();
  }

  list(){
    let a = this.api.getEvent(1, 1);
    a.subscribe((result => {
      this.eventList = JSON.parse(JSON.stringify(result)).events;
      console.log(result);
      return this.eventList;
    }));
  }

  // storeVenue(){
  //   this.api.storeVenue(1).subscribe((result => {
  //    let response = result;
  //    let jsonResponse = JSON.parse(JSON.stringify(result));
  //   }));
  // }
}