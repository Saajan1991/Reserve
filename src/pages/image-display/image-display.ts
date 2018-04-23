import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

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


  options: BarcodeScannerOptions;
  private results: {
    text: string,
    cancelled: boolean,
    format: string
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcode: BarcodeScanner) {
    this.base64Image = navParams.get('image');
    // this.base64Image = "http://blog.inf.ed.ac.uk/atate/files/2015/11/img-avatars-new-300x207.png";
    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');
    this.adult(this.TotalNumberOfAdults);
    this.kid(this.TotalNumberOfKids);

  }

  adult(adultNumber) {
    this.adults = Array(adultNumber).fill(0).map((x, i) => i);
  }

  kid(kidNumber) {
    this.kids = Array(kidNumber).fill(0).map((x, i) => i);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageDisplayPage');
  }

  async scanBarcodeAdult(id) {
    this.options = {
      prompt: 'Scan a barcode to see the results'
    };
    this.results = await this.barcode.scan(this.options);

    document.querySelector('#adulttext' + id).innerHTML = this.results.text;
  }

  async scanBarcodeKid(id){
    
  }
}