import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let barcode = this.navParams.get('barcodeResult');
  }                          

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

}
