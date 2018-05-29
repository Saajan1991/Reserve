import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddBusinessPage } from '../add-business/add-business';
import { BusinessDetailPage } from '../business-detail/business-detail';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {

  businessList: any;
  lists = ["Business 1", "Business 2", "Business 3"];
  logo = "https://www.freelogodesign.org/img/logo-ex-7.png";
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private api: ApiProvider) {
    this.listBusiness();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
  }


  addBusiness() {
    let addEventModal = this.modalCtrl.create(AddBusinessPage);
    addEventModal.present();
  }

  businessDetails(id) {
    let addEventModal = this.modalCtrl.create(BusinessDetailPage, {
      businessId: id
    });
    addEventModal.present();
  }


  //call api to get list of businesses
  listBusiness(){
    let a = this.api.getBusiness();
    a.subscribe((result => {
      this.businessList = JSON.parse(JSON.stringify(result)).businesses;
      let list = result;
      console.log(this.businessList);
      alert(this.businessList);
    }));
  }
}
