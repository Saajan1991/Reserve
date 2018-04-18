import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageDisplayPage } from '../image-display/image-display';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  TotalNumberOfAdults = 0;
  TotalNumberOfKids = 0;

  public base64image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      // use file uri to avoid memory issues
      // destinationType:this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      //encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    alert("camera option");

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64image = 'data:image/jpeg;base64,' + imageData;
      this.navCtrl.push(ImageDisplayPage, { image: this.base64image, adults: this.TotalNumberOfAdults, kids: this.TotalNumberOfKids });
    }, (err) => {
      // Handle error
    });
  }

}
