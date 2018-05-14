import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  slides = {
    "vertices": [
      {
        "x": 932,
        "y": 313
      },
      {
        "x": 1028,
        "y": 313
      },
      {
        "x": 1028,
        "y": 425
      },
      {
        "x": 932,
        "y": 425
      }
    ]
  };
  slidesPerView = 5;

  


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.slides.vertices);
  }


} 