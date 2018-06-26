import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, App } from 'ionic-angular';
import { BusinessPage } from '../business/business';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  pages: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    public app: App,
    private loadingCtrl: LoadingController) {
    this.pages = [
      { title: 'Business', pageName: BusinessPage, index: 0, icon: 'business', hide: false },
      { title: 'Settings', pageName: BusinessPage, index: 1, icon: 'settings', hide: false },
      { title: 'Log Out', pageName: LoginPage, index: 2, icon: 'log-out', hide: false }
      // { title: 'Special', pageName: 'SpecialPage', icon: 'shuffle' }
    ];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


  openPage(page) {
    if (page.pageName.name == "LoginPage") {
      this.app.getRootNav().setRoot(page.pageName);
      localStorage.removeItem('token');
    } else {
      this.navCtrl.push(page.pageName);
      let params = {};
      if (page.index) {
        params = { index: page.index };
      }
      // this.navCtrl.setRoot(page.pageName, params)
    }

    // this.navCtrl.push(BusinessPage);
    // let params = {};
    // if (this.nav.getActiveChildNav() && page.index != undefined) {
    //   this.nav.getActiveChildNav().select(page.index);
    // } else {
    //   // Tabs are not active, so reset the root page 
    //   // In this case: moving to or from SpecialPage
    //   this.nav.setRoot(page.pageName, params);
    // }
    // this.navCtrl.push(page.component, { index: page.index });
  }

  openSideMenu() {
    this.menuCtrl.open();
  }

  menuOpened() {
    // alert("open");
  }

  menuClosed() {
    // alert("close");
    // this.navCtrl.setRoot(HomePage);

    // let a = this.navCtrl[0].root.name;
    // if(a == "MenuPage"){
    //   this.
    // }
    // console.log(a);



    // if(true){
    //   this.navCtrl

    // }
  }


}
