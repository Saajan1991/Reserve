import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  TotalNumberOfAdults = 0;
  TotalNumberOfKids = 0;
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');

    this.adult(this.TotalNumberOfAdults);
    // this.kid(this.TotalNumberOfKids);

  }
  
  adult(adultNumber){
    this.items = Array(adultNumber).fill(0).map((x,i)=>i);
  }

  // kid(kidNumber){
  //   this.items = Array(kidNumber).fill(0).map((x,i)=>i);
  // }
}



