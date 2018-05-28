import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { VenueDetailPage } from '../venue-detail/venue-detail';

/**
 * Generated class for the VenuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venue',
  templateUrl: 'venue.html',
})
export class VenuePage {

  lists = ["Venue 1", "Venue 2", "Venue 3"];
  logo = "https://www.freelogodesign.org/img/logo-ex-7.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    let businessName = navParams.get('businessName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuePage');
  }

  //add venue
  addVenue(){
    //code to add venue to the list
  }

  //view venue details
  venueDetails(detail){
    let venueName = detail;

    let addEventModal = this.modalCtrl.create(VenueDetailPage, {
      venueName: venueName,
      logo: this.logo
    });
    addEventModal.present();


  }

}
