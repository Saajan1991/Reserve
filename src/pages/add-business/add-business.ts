import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { BusinessPage } from '../business/business';

@IonicPage()
@Component({
  selector: 'page-add-business',
  templateUrl: 'add-business.html',
})
export class AddBusinessPage {


  BusinessData;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private api: ApiProvider) {
    this.BusinessData = formBuilder.group({
      businessName: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBusinessPage');
  }

  //uploading logo
  uploadLogo() {
    console.log("Update logo");
  }


  //submit for with data
  submitForm() {
    let BusinessData = this.BusinessData.value;
    let data = {
      name: BusinessData.businessName,
      user_id: 1
    };
    this.storeBusinessData(data);
  }


  //store business data 
  storeBusinessData(data) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.storeBusiness(data).subscribe((result => {
      let response = result;
      let jsonResponse = JSON.parse(JSON.stringify(result));
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.push(BusinessPage);
      }, 1000);
    }));
  }

  //dismiss the modal
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
