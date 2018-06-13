import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { SubEventsPage } from '../sub-events/sub-events';

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
    public viewCtrl: ViewController,
    private api: ApiProvider) {
    this.businessId = this.navParams.get('businessId');
    this.venueId = this.navParams.get('venueId');
    this.eventId = this.navParams.get('eventId');

    try {
      this.eventDetail = this.getEventDetails(this.businessId, this.venueId, this.eventId);
    }
    catch (error) {
      console.log(error);
    }
  }

  getEventDetails(businessId, venueId, eventId) {
    //loading
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    //api to get EVENT DETAILS
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

  subEvents() {
    // go to SubEvents Page list with parameters
    this.navCtrl.push(SubEventsPage, {
      'businessId': this.businessId,
      'venueId': this.venueId,
      'eventId': this.eventId
    });
  }

  //dismiss the modal
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

}
