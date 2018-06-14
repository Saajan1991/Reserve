import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-sub-events',
  templateUrl: 'sub-events.html',
})
export class SubEventsPage {


  sub_eventList;
  businessId;
  venueId;
  eventId;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider) {

    //get params from event detail page
    this.businessId = navParams.get('businessId');
    this.venueId = navParams.get('venueId');
    this.eventId = navParams.get('eventId');

    this.getSubEvents();
  }

  //get sub events from api
  getSubEvents() {
    let businessId = this.businessId;
    let venueId = this.venueId;
    let eventId = this.eventId;

    let subEvents = this.getSubevents(this.businessId, this.venueId, this.eventId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubEventsPage');
  }

  getSubevents(businessId, venueId, eventId) {
    //call api to get SUB EVENTS
    this.api.getSubEvents(businessId, venueId, eventId)
      .subscribe((result => {
        if(result == []){
          alert("There is no Sub Event for the event Selected");
        }
        this.sub_eventList = JSON.parse(JSON.stringify(result)).events;
        console.log(this.sub_eventList);
      }));
  }

}
