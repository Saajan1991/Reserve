import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;
  private results: {};
  adults = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcode: BarcodeScanner) {
    this.adults = Array(3).fill(0).map((x, i) => i);
  }


  async scanBarcode(id) {
    alert(id);
    this.options = {
      prompt: 'Scan a barcode to see the results'
    };
    // this.results = await this.barcode.scan(this.options);

    //this.results = await this.barcode.scan();
    console.log(this.results);

  }


}