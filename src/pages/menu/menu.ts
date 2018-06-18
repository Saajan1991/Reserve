import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { BusinessPage } from '../business/business';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  pages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private loadingCtrl: LoadingController) {
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
    this.navCtrl.push(page.pageName);

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

  // openSideMenu() {
  //   this.menuCtrl.open();
  // }

  // menuOpened() {
  //   alert("open");
  // }

  // menuClosed() {
  //   alert("close");
  //   this.navCtrl.setRoot(HomePage);
  // }


}
