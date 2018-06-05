import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckinPage } from '../checkin/checkin';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CheckoutPage } from '../checkout/checkout';
import { FindPage } from '../find/find';
import { EventPage } from '../event/event';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private barcode: BarcodeScanner) {
  }


  //got to check in page
  checkIn() {
    this.navCtrl.push(CheckinPage);
  }

  //go to check out page
  async checkOut() {

    this.options = { prompt: 'Scan the barcode' };
    this.barcodeResults = await this.barcode.scan(this.options);
    let barcodeText = this.barcodeResults.text;
    alert("barcode Result 1" + barcodeText);
    this.navCtrl.push(CheckoutPage, {
      barcodeResult: barcodeText
    });
    alert("barcode Result 2")
  }

  //find people using barcode
  find() {
    this.scanBarcode().then(result => {
      this.navCtrl.push(FindPage, {
        barcodeResult: this.barcodeResults
      });
    });
  }

  //function to scan barcode
  async scanBarcode() {
    this.options = { prompt: 'Scan the barcode' };
    this.barcodeResults = await this.barcode.scan(this.options);
    // alert(this.barcodeResults.text);
  }
}
