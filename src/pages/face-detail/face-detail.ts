import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-face-detail',
  templateUrl: 'face-detail.html',
})
export class FaceDetailPage {

  faces;

  slidesPerView = 1;
  a;
  i= 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.faces = navParams.get('faces');
    let imageData = navParams.get('image');

    alert("Faces");

    // let f1 = faces.responses[0].faceAnnotations;

    //   for (let face of f1) {
    //     let faceVertices = face.boundingPoly.vertices;
    //     this.a = faceVertices[0];
    //     if (this.a.x == undefined) {
    //       this.a.x = 0;
    //     }

    //     let styles = {
    //       'object-fit': 'none',
    //       'object-position': '-' + this.a.x + 'px -' + this.a.y + 'px',
    //       "width": "200px",
    //       "height": "200px"
    //     };
    //     faces[this.i].style = styles;
    //     this.i++;
    //   }
    //   alert(faces[0].style);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaceDetailPage');
  }

}
