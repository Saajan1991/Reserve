import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html',
})
export class MyApp {

  @ViewChild(Nav) nav: NavController;

  rootPage: any = LoginPage;
  pages;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // this.pages = [
    //   { title: 'Business', component: BusinessPage, index: 0, icon: 'none', hide: false },
    //   { title: 'Setting', component: TabsPage, index: 1, icon: 'setting', hide: false },
    // ];
  }

  // openPage(page) {
  //   this.nav.push(page.component, { index: page.index });
  // }

}
