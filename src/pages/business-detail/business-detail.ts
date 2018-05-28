import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { VenuePage } from '../venue/venue';

@IonicPage()
@Component({
  selector: 'page-business-detail',
  templateUrl: 'business-detail.html',
})
export class BusinessDetailPage {

  logo;
  businessName;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl : ViewController, private modalCtrl: ModalController) {
    //get data from nav params
    this.logo = navParams.get('logo');
    this.businessName = navParams.get('businessName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDetailPage');
  }

  //dismiss modal
  dismiss(){
    this.viewCtrl.dismiss();
  }

  listVenues(){
    console.log("list venues");
    let addVenueModal = this.modalCtrl.create(VenuePage, {
      businessName: this.businessName,
      logo: this.logo
    });
    addVenueModal.present();

    }
}
