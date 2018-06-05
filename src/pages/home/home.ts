import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController } from 'ionic-angular';

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
    formBuilder: FormBuilder) {
    // this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.days = [
      {
        'day': 'Sunday',
        'status': false,
        'startTime': '',
        'finishTime': ''
      },
      {
        'day': 'Monday',
        'status': false,
        'startTime': '',
        'finishTime': ''
      },
      {
        'day': 'Tuesday',
        'status': false,
        'startTime': '',
        'finishTime': ''
      },
      {
        'day': 'Wednesday',
        'status': false,
        'startTime': '',
        'finishTime': ''
      },
      {
        'day': 'Thursday',
        'status': false,
        'startTime': '',
        'finishTime': ''
      },
      {
        'day': 'Friday',
        'status': false,
        'startTime': '',
        'finishTime': ''
      },
      {
        'day': 'Saturday',
        'status': false,
        'startTime': '',
        'finishTime': ''
      },
    ];
  }

  login() {
    // this.api.login();
    this.api.login();
  }

  list() {
    let a = this.api.getEvent(1, 1);
    a.subscribe((result => {
      this.eventList = JSON.parse(JSON.stringify(result)).events;
      console.log(result);
      return this.eventList;
    }));
  }

  dayJsondata = [];
  changeDay(day) {
    console.log(day);
    if (day.status == true) {
      // this.showTimeInput = true;
    }
  }

  submit() {
    let data = this.days;
    let arrayTime = [];
    for (let d of data) {
      if (d.startTime == "" || d.finishTime == "") {
        arrayTime.push("null");
      }
      else {
        arrayTime.push(d.startTime + '-' + d.finishTime);
      }
    }
    // console.log(arrayTime);
    var dataString = arrayTime.toString();
    console.log(dataString);
  }

  photo() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    try {
      //open camera in device
      this.camera.getPicture(options).then((imageData) => {
        let imageDataResult = 'data:image/jpeg;base64,' + imageData;
        // this.upload(imageDataResult);
        this.vision.getLabels(imageDataResult).subscribe((result) => {
          this.items = JSON.parse(JSON.stringify(result));
          this.labels = this.items.responses[0].labelAnnotations;
          alert(this.labels);
        });
      }, err => {
        alert(err);
      });
    }
    catch (e) {
      console.log(e);
    }
  }
}