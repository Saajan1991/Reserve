import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController, ModalController, App, ViewController } from 'ionic-angular';

import { TestPage } from '../test/test';
import { FaceDetailPage } from '../face-detail/face-detail';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase';
import { ApiProvider } from '../../providers/api/api';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imageURI;
  lastImage;
  barcodeCheckList;
  labels: any;
  faces: any;
  items: any;
  filename: number;
  eventList: any;
  public storageRef;

  days;
  dayStatus: boolean;
  businessList;
  constructor(public navCtrl: NavController,
    private vision: GoogleCloudVisionServiceProvider,
    private api: ApiProvider,
    private camera: Camera,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public appCtrl: App,
    public viewCtrl : ViewController,
    formBuilder: FormBuilder) {
  }


  next() {
    let addEventModal = this.modalCtrl.create(TestPage, {
     viewCtrl: this.viewCtrl
    });
    addEventModal.present();
  }

}