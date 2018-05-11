import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageDisplayPage } from '../image-display/image-display';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  htmlToAdd: any;
  htmlToDisplay: any;
  downloadURL: any;
  TotalNumberOfAdults = 0;
  TotalNumberOfKids = 0;

  public base64image: string;

  faces: { response: {} };
  items;

  filename;

  public storageRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    protected _sanitizer: DomSanitizer) {
    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }


  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    //open camera in device
    this.camera.getPicture(options).then((imageData) => {
      let imageDataResult = 'data:image/jpeg;base64,' + imageData;
      let downloadUrl = this.upload(imageDataResult);
    }, err => {
      alert(err);
    });
  }


  //funtion to upload image 
  //inlcudes face detection
  public upload(imageDataResult) {
    try {
      this.storageRef = firebase.storage().ref();
    }
    catch (e) {
      alert(e);
    }

    //generate name for file based on date
    this.filename = Math.floor(Date.now() / 1000);
    const imageRef = this.storageRef.child(`images/${this.filename}.jpg`);
    imageRef.putString(imageDataResult, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      alert("upload Success");

      //vision api to detect faces
      this.vision.getFaces(this.filename).subscribe((result) => {
        this.items = JSON.parse(JSON.stringify(result));
        this.faces = this.items.responses[0].faceAnnotations;

        //send data to imageDisplayPage
        this.navCtrl.push(ImageDisplayPage, {
          image: imageDataResult,
          adults: this.TotalNumberOfAdults,
          kids: this.TotalNumberOfKids,
          faces: this.items
        });
      }, err => {
        alert(err);
      });
    }).catch(function (err) {
      return err;
    });

    return this.downloadURL;
  }
}
