import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-image-display',
  templateUrl: 'image-display.html',
})
export class ImageDisplayPage {

  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.base64Image = navParams.get('image');
    alert(this.base64Image);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageDisplayPage');
  }
}