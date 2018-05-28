import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-business',
  templateUrl: 'add-business.html',
})
export class AddBusinessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBusinessPage');
  }


  //uploading logo
  uploadLogo(){
    console.log("Update logo");
  }

  // list venue button
  listVenues(){
    console.log("Venue list");
  }

  //setting button
  settings(){

  }
}
