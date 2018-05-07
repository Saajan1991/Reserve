import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageDisplayPage } from '../image-display/image-display';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';

import firebase from 'firebase';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  downloadURL: any;
  filename: number;
  items1: any;
  TotalNumberOfAdults = 0;
  TotalNumberOfKids = 0;

  public base64image: string;

  labels: { response: {} };
  items;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider) {
    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  // takePhoto() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.PNG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     this.base64image = 'data:image/jpeg;base64,' + imageData;
  //     this.navCtrl.push(ImageDisplayPage, { image: this.base64image, adults: this.TotalNumberOfAdults, kids: this.TotalNumberOfKids });
  //   }, (err) => {
  //     // Handle error
  //   });
  // }

  //set options for camera
  public cameraOptions() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return options;
  }


  takePhoto() {
    let options = this.cameraOptions();

    //open camera in device
    this.camera.getPicture(options).then((imageData) => {
      
      let imageDataResult = 'data:image/jpeg;base64,' + imageData;
      let downloadURL = this.upload(imageDataResult);

      //send data to imageDisplayPage
      this.navCtrl.push(ImageDisplayPage, {
        image: imageDataResult,
        adults: this.TotalNumberOfAdults,
        kids: this.TotalNumberOfKids
      });


      //vision Api call 
      // this.vision.getLabels(imageData).subscribe((result) => {

      //   this.items = JSON.stringify(result);
      //   this.items = JSON.parse(this.items);
      //   this.labels = this.items.responses[0].labelAnnotations;

      //   //convert imageData to base64Image
      //   this.base64image = 'data:image/jpeg;base64,' + imageData;

      //   //send data to imageDisplayPage
      //   this.navCtrl.push(ImageDisplayPage, {
      //     image: this.base64image,
      //     adults: this.TotalNumberOfAdults,
      //     kids: this.TotalNumberOfKids,
      //     labels: this.labels
      //   });
      // }, err => {
      //   alert(err);
      // });
    }, err => {
      alert(err);
    });
  }


  //google vision api to get faces
  private faceDetection(filename) {

    this.vision.getFaces(filename).subscribe((result) => {

      this.items = JSON.parse(JSON.stringify(result));

      this.items1 = this.items.responses[0].faceAnnotations;

      //total number of faces in the image
      if (this.items != undefined) {
        alert("Total Face Detected: " + this.items.responses[0].faceAnnotations.length);
        this.items1 = this.items.responses[0].faceAnnotations;
      }
      else {
        alert("Face Not Detected");
      }

      alert(this.items1 + "item to display");
    }, err => {
      alert(err);
    });
  }

  //upload file to firebase
  upload(imageDataResult) {

    let storageRef = firebase.storage().ref();

    // Create a timestamp as filename
    this.filename = Math.floor(Date.now() / 1000);

    // this.filename = "HelloImage";

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${this.filename}.jpg`);

    imageRef.putString(imageDataResult, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      // Do something here when the data is succesfully uploaded!
      this.faceDetection(this.filename);

      // alert("label");
    }).catch(function (err) {
      return err
    });
    return this.downloadURL;
  }


}
