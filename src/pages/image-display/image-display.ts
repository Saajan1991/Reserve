import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  htmlToAdd;
  htmlToDisplay: String = "";
  a: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
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
      // alert("Total Face Detected: " + this.numberOfFaces);
      this.faces = this.items.responses[0].faceAnnotations;
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

  next(){
    // alert("button clicked");
    //send data to imageDisplayPage
    this.navCtrl.push(FaceDetailPage, {
      image: this.base64Image,
      faces: this.items
    });
  }

}