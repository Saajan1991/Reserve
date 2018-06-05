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
  faces: any;
  items: any;
  filename: number;
  eventList: any;

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
        this.upload(imageDataResult);
      }, err => {
        alert(err);
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  public upload(imageDataResult) {
    try {
      // this.storageRef = firebase.storage().ref();
      //generate name for file based on date
      this.filename = Math.floor(Date.now() / 1000);
      // const imageRef = this.storageRef.child(`images/${this.filename}.jpg`);
      // imageRef.putString(imageDataResult, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      //   let toast = this.toastCtrl.create({
      //     message: "Upload Success",
      //     duration: 2000,
      //     position: 'bottom'
      //   });
      //   toast.present();
      // alert("upload Success");

      //vision api to detect faces
      this.vision.getLabels(this.filename).subscribe((result) => {
        this.items = JSON.parse(JSON.stringify(result));
        this.faces = this.items.responses[0].faceAnnotations;

        //send data to imageDisplayPage
        // this.navCtrl.push(ImageDisplayPage, {
        //   image: imageDataResult,
        //   adults: this.TotalNumberOfAdults,
        //   kids: this.TotalNumberOfKids,
        //   faces: this.items
        // });
      }, err => {
        alert(err);
      });
      // return this.downloadURL;
    }
    catch (e) {
      alert(e);
    }
  }



}