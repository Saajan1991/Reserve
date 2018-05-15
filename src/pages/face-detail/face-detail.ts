import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-face-detail',
  templateUrl: 'face-detail.html',
})
export class FaceDetailPage {

  slidesPerView = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let faces = navParams.get('faces');
    let imageData = navParams.get('image');

    console.log(faces);
    console.log(imageData);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaceDetailPage');
  }

}
