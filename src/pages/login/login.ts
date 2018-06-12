import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loginCheck = this.api.login();
    //loading controller to display spinner or wait message
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
  
    if(loginCheck == true){
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.push(TabsPage);
      }, 1000);
    }
    else{
      //back to login page
      this.navCtrl.push(LoginPage);
    }
  }
}
