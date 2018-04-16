import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  private currentNumberOfAdults = 0;
  private currentNumberOfKids = 0;

  constructor(public navCtrl: NavController) {

  }

  //increase number of adults
  private incrementAdult() {
    console.log(this.currentNumberOfAdults);
    this.currentNumberOfAdults++;
  }

  // decrese number of adults
  private decrementAdult() {
    if (this.currentNumberOfAdults > 0) {
      this.currentNumberOfAdults--;
    }
  }

  // increase number of kids
  private incrementKid() {
    this.currentNumberOfKids++;
    console.log(this.currentNumberOfKids);
  }

  // decrease number of kids
  private decrementKid() {
    if (this.currentNumberOfKids > 0) {
      this.currentNumberOfKids--;
    }
  }

  public nextPage() {
    if (this.currentNumberOfAdults < 1) {
      alert("There should be at least one Adult");
    }
  }
}
