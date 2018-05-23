import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckinPage } from '../checkin/checkin';

/**
 * Generated class for the CheckInOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-check-in-out',
  templateUrl: 'check-in-out.html',
})
export class CheckInOutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  //got to check in page
  checkIn() {
    this.navCtrl.push(CheckinPage);
  }

  //go to check out page
  checkOut() {
    // this.navCtrl.push(CheckOutPage);
  }

  //find people
  find(){
    //this.navCtrl.push(ProfilePage);
  }
}
