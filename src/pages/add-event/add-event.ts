// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// import { FormBuilder, Validators } from '@angular/forms';
// import firebase from 'firebase';
// import { EventPage } from '../event/event';

// @IonicPage()
// @Component({
//   selector: 'page-add-event',
//   templateUrl: 'add-event.html',
// })
// export class AddEventPage {

//   eventData: any;

//   constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder, public toastCtrl: ToastController) {
//     console.log('User Id', navParams.get('userId'));
//     //creating form
//     this.eventData = formBuilder.group({
//       eventName: ['', Validators.required],
//       start: [''],
//       finish: ['']
//     });
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad AddEventPage');
//   }

//   //form submit
//   submit(){
//     let eventData = this.eventData.value;
//     let data = {
//       "eventName": eventData.eventName,
//       "start": eventData.start,
//       "finish": eventData.finish
//     };
//     console.log(data);

//     let success = this.database(data);

//     if (success == true) {
//       let toast = this.toastCtrl.create({
//         message: "Data Save Successful",
//         duration: 2000,
//         position: 'bottom'
//       });
//       toast.present();
//       // alert("Data Save Successful");
//       this.navCtrl.push(EventPage);
//     }

//     //create event 
//   }


//   //firebase database to store data
//   database(data) {
//     // alert("database");
//     try {
//       var storageId = Math.floor(Date.now() / 1000);  //generate number for unique storage
//       var ref = firebase.database().ref("events");     //reference to database folder
//       const imageRef = ref.child(`${storageId}`);
//       //save data to firebase 
//       imageRef.set(data);
//       // alert("Success");
//       return true;
//     }
//     catch (e) {
//       console.log(e);
//     }
//   }

// }


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
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

  eventData: any;
  businessId;
  venueId;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
    private api: ApiProvider,
    private viewCtrl: ViewController,
    public toastCtrl: ToastController) {
    this.businessId = navParams.get('businessId');
    this.venueId = navParams.get('venueId');

    //creating form
    this.eventData = formBuilder.group({
      eventName: ['', Validators.required],
      start: [''],
      finish: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }


  //submit for with data
  submitForm() {
    let eventData = this.eventData.value;
    let data = {
      name: eventData.eventName,
      start: eventData.start,
      finish: eventData.finish
    };
    this.storeEventData(data);
  }


  //store event data 
  storeEventData(data) {
    this.api.storeEvent(this.businessId, this.venueId, data).subscribe((result => {
      let response = result;
      let jsonResponse = JSON.parse(JSON.stringify(result));
      // this.dismiss();
      this.navCtrl.push(EventPage, {
        businessId: this.businessId,
        venueId: this.venueId
      });
    }));
  }

  //dismiss the modal
  dismiss() {
    this.viewCtrl.dismiss();
  }






}
