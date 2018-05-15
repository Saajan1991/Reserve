import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
//import Dom sanitizer for html input using innerHtml
import { DomSanitizer } from '@angular/platform-browser';
import { FaceDetailPage } from '../face-detail/face-detail';

@Component({
  selector: 'page-image-display',
  templateUrl: 'image-display.html',
})
export class ImageDisplayPage {

  numberOfFaces: any;
  items: any;
  public base64Image: string;

  TotalNumberOfAdults = 0;
  TotalNumberOfKids = 0;
  adults = [];
  kids = [];
  faces: { response: {} };

  slidesPerView = 3;

  htmlToAdd;
  htmlToDisplay: String = "";
  a: any;


  options: BarcodeScannerOptions;
  private results: {
    text: string,
    cancelled: boolean,
    format: string
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    protected _sanitizer: DomSanitizer) {
    this.base64Image = navParams.get('image');
    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');
    this.adult(this.TotalNumberOfAdults);
    this.kid(this.TotalNumberOfKids);
    this.items = navParams.get('faces');

    
    if (this.items != undefined) {
      //number of faces detected by api
      this.numberOfFaces = this.items.responses[0].faceAnnotations.length;
      alert("Total Face Detected: " + this.numberOfFaces);
      // this.faces = this.items.responses[0].faceAnnotations;

      // let f1 = this.items.responses[0].faceAnnotations;

      // // var a;

      // for (let face of f1) {
      //   let faceVertices = face.boundingPoly.vertices;
      //   alert("Vertices" + faceVertices[0]);
      //   this.a = faceVertices[0];
      //   if (this.a.x == undefined) {
      //     this.a.x = 0;
      //   }

      //   let html = '<img class="person1" src="http://www.allwhitebackground.com/images/3/3809.jpg" style="object-fit: none; object-position: -' + this.a.x + 'px -' + this.a.y + 'px; width: 200px; height: 200px;">'
      //   // let html = '<img class="face" src="' + this.base64Image + '" style="object-fit: none; object-position: -' + 
      //   // a.x + 'px -' + a.y + 'px; width: 200px; height: 200px;"><input type=' + "text" + '></input>' + 
      //   // '<input type=' + "text" + '></input>'
      //   // let textbox = '<input type=' + "text" + '></input>';
      //   //bypass html trust issue
      //   this.htmlToAdd = this.safeHtml(html);
      //   //adding all images to one for view
      //   this.htmlToDisplay = this.htmlToDisplay + this.htmlToAdd.changingThisBreaksApplicationSecurity;
      // }
    }
    else {
      alert("Face Not Detected");
    }

  }

  //function for bypass Html Trust
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
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

  async scanBarcodeKid(id) {

  }

  next(){
    //send data to imageDisplayPage
    this.navCtrl.push(FaceDetailPage, {
      image: this.base64Image,
      faces: this.items
    });
  }

}