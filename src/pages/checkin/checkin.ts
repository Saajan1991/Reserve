import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';


@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {

  private currentNumberOfAdults = 0;
  private currentNumberOfKids = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  //increase number of adults
  private incrementAdult (){
    console.log(this.currentNumberOfAdults);
    this.currentNumberOfAdults++;
  }

  // decrese number of adults
  private decrementAdult (){
    if(this.currentNumberOfAdults > 0){
      this.currentNumberOfAdults--;
    }
  }

  // increase number of kids
  private incrementKid (){
    this.currentNumberOfKids++;
    console.log(this.currentNumberOfKids);
  }

  // decrease number of kids
  private decrementKid (){
    if(this.currentNumberOfKids > 0){
      this.currentNumberOfKids--;
    }
  }

  public nextPage(){
    if(this.currentNumberOfAdults < 1){
      alert("There should be at least one Adult");
    }
    else {
      this.navCtrl.push(DetailPage, {adults : this.currentNumberOfAdults, kids : this.currentNumberOfKids });
    }
  }

}
