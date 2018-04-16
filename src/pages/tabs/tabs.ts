import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CheckinPage } from '../checkin/checkin';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CheckinPage;
  tab2Root = HomePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
