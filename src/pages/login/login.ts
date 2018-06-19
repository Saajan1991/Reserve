import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  loginForm: FormGroup;
  loginError: string;

  //inititalize loginCredentials empty
  loginCredentials = {
    email: 'test@mailinator.com',
    password: '123456'
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public fb: FormBuilder,
    private api: ApiProvider) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) { return; }

    let loginCredentials = {
      email: data.email,
      password: data.password
    };

    //start LOADING display
    this.showLoading();

    this.api.login(loginCredentials).then(result => {
      console.log(result);
      let authorization = JSON.parse(JSON.stringify(result));
      if (authorization.statusText == "Unauthorized") {
        
        alert("User is Unauthorized");
        this.navCtrl.setRoot(LoginPage);
      }
      else {
        this.navCtrl.setRoot(TabsPage);
      }
      this.loading.dismiss();
    }, error => {
      this.loginError = error.message;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //Create loading 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}
