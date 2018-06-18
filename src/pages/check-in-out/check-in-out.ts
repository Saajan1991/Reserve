import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CheckinPage } from '../checkin/checkin';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CheckoutPage } from '../checkout/checkout';
import { FindPage } from '../find/find';

@Component({
  selector: 'page-check-in-out',
  templateUrl: 'check-in-out.html',
})
export class CheckInOutPage {

  options: BarcodeScannerOptions;
  //result for barcode scan
  private barcodeResults: {
    text: string,
    cancelled: boolean,
    format: string
  };

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    private barcode: BarcodeScanner) {
  }

  //got to check in page
  checkIn() {
    this.navCtrl.push(CheckinPage);
  }

  //go to check out page
  async checkOut() {
    // this.options = { prompt: 'Scan the barcode' };
    // this.barcodeResults = await this.barcode.scan(this.options);
    // let barcodeText = this.barcodeResults.text;
    let barcodeText = '123456789018';
    this.navCtrl.push(CheckoutPage, {
      barcodeResult: barcodeText
    });
  }

  //find people using barcode
  async find() {
    this.options = { prompt: 'Scan the barcode' };
    this.barcodeResults = await this.barcode.scan(this.options);
    let barcodeText = this.barcodeResults.text;
    this.navCtrl.push(FindPage, {
      barcodeResult: barcodeText
    });
  }

  //function to scan barcode
  async scanBarcode() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.options = { prompt: 'Scan the barcode' };
    let barcodeResults = await this.barcode.scan(this.options);
    // alert(this.barcodeResults.text);
    loading.dismiss();
    return barcodeResults;
  }
}
