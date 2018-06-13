import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let barcode = this.navParams.get('barcodeResult');
  }

  // checkBarcode(barcode) {
  //   let barcodeCheckList = [];
  //   var ref = firebase.database().ref("visits/event/images");     //reference to database folder
  //   ref.on('value', function (snapshot) {
  //     console.log(snapshot.val());
  //     let data = snapshot.val();

  //     let tempArray = [];
  //     for (var key in data) {
  //       tempArray.push(data[key]);
  //     }
  //     console.log(tempArray);

  //     tempArray.forEach(result => {
  //       for (var a in result) {
  //         console.log(result[a].barcode);
  //         let barcode = result[a].barcode;

  //         barcodeCheckList.push(barcode);
  //       }
  //     });
  //     // let list = barcodeCheckList;
  //   });

  //   let list = barcodeCheckList;
  //   var test = list.indexOf(barcode);
  //   if (test > -1) {
  //     console.log("Barcode is already used");
  //     alert("Barcode is already used");
  //     return false;
  //   } else {
  //     console.log("Unique Barcode");
  //     alert("Unique Barcode");
  //     return true;
  //   }
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

}



