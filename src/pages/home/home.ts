import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { TestPage } from '../test/test';
import { FaceDetailPage } from '../face-detail/face-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  slidesPerView = 1;
  items: any;
  faces: any;
  // faces: { response: {} };
  a;

  i = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public vision: GoogleCloudVisionServiceProvider) {

    this.vision.getFaces("people").subscribe((result) => {
      this.items = JSON.parse(JSON.stringify(result));
      this.faces = this.items.responses[0].faceAnnotations;

      let f1 = this.items.responses[0].faceAnnotations;

      for (let face of f1) {
        let faceVertices = face.boundingPoly.vertices;
        this.a = faceVertices[0];
        if (this.a.x == undefined) {
          this.a.x = 0;
        }

        let styles = {
          'object-fit': 'none',
          'object-position': '-' + this.a.x + 'px -' + this.a.y + 'px',
          "width": "200px",
          "height": "200px"
        };
        this.faces[this.i].style = styles;
        this.i++;

      }

      console.log(this.items);
    });
    // navCtrl.push(TestPage);
    //   let html = '<img class="face" src="http://www.allwhitebackground.com/images/3/3809.jpg" style="object-fit: none; object-position: -' + this.a.x + 'px -' + this.a.y + 'px; width: 200px; height: 200px;">'
    //   // let html = '<img class="face" src="' + this.base64Image + '" style="object-fit: none; object-position: -' + 
    //   // a.x + 'px -' + a.y + 'px; width: 200px; height: 200px;"><input type=' + "text" + '></input>' + 
    //   // '<input type=' + "text" + '></input>'
    //   // let textbox = '<input type=' + "text" + '></input>';

    //   //bypass html trust issue
    //   // this.htmlToAdd = this.safeHtml(html);
    //   //adding all images to one for view
    //   // this.htmlToDisplay = this.htmlToDisplay + this.htmlToAdd.changingThisBreaksApplicationSecurity;

    // }
  }


  next() {
    this.navCtrl.push(TestPage);
  }



} 