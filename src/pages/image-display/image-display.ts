import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
//import Dom sanitizer for html input using innerHtml
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-image-display',
  templateUrl: 'image-display.html',
})
export class ImageDisplayPage {

  items: any;
  public base64Image: string;

  TotalNumberOfAdults = 0;
  TotalNumberOfKids = 0;
  adults = [];
  kids = [];
  faces: { response: {} };

  htmlToAdd;
  htmlToDisplay: String = "";


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
    // this.base64Image = "http://blog.inf.ed.ac.uk/atate/files/2015/11/img-avatars-new-300x207.png";
    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');
    this.adult(this.TotalNumberOfAdults);
    this.kid(this.TotalNumberOfKids);
    this.items = navParams.get('faces');
    alert("faces" + this.items)

    if (this.items != undefined) {
      alert("Total Face Detected: " + this.items.responses[0].faceAnnotations.length);
      this.faces = this.items.responses[0].faceAnnotations;

      alert("Face" + this.faces)

      let f1 = this.items.responses[0].faceAnnotations;

      var a;

      for (let face of f1) {
        let faceVertices = face.boundingPoly.vertices;
        alert("Vertices" + faceVertices[0]);
        a = faceVertices[0];
        if (a.x == undefined) {
          a.x = 0;
        }
        let html = '<img class="person1" src="http://www.allwhitebackground.com/images/3/3809.jpg" style="object-fit: none; object-position: -' + a.x + 'px -' + a.y + 'px; width: 200px; height: 200px;">'
        //bypass html trust issue
        this.htmlToAdd = this.safeHtml(html);
        alert("this.htm" + this.htmlToAdd);
        //adding all images to one for view
        this.htmlToDisplay = this.htmlToDisplay + this.htmlToAdd.changingThisBreaksApplicationSecurity;
        alert("Html to display " + this.htmlToDisplay);
      }

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


}