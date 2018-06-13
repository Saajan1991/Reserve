import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;

  //inititalize loginCredentials empty
  loginCredentials = {
    email: 'test@mailinator.com',
    password: '123456'
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private api: ApiProvider) {
  }

  //login function
  login() {
    let loginData = this.loginCredentials;

    //start LOADING display
    this.showLoading();

    //boolean value from api to check LOGIN success
    let loginCheck = this.api.login(loginData);
    //loading controller to display spinner or wait message
    // check loginCheck Status
    loginCheck.then(result => {
      // if(result == true){
        setTimeout(() => {
          this.loading.dismiss();
          this.navCtrl.push(TabsPage);
        }, 1000);
      // }
      // else {
      //   //back to login page
      //   this.loading.dismiss();
      //   this.navCtrl.setRoot(LoginPage);
      // }
    })
    
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //Create loading 
  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}
