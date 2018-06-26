import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CheckInOutPage } from '../check-in-out/check-in-out';

import { MenuController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CheckInOutPage;
  tab3Root = MenuPage;

  index;

  constructor(public menuCtrl: MenuController, public navParams: NavParams) {
    this.index = navParams.data.index || 0;
    this.tab1Root = navParams.data.rootPage || HomePage;
  }
  
  openSideMenu() {
    this.menuCtrl.toggle();
  }
}
