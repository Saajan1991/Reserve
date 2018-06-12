import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CheckInOutPage } from '../check-in-out/check-in-out';

import { MenuController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CheckInOutPage;
  tab3Root = MenuPage;

  index;

  constructor(public menuCtrl: MenuController) {
    // this.index = 0;
    // let index = navParams.get('index');
  // if (navParams.data.index) this.index = navParams.data.index;
  }
  
  openSideMenu() {
    this.menuCtrl.toggle();
  }
}
