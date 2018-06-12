import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  eventFinish: any;
  eventStart: any;
  eventName: any;
  eventDetail;
  eventId;
  venueId;
  businessId;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private api: ApiProvider) {
    this.businessId = this.navParams.get('businessId');
    this.venueId = this.navParams.get('venueId');
    this.eventId = this.navParams.get('eventId');

    try{
      this.eventDetail = this.getEventDetails(this.businessId, this.venueId, this.eventId);
    }
    catch(error){
      console.log(error);
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  getEventDetails(businessId, venueId, eventId) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.getEventDetails(businessId, venueId, eventId).subscribe((result => {
      let event = JSON.parse(JSON.stringify(result)).event;
      console.log(result);
      this.eventName = event.name;
      this.eventStart = event.start;
      this.eventFinish = event.finish;
      loading.dismiss();
      // return this.eventDetail;
    }));
  }
}
