import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FormBuilder, Validators } from '@angular/forms';
import { VenuePage } from '../venue/venue';

@IonicPage()
@Component({
  selector: 'page-add-venue',
  templateUrl: 'add-venue.html',
})
export class AddVenuePage {

  logo = "https://www.freelogodesign.org/img/logo-ex-7.png";
  venueList: any;
  venueData: any;
  businessId;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private api: ApiProvider) {
    this.businessId = navParams.get('businessId');

    this.venueData = formBuilder.group({
      name: ['', Validators.required],
      area: [''],
      capacity: ['']
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddVenuePage');
  }

  submitForm() {
    let venueData = this.venueData.value;
    let data = {
      name: venueData.name,
      sqm_capacity: venueData.area,
      ppl_capacity: venueData.capacity
    };
    console.log(data);
    this.storeVenue(data);
  }

  storeVenue(data) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.storeVenue(this.businessId, data).subscribe((result => {
      let jsonResponse = JSON.parse(JSON.stringify(result));
      console.log(jsonResponse);
      this.dismiss();
      setTimeout(() => {
        loading.dismiss();
        this.listVenues(this.businessId);
      }, 1000);

    }));
  }

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

      // this.navCtrl.push(TabsPage).then(res => {
      this.navCtrl.push(VenuePage, {
        businessId: this.businessId,
        logo: this.logo,
        index: "1",
        venueList: this.venueList
        // })
      });

      loading.dismiss();
    }));
  }

}
