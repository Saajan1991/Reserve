import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddBusinessPage } from '../add-business/add-business';
import { BusinessDetailPage } from '../business-detail/business-detail';

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {

  lists = ["Business 1", "Business 2", "Business 3"];
  logo = "https://www.freelogodesign.org/img/logo-ex-7.png";
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
  }


  addBusiness() {
    let addEventModal = this.modalCtrl.create(AddBusinessPage);
    addEventModal.present();
  }

  businessDetails(detail) {
    let businessName = detail;
    let addEventModal = this.modalCtrl.create(BusinessDetailPage, {
      businessName: businessName,
      logo: this.logo
    });
    addEventModal.present();
  }
}
