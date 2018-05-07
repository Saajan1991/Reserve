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
  TotalNumberOfAdults = 0;
  TotalNumberOfKids = 0;

  public base64image: string;

  labels: { response: {} };
  items;

  filename;

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
      this.base64image = 'data:image/jpeg;base64,' + imageData;
      let downloadUrl = this.upload(this.base64image);

    }, err => {
      alert(err);
    });
  }

  upload(imageDataResult) {
    let storageRef = firebase.storage().ref();
    this.filename = Math.floor(Date.now() / 1000);
    alert("Filename " + this.filename);
    const imageRef = storageRef.child(`images/${this.filename}.jpg`);
    imageRef.putString(imageDataResult, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      this.vision.getFaces(this.filename).subscribe((result) => {
        alert("Success get face");
        this.items = JSON.parse(JSON.stringify(result));
        this.labels = this.items.responses[0].faceAnnotations;
        alert(this.labels);
        if (this.items != undefined) {
          alert("Total Face Detected: " + this.items.responses[0].faceAnnotations.length);
          this.labels = this.items.responses[0].faceAnnotations;
        }
        else {
          alert("Face Not Detected");
        }
        alert(this.labels + "item to display");
      }, err => {
        alert(err);
      });

      // alert("label");
    }).catch(function (err) {
      return err
    });
    return this.downloadURL;
  }

}




// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { ImageDisplayPage } from '../image-display/image-display';
// import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
// import firebase from 'firebase';

// @Component({
//   selector: 'page-detail',
//   templateUrl: 'detail.html',
// })
// export class DetailPage {

//   TotalNumberOfAdults = 0;
//   TotalNumberOfKids = 0;

//   public base64image: string; 

//   labels: { response: {} };
//   items;

//   constructor(
//     public navCtrl: NavController,
//     public navParams: NavParams,
//     private camera: Camera,
//     private vision: GoogleCloudVisionServiceProvider) {
//     this.TotalNumberOfAdults = navParams.get('adults');
//     this.TotalNumberOfKids = navParams.get('kids');
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad DetailPage');
//   }


//   takePhoto() {

//     const options: CameraOptions = {
//       quality: 100,
//       targetHeight: 500,
//       targetWidth: 500,
//       destinationType: this.camera.DestinationType.DATA_URL,
//       encodingType: this.camera.EncodingType.PNG,
//       mediaType: this.camera.MediaType.PICTURE,
//       correctOrientation: true
//     }

//     //open camera in device
//     this.camera.getPicture(options).then((imageData) => {
//       this.vision.getLabels(imageData).subscribe((result) => {
//         // alert("Save success");
//         this.items = JSON.stringify(result);
//         this.items = JSON.parse(this.items);
//         // alert(this.items);
//         this.labels = this.items.responses[0].labelAnnotations;
//         // alert(this.labels);

//         this.base64image = 'data:image/jpeg;base64,' + imageData;

//         //send data to imageDisplayPage
//         this.navCtrl.push(ImageDisplayPage, {
//           image: this.base64image,
//           adults: this.TotalNumberOfAdults,
//           kids: this.TotalNumberOfKids,
//           labels: this.labels
//         });
//       }, err => {
//         alert(err);
//       });
//     }, err => {
//       alert(err);
//     });
//   }

// }


