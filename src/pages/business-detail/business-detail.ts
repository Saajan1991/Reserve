import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { VenuePage } from '../venue/venue';
import { ApiProvider } from '../../providers/api/api';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private api: ApiProvider) {
    //get data from nav params
    this.businessId = navParams.get('businessId');
    this.api.getBusinessById(this.businessId).subscribe((result => {
      this.businessDetail = JSON.parse(JSON.stringify(result));
      console.log(this.businessDetail.business);
      this.logo = this.businessDetail.business.logo;
      this.businessName = this.businessDetail.business.name;
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
    let addVenueModal = this.modalCtrl.create(VenuePage, {
      businessId: this.businessId,
      logo: this.logo
    });
    addVenueModal.present();
  }
}
