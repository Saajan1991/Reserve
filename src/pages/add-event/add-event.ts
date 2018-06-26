import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import { EventPage } from '../event/event';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  eventList: any;
  //days
  Sunday: {};
  Monday: {};
  Tuesday: {};
  Wednesday: {};
  Thursday: {};
  Friday: {};
  Saturday: {};

  finish: any;
  start: any;

  eventName: any;
  businessId;
  venueId;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
    private api: ApiProvider,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    public toastCtrl: ToastController) {
    this.businessId = navParams.get('businessId');
    this.venueId = navParams.get('venueId');

    this.Sunday = { 'startTime': '', 'finishTime': '', 'status': false };
    this.Monday = { 'startTime': '', 'finishTime': '', 'status': false };
    this.Tuesday = { 'startTime': '', 'finishTime': '', 'status': false };
    this.Wednesday = { 'startTime': '', 'finishTime': '', 'status': false };
    this.Thursday = { 'startTime': '', 'finishTime': '', 'status': false };
    this.Friday = { 'startTime': '', 'finishTime': '', 'status': false };
    this.Saturday = { 'startTime': '', 'finishTime': '', 'status': false };
  }

  //submit for with data
  submitForm() {
    let eventName = this.eventName;
    let startDate = this.start;
    let finishDate = this.finish;
    let arrayTime = [];
    let days = [];
    days.push(this.Sunday);
    days.push(this.Monday);
    days.push(this.Tuesday);
    days.push(this.Wednesday);
    days.push(this.Thursday);
    days.push(this.Friday);
    days.push(this.Saturday);

    // loop throug days to create array for api
    for (let d of days) {
      if (d.startTime == "" || d.finishTime == "") {
        arrayTime.push("null");
      }
      else {
        arrayTime.push(d.startTime + '-' + d.finishTime);
      }
    }
    console.log(arrayTime);

    //data to send into server
    let data = {
      name: eventName,
      start: startDate,
      finish: finishDate,
      repeat: arrayTime.toString()
    };

    try {
      this.storeEventData(data);
    } catch (error) {
      console.log(error);
    }

  }

  //store event data 
  storeEventData(data) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    // loading.present();
    this.api.storeEvent(this.businessId, this.venueId, data).subscribe((result => {
      let response = result;
      let jsonResponse = JSON.parse(JSON.stringify(result));
      let success = this.database(data);
      // if (success == true) {
      //   let toast = this.toastCtrl.create({
      //     message: "Data Save Successful",
      //     duration: 2000,
      //     position: 'bottom'
      //   });
      //   toast.present();

      // }

      //get event list 
      this.getEvents();

    }));
  }

  //firebase database to store data
  database(data) {
    // alert("database");
    try {
      var storageId = Math.floor(Date.now() / 1000);    //generate number for unique storage
      var ref = firebase.database().ref("events");      //reference to database folder
      const imageRef = ref.child(`${storageId}`);
      imageRef.set(data);                               //save data to firebase 
      // alert("Success");
      return true;
    }
    catch (e) {
      console.log(e);
    }
  }

  //dismiss the modal
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }


  getEvents() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let a = this.api.getEvent(this.businessId, this.venueId);
    a.subscribe((result => {
      this.eventList = JSON.parse(JSON.stringify(result)).events;
      console.log(result);

      //navigate to Event Page
      // this.navCtrl.push(EventPage, {
      //   venueId: this.venueId,
      //   businessId: this.businessId,
      //   eventList: this.eventList
      // });

      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(EventPage, {
        venueId: this.venueId,
        businessId: this.businessId,
        eventList: this.eventList
      }).then(() => {
        this.navCtrl.remove(currentIndex);
        this.navCtrl.remove(currentIndex - 1)
      });

      loading.dismiss();
    }));

  }

}
