import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { CheckInOutPage } from '../check-in-out/check-in-out';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  barcodeData;
  name;
  gender;
  age;
  barcode;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let barcode = this.navParams.get('barcodeResult');
    this.checkBarcode(barcode).then((result) => {

      if (result != undefined) {
        this.barcodeData = result;
        this.name = this.barcodeData.firstName;
        this.gender = this.barcodeData.gender;
        this.age = this.barcodeData.age;
        this.barcode = this.barcodeData.barcode;
      } else {
        alert("No barcode found");
        this.navCtrl.setRoot(CheckInOutPage);
      }

    });
  }

  async checkBarcode(barcode) {
    let abcData = {};
    let barcodeCheckList = [];

    var ref = firebase.database().ref("visits/event/images");     //reference to database folder

    return new Promise(resolve => {
      var arg = ref.once('value', function (snapshot) {
        console.log(snapshot.val());
        let data = snapshot.val();
        let barcodeData;
        let tempArray = [];

        for (var key in data) {
          tempArray.push(data[key]);
        }
        console.log(tempArray);

        tempArray.forEach(result => {
          for (var a in result) {
            console.log(result[a].barcode);
            let barcode1 = result[a].barcode;

            barcodeCheckList.push(barcode1);
            if (barcode1 == barcode) {
              barcodeData = result[a];
            }
          }
        });

        // let list = barcodeCheckList;
        // var test = list.indexOf(barcode);
        // // alert("the barcode is in index  " + test);

        // if (test > -1) {
        //   console.log("Barcode is already used");
        //   alert("Barcode is already used");
        // } else {
        //   console.log("Unique Barcode");
        //   alert("Unique Barcode");
        // }

        resolve(barcodeData);
      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }
}



