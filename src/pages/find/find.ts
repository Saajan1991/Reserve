import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-find',
  templateUrl: 'find.html',
})
export class FindPage {

  age: any;
  gender: any;
  name: any;
  barcodeData;
  options: BarcodeScannerOptions;
  private barcodeResults: {
    text: string,
    cancelled: boolean,
    format: string
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcode: BarcodeScanner) {
    // let barcode = this.navParams.get('barcodeResult');
  }

  async scanBarcode() {
    this.options = { prompt: 'Scan the barcode' };
    this.barcodeResults = await this.barcode.scan(this.options);
    let barcodeText = this.barcodeResults.text;

    document.querySelector('#barcode').innerHTML = barcodeText;

    this.checkBarcode(barcodeText).then((result) => {

      if (result != undefined) {
        this.barcodeData = result;
        this.name = this.barcodeData.firstName;
        this.gender = this.barcodeData.gender;
        this.age = this.barcodeData.age;
        this.barcode = this.barcodeData.barcode;
      } else {
        alert("No barcode found");
        this.navCtrl.setRoot(FindPage);
      }
    });
  }


  //function to check barcode from firebase database
  async checkBarcode(barcode) {
    let abcData = {};
    let barcodeCheckList = [];

    //reference to database folder
    var ref = firebase.database().ref("visits/event/images");

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
        resolve(barcodeData);
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPage');
  }

}
