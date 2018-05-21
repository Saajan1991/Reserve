import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { TestPage } from '../test/test';
import { FaceDetailPage } from '../face-detail/face-detail';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  slidesPerView = 1;
  items: any;
  faces: any;
  // faces: { response: {} };
  a;

  i = 0;

  faceData;
  faceStorageArray = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public vision: GoogleCloudVisionServiceProvider, formBuilder: FormBuilder) {

    //creating form
    this.faceData = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      barcode: ['']
    });

    //facedetection
    this.vision.getFaces("people").subscribe((result) => {
      this.items = JSON.parse(JSON.stringify(result));
      this.faces = this.items.responses[0].faceAnnotations;

      let f1 = this.items.responses[0].faceAnnotations;

      //lopping through faces to get vertices
      for (let face of f1) {
        let faceVertices = face.boundingPoly.vertices;
        this.a = faceVertices[0];
        if (this.a.x == undefined) {
          this.a.x = 0;
        }

        //styling image to stripe
        let styles = {
          'object-fit': 'none',
          'object-position': '-' + this.a.x + 'px -' + this.a.y + 'px',
          "width": "200px",
          "height": "200px"
        };
        
        this.faces[this.i].style = styles; //adding style to array
        this.i++;
      }
      console.log(this.items);
    });
  }


  next(ionicButton, id) {
    ionicButton.color = "primary";
    console.log(id);
    // this.navCtrl.push(TestPage);
  }

  submitForm(face, id) {
    let faceData = this.faceData.value;
    if (faceData.firstName != '' && faceData.lastName != '' && faceData.barcode != '') {
      let data = {
        "firstName": faceData.firstName,
        "lastName": faceData.lastName,
        "barcode": faceData.barcode,
        "faceVertices": face.boundingPoly.vertices
      };
      this.faceStorageArray.push(data);
      this.slides.slideNext();
    }

    //check number of face detected and number of forms saved
    if (this.faces.length == this.faceStorageArray.length) {
      var success = this.database();
      if (success == true) {
        alert("Data Save Successful");
      }
    }


  }

  slideChanged(form) {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    console.log("Slide Changed");

  }

  //firebase database to store data
  database() {
    try {
      var storageId = Math.floor(Date.now() / 1000);  //generate number for unique storage
      var ref = firebase.database().ref("event");     //reference to database folder
      const imageRef = ref.child(`images/${storageId}`);
      //save data to firebase 
      imageRef.set(this.faceStorageArray);
      return true;
    }
    catch (e) {
      console.log(e);
    }



  }
} 