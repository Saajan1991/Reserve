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
  adults = [];
  kids = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.base64Image = navParams.get('image');
    alert(navParams.get('image'));
    this.base64Image = "http://blog.inf.ed.ac.uk/atate/files/2015/11/img-avatars-new-300x207.png";
    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');
    alert(this.TotalNumberOfAdults);
    this.adult(this.TotalNumberOfAdults);
    this.kid(this.TotalNumberOfKids);

  }

  adult(adultNumber) {
    this.adults = Array(adultNumber).fill(0).map((x, i) => i);
  }

  kid(kidNumber){
    this.kids = Array(kidNumber).fill(0).map((x,i)=>i);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageDisplayPage');
  }
}
