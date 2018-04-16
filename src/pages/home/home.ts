import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private currentNumberOfAdults = 0;
  private currentNumberOfKids = 0;

  constructor(public navCtrl: NavController) {

  }

  
  //increase number of adults
  private incrementAdult (){
    console.log(this.currentNumberOfAdults);
    this.currentNumberOfAdults++;
  }

  // decrese number of adults
  private decrementAdult (){
    this.currentNumberOfAdults--;
  }

  // increase number of kids
  private incrementKid (){
    this.currentNumberOfKids++;
    console.log(this.currentNumberOfKids);
  }

  // decrease number of kids
  private decrementKid (){
    this.currentNumberOfKids--;
  }
}
