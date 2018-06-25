import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { EventPage } from '../event/event';


@IonicPage()
@Component({
  selector: 'page-venue-detail',
  templateUrl: 'venue-detail.html',
})
export class VenueDetailPage {

  eventList: any;
  businessId: any;
  venueId: any;
  eventId: any;
  area: any;
  capacity: any;
  venueName: any;
  venueDetail;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private api: ApiProvider) {

    this.venueId = this.navParams.get('venueId');
    this.venueName = this.navParams.get("venueName");
    this.capacity = this.navParams.get("capacity");
    this.area = this.navParams.get("area");
    this.eventId = this.navParams.get("eventId");
    this.businessId = this.navParams.get("businessId");

    // try {
    //   let a = this.getVenueDetail(this.businessId, this.venueId);
    //   console.log(a);
    // } catch (error) {

    // }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenueDetailPage');
  }

  // getVenueDetail(businessId, venueId) {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loading.present();
  //   let a = this.api.getVenueDetails(businessId, venueId);
  //   a.subscribe((result => {
  //     this.venueDetail = JSON.parse(JSON.stringify(result)).venue;
  //     this.venueName = this.venueDetail.name;
  //     this.capacity = this.venueDetail.ppl_capacity;
  //     this.area = this.venueDetail.sqm_capacity;
  //     this.eventId = this.venueDetail.id;
  //     console.log(this.venueDetail.name);
  //     loading.dismiss();
  //     return this.venueDetail;
  //   }));
  // }

  getEvents() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let a = this.api.getEvent(this.businessId, this.venueId);
    a.subscribe((result => {
      this.eventList = JSON.parse(JSON.stringify(result)).events;
      console.log(result);

      this.navCtrl.push(EventPage, {
        venueId: this.venueId,
        businessId: this.businessId,
        eventList: this.eventList
      });

      loading.dismiss();
    }));

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
