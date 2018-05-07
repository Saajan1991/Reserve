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
      this.vision.getLabels(imageData).subscribe((result) => {
        // alert("Save success");
        this.items = JSON.stringify(result);
        this.items = JSON.parse(this.items);
        // alert(this.items);
        this.labels = this.items.responses[0].labelAnnotations;
        // alert(this.labels);

        this.base64image = 'data:image/jpeg;base64,' + imageData;

        //send data to imageDisplayPage
        this.navCtrl.push(ImageDisplayPage, {
          image: this.base64image,
          adults: this.TotalNumberOfAdults,
          kids: this.TotalNumberOfKids,
          labels: this.labels
        });
      }, err => {
        alert(err);
      });
    }, err => {
      alert(err);
    });
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


