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

  public base64Image: string;

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
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    alert("camera option");

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      // alert(base64Image);
      alert("test");
      this.navCtrl.push(ImageDisplayPage, { image: this.base64Image, adults: this.TotalNumberOfAdults, kids: this.TotalNumberOfKids });
    }, (err) => {
      // Handle error
    });
  }

}
