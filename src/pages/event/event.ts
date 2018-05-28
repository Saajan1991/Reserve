import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AddEventPage } from '../add-event/add-event';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  // events;
  list = ["Event1", "Event2", "Event3"];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.getEvents(function (err, result) {
      console.log(result);
      let events = result;
    });


    // ref.on("value", function (snapshot) {
    //   var events = snapshot.val();
    //   this.events.push(events);
    //   console.log(events);
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });
    // console.log("hello");
  }

  //get event with callback
  getEvents(callback) {
    var ref = firebase.database().ref("events");
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once('value', function (snapshot) {
      let events = snapshot.val();
      callback(null, events);
    }, function (error) {
      callback(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  back() {
    this.navCtrl.push(TabsPage);
  }

  addEvent() {
    let addEventModal = this.modalCtrl.create(AddEventPage);
    addEventModal.present();
  }

  database() {
    try {
      var ref = firebase.database().ref("events");
      // Attach an asynchronous callback to read the data at our posts reference
      ref.on("value", function (snapshot) {
        this.events = snapshot.val();
        console.log(this.events);
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
    catch (e) {
      console.log(e);
    }

  }

}