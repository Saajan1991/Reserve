import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  barcodeData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let barcode = this.navParams.get('barcodeResult');
    var a = this.checkBarcode(barcode);
    console.log(this.barcodeData);
  }


  async checkBarcode(barcode) {
    let abcData = {};
    let barcodeCheckList = [];
    var ref = firebase.database().ref("visits/event/images");     //reference to database folder


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
            console.log(barcodeData);
          }
        }
        // return this.barcodeData = ['123'];
      });

      
      let list = barcodeCheckList;
      var test = list.indexOf(barcode);
      // alert("the barcode is in index  " + test);

      return barcodeData;
    });

    // return barcodeData;

    // if (test > -1) {
    //   console.log("Barcode is already used");
    //   alert("Barcode is already used");
    //   return false;
    // } else {
    //   console.log("Unique Barcode");
    //   alert("Unique Barcode");
    //   return true;
    // }

    arg.then(result => {
      console.log(result.val());
    })
  }

  barcodechange(barcodedata) {
    this.barcodeData = ['123'];
    // console.log(this.barcodeData);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

}



