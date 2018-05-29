import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { VenueDetailPage } from '../venue-detail/venue-detail';
import { ApiProvider } from '../../providers/api/api';

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

  businessId: any;
  venueList: any;
  lists = ["Venue 1", "Venue 2", "Venue 3"];
  logo = "https://www.freelogodesign.org/img/logo-ex-7.png";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private api: ApiProvider,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController) {
    this.businessId = navParams.get('businessId');
    this.getVenueFromId(this.businessId);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuePage');
  }

  //add venue
  addVenue(){
    //code to add venue to the list
  }

  //view venue details
  venueDetails(businessId, venueId){

    let addEventModal = this.modalCtrl.create(VenueDetailPage, {
      venueId: venueId,
      businessId: businessId
    });
    addEventModal.present();


  }

  //get venue from business id
  getVenueFromId(id){
    this.api.getVenue(id).subscribe((result => {
      this.venueList = JSON.parse(JSON.stringify(result)).venues;
      console.log(this.venueList);
    }));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
