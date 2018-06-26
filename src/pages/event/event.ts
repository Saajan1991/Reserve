import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AddEventPage } from '../add-event/add-event';
import { ApiProvider } from '../../providers/api/api';
import { EventDetailPage } from '../event-detail/event-detail';

@IonicPage({
  name: 'page-event',
  segment: 'event-page'
})
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})

export class EventPage {

  eventFinish: any;
  eventStart: any;
  eventName: any;
  eventList;
  businessId;
  venueId;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private api: ApiProvider) {

    this.businessId = navParams.get('businessId');
    this.venueId = navParams.get('venueId');
    this.eventList = navParams.get('eventList');

    // this.getEvents(this.businessId, this.venueId);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  //function to add open add event modal
  addEvent() {
    this.navCtrl.push(AddEventPage, {
      businessId: this.businessId,
      venueId: this.venueId,
    })
    // let addEventModal = this.modalCtrl.create(AddEventPage, {
    //   businessId: this.businessId,
    //   venueId: this.venueId,
    // });
    // addEventModal.present();
  }


  // getEvents(businessId, venueId) {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loading.present();
  //   let a = this.api.getEvent(businessId, venueId);
  //   a.subscribe((result => {
  //     this.eventList = JSON.parse(JSON.stringify(result)).events;
  //     console.log(result);
  //     loading.dismiss();
  //     return this.eventList;
  //   }));
  // }

  //get event details using event Id
  eventDetails(eventId) {

    //loading
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    //api to get EVENT DETAILS
    this.api.getEventDetails(this.businessId, this.venueId, eventId).subscribe((result => {
      let event = JSON.parse(JSON.stringify(result)).event;
      console.log(result);
      this.eventName = event.name;
      this.eventStart = event.start;
      this.eventFinish = event.finish;

      this.navCtrl.push(EventDetailPage, {
        businessId: this.businessId,
        venueId: this.venueId,
        eventId: eventId,
        eventName: this.eventName,
        eventStart: this.eventStart,
        eventFinish: this.eventFinish
      });
      // let eventDetail = this.modalCtrl.create(EventDetailPage, {
      //   businessId: this.businessId,
      //   venueId: this.venueId,
      //   eventId: eventId,
      //   eventName: this.eventName,
      //   eventStart: this.eventStart,
      //   eventFinish: this.eventFinish
      // });
      // eventDetail.present();

      loading.dismiss();
      // return this.eventDetail;
    }));

  }

  //function to go back to venue
  goBack() {
    this.navCtrl.pop();
  }
}