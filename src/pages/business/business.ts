import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AddBusinessPage } from '../add-business/add-business';
import { BusinessDetailPage } from '../business-detail/business-detail';
import { ApiProvider } from '../../providers/api/api';

// @IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {

  businessName: any;
  businessDetail: any;
  businessList: any;
  defaultLogo = "https://www.freelogodesign.org/img/logo-ex-7.png";
  logo;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams, private modalCtrl: ModalController, private api: ApiProvider) {
    this.listBusiness();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
  }


  addBusiness() {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loading.present();
    setTimeout(() => {
      // loading.dismiss();
      let addEventModal = this.modalCtrl.create(AddBusinessPage);
      addEventModal.present();
    }, 1000);

  }

  businessDetails(id) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.api.getBusinessById(id).subscribe((result => {
      this.businessDetail = JSON.parse(JSON.stringify(result));
      console.log(this.businessDetail.business);

      this.logo = this.businessDetail.business.logo ? this.businessDetail.business.logo : this.defaultLogo;
      this.businessName = this.businessDetail.business.name;

      let addEventModal = this.modalCtrl.create(BusinessDetailPage, {
        businessId: id,
        businessName: this.businessName,
        logo: this.logo
      });
      addEventModal.present();
      loading.dismiss();
    }));

  }


  //call api to get list of businesses
  listBusiness() {
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();  //start loading

    this.api.getBusiness().subscribe((result) => {
      this.businessList = JSON.parse(JSON.stringify(result)).businesses;
      console.log(this.businessList);
      loading.dismiss();
    });

    let a = this.api.getBusiness();
    a.subscribe((result => {
      this.businessList = JSON.parse(JSON.stringify(result)).businesses;
      console.log(this.businessList);
      
      loading.dismiss();  //loading dismiss
      // alert(this.businessList);
    }));
  }
}
