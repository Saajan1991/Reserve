import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CheckinPage } from '../checkin/checkin';
import { CheckInOutPage } from '../check-in-out/check-in-out';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CheckInOutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
