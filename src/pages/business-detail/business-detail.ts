import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController, App, Modal } from 'ionic-angular';
import { VenuePage } from '../venue/venue';
import { ApiProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-business-detail',
  templateUrl: 'business-detail.html',
})
export class BusinessDetailPage {

  venueList: any;
  businessName: any;
  logo;
  businessId;
  businessDetail;
  defaultLogo = "https://www.freelogodesign.org/img/logo-ex-7.png";

  constructor(public navCtrl: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private api: ApiProvider) {
    //get data from nav params
    this.businessId = navParams.get('businessId');
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loading.present();
    this.api.getBusinessById(this.businessId).subscribe((result => {
      this.businessDetail = JSON.parse(JSON.stringify(result));
      console.log(this.businessDetail.business);

      this.logo = this.businessDetail.business.logo ? this.businessDetail.business.logo : this.defaultLogo;
      this.businessName = this.businessDetail.business.name;
      // loading.dismiss();
    }));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDetailPage');
  }

  //dismiss modal
  dismiss() {
    this.viewCtrl.dismiss();
  }

  listVenues(id) {

    this.dismiss();

    // this.appCtrl.getRootNav().push(VenuePage, {
    //   businessId: this.businessId,
    //   logo: this.logo,
    //   index: "1"
    // });;

    this.navCtrl.push(TabsPage).then(res => {
      this.navCtrl.push(VenuePage, {
        businessId: this.businessId,
        logo: this.logo,
        index: "1"
      })
    });


    // this.navCtrl.push(VenuePage, {
    //   businessId: this.businessId,
    //   logo: this.logo,
    //   index: "1"
    // });

    // let addVenueModal = this.modalCtrl.create(VenuePage, {
    //   businessId: this.businessId,
    //   logo: this.logo
    // });
    // addVenueModal.present();
  }
}
