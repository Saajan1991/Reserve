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

    if(loginCheck == true){
      this.navCtrl.push(TabsPage);
    }
    else{
      //
    }
    

    // console.log(loginCheck);

    // if (loginCheck == true) {
    //   this.navCtrl.push(TabsPage);
    // }

  }
}
