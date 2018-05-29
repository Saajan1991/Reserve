import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-venue-detail',
  templateUrl: 'venue-detail.html',
})
export class VenueDetailPage {

  area: any;
  capacity: any;
  venueName: any;
  venueDetail;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private api: ApiProvider) {
    let venueId = this.navParams.get('venueId');
    let businessId = this.navParams.get("businessId");

    try {
      let a = this.getVenueDetail(businessId, venueId);
      console.log(a);
    } catch (error) {

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenueDetailPage');
  }

  getVenueDetail(businessId, venueId) {
    let a = this.api.getVenueDetails(businessId, venueId);
    a.subscribe((result => {
      this.venueDetail = JSON.parse(JSON.stringify(result)).venue;
      this.venueName = this.venueDetail.name;
      this.capacity = this.venueDetail.ppl_capacity;
      this.area = this.venueDetail.sqm_capacity;
      console.log(this.venueDetail.name);
      return this.venueDetail;
    }));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
