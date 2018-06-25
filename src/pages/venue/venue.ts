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

  eventId: any;
  area: any;
  capacity: any;
  venueName: any;
  venueDetail: any;
  index: any;
  businessId: any;
  venueList: any;
  logo = "https://www.freelogodesign.org/img/logo-ex-7.png";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private api: ApiProvider,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController) {
    this.businessId = navParams.get('businessId');
    this.index = navParams.get('index');
    this.venueList = navParams.get('venueList');

    // this.getVenueFromId(this.businessId);
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

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let a = this.api.getVenueDetails(businessId, venueId);
    a.subscribe((result => {

      this.venueDetail = JSON.parse(JSON.stringify(result)).venue;
      this.venueName = this.venueDetail.name;
      this.capacity = this.venueDetail.ppl_capacity;
      this.area = this.venueDetail.sqm_capacity;
      this.eventId = this.venueDetail.id;
      this.businessId - this.venueDetail.businessId;
      
      console.log(this.venueDetail.name);


      //modal for venue detail
      let addEventModal = this.modalCtrl.create(VenueDetailPage, {
        venueId: venueId,
        businessId: businessId,
        venueDetail: this.venueDetail,
        venueName: this.venueName,
        capacity: this.capacity,
        area: this.area,
        eventId: this.venueDetail.id
      });
      addEventModal.present();

      loading.dismiss();
    }));
    
    


  }

  //get venue from business id
  // getVenueFromId(id){
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loading.present();
  //   this.api.getVenue(id).subscribe((result => {
  //     this.venueList = JSON.parse(JSON.stringify(result)).venues;
  //     console.log(this.venueList);
  //     loading.dismiss();
  //   }));
  // }

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
