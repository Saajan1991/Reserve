import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-find',
  templateUrl: 'find.html',
})
export class FindPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let barcode = this.navParams.get('barcodeResult');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPage');
  }

}
