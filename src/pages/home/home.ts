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
    let a = this.api.getBusiness();
    a.subscribe((result => {
      this.businessList = JSON.parse(JSON.stringify(result)).businesses;
      let list = result;
      console.log(this.businessList.businesses);
    }));
  }
}