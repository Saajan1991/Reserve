import { Component } from '@angular/core';
import { NavController, App, ViewController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App, public viewCtrl: ViewController) {
    // this.viewCtrl = navParams.get('viewCtrl');

  }


  nextPage() {
    // this.viewCtrl.dismiss();
    // this.appCtrl.getRootNav().push(MenuPage);
    // this.navCtrl.pop();
    // this.navCtrl.push(MenuPage);
    // this.appCtrl.getActiveNav().push(MenuPage);

    this.navCtrl.push(TabsPage).then(()=> {
      this.navCtrl.push(MenuPage);
    });
    // this.navCtrl.push(TabsPage);
    // alert("hello");
    // this.navCtrl.push(MenuPage);
    // this.navCtrl.push(MenuPage);
    // this.viewCtrl.dismiss();

    // this.navCtrl.push(MenuPage);
    // this.viewCtrl.dismiss();
  }
}