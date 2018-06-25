import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController } from 'ionic-angular';

import { TestPage } from '../test/test';
import { FaceDetailPage } from '../face-detail/face-detail';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase';
import { ApiProvider } from '../../providers/api/api';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { DomSanitizer } from '@angular/platform-browser';

import { normalizeURL } from 'ionic-angular';

declare var cordova: any;

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
    private sanitizer: DomSanitizer,
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
    let a = "a";
    this.vision.getFaces("imageDataResult").subscribe((result) => {
      alert("result" + result);
      this.items = JSON.parse(JSON.stringify(result));
      this.labels = this.items.responses[0].labelAnnotations;
      alert(this.labels);
    });

  }


  getImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,' + imageData;
      // this.imageURI = this.sanitizer.bypassSecurityTrustUrl(imageData);
      // this.imageURI = normalizeURL(imageData);
      // return path;
      // this.imageURI = imageData;
      // this.upload(imageDataResult);

    }, (err) => {
      console.log(err);
      // this.presentToast(err);
    });
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  

}