import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner'; //import for barcode scanner


@Component({
  selector: 'page-face-detail',
  templateUrl: 'face-detail.html',
})
export class FaceDetailPage {

  faces: { response: {} };  // get faces from google api in this format
  items;

  options: BarcodeScannerOptions;
  //result for barcode scan
  private results: {
    text: string,
    cancelled: boolean,
    format: string
  };

  slidesPerView = 1; //number of slides displayed per page
  a;
  i = 0; //for incrementing value in style
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcode: BarcodeScanner) {
    alert("hello face detail page");
    this.items = navParams.get('faces');
    let imageData = navParams.get('image');

    this.faceVertices();
    alert("function");
  }

  faceVertices() {
    alert("insidefunction");
    let f1 = this.items.responses[0].faceAnnotations;
    alert(f1);
    for (let face of f1) {
      let faceVertices = face.boundingPoly.vertices;
      this.a = faceVertices[0]; //get the first vertices of face
      alert(this.a);
      if (this.a.x == undefined) {
        this.a.x = 0;
      }

      //define style to strip the image
      let styles = {
        'object-fit': 'none',
        'object-position': '-' + this.a.x + 'px -' + this.a.y + 'px',
        "width": "200px",
        "height": "200px"
      };
      //adding style to faces
      this.faces = this.items.responses[0].faceAnnotations;
      alert(this.faces);
      this.faces[this.i].style = styles;
      this.i++;
    }
  }

  //function to scan barcode
  async scanBarcode(id) {
    this.options = { prompt: 'Scan a barcode to see the results' };
    this.results = await this.barcode.scan(this.options);
    // document.querySelector('#adulttext' + id).innerHTML = this.results.text;
  }

}