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
    this.eventName = this.navParams.get('eventName');
    this.eventStart = this.navParams.get('eventStart');
    this.eventFinish = this.navParams.get('eventFinish');

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
