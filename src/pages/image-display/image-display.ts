import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-image-display',
  templateUrl: 'image-display.html',
})
export class ImageDisplayPage {

  public base64Image: string;

  TotalNumberOfAdults = 0;
  TotalNumberOfKids = 0;
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.base64Image = navParams.get('image');
    alert(this.base64Image);

    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');

    this.adult(this.TotalNumberOfAdults);
    // this.kid(this.TotalNumberOfKids);

  }

  adult(adultNumber) {
    this.items = Array(adultNumber).fill(0).map((x, i) => i);
  }

  // kid(kidNumber){
  //   this.items = Array(kidNumber).fill(0).map((x,i)=>i);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageDisplayPage');
  }
}
