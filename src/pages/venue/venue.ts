import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';
import { VenueDetailPage } from '../venue-detail/venue-detail';
import { ApiProvider } from '../../providers/api/api';
import { AddVenuePage } from '../add-venue/add-venue';

@IonicPage()
@Component({
  selector: 'page-venue',
  templateUrl: 'venue.html',
})
export class VenuePage {

  index: any;
  businessId: any;
  venueList: any;
  lists = ["Venue 1", "Venue 2", "Venue 3"];
  logo = "https://www.freelogodesign.org/img/logo-ex-7.png";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private api: ApiProvider,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController) {
    this.businessId = navParams.get('businessId');
    this.index = navParams.get('index');
    this.getVenueFromId(this.businessId);
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuePage');
  }

  //add venue
  addVenue(){
    //code to add venue to the list
    let addEventModal = this.modalCtrl.create(AddVenuePage, {
      businessId: this.businessId
    });
    addEventModal.present();
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.getVenue(id).subscribe((result => {
      this.venueList = JSON.parse(JSON.stringify(result)).venues;
      console.log(this.venueList);
      loading.dismiss();
    }));
  }

  //call api to store venue
  storeVenue(){
    let data = {
      name: "Venue Forest",
      sqm_capacity: "1234.56",
      ppl_capacity: "500"
    };

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.storeVenue(this.businessId, data).subscribe((result => {
     let jsonResponse = JSON.parse(JSON.stringify(result));
     console.log(jsonResponse);
     loading.dismiss();
    }));
  }

}
