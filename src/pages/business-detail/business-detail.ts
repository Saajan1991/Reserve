import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController, App, Modal } from 'ionic-angular';
import { VenuePage } from '../venue/venue';
import { ApiProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';
import { BusinessPage } from '../business/business';

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

  constructor(public navCtrl: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private api: ApiProvider) {

    //get data from nav params
    this.businessId = navParams.get('businessId');
    this.businessName = navParams.get('businessName');
    this.logo = navParams.get('logo');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDetailPage');
  }

  //dismiss modal
  dismiss() {
    this.viewCtrl.dismiss();
  }

  //list venue using business Id from API
  listVenues(businessId) {
    // this.dismiss();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.getVenue(businessId).subscribe((result => {
      this.venueList = JSON.parse(JSON.stringify(result)).venues;
      console.log(this.venueList);

      this.navCtrl.push(VenuePage, {
        businessId: this.businessId,
        logo: this.logo,
        index: "1",
        venueList: this.venueList
      });
     
      loading.dismiss();
    }));
  }
}
