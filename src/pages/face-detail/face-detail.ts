import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner'; //import for barcode scanner
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';


@Component({
  selector: 'page-face-detail',
  templateUrl: 'face-detail.html',
})
export class FaceDetailPage {
  @ViewChild(Slides) slides: Slides;

  public imageData: string;
  faceStorageArray = [];
  faceData: any;
  faces: { response: {} };  // get faces from google api in this format
  items;

  options: BarcodeScannerOptions;
  //result for barcode scan
  private results: {
    text: string,
    cancelled: boolean,
    format: string
  };

  slidesPerView = 1; //number of slides displayed per page
  a;
  i = 0; //for incrementing value in style
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcode: BarcodeScanner, formBuilder: FormBuilder) {
    this.items = navParams.get('faces');
    this.imageData = navParams.get('image');

    //creating form
    this.faceData = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      barcode: ['']
    });

    this.faceVertices();
  }

  faceVertices() {
    let f1 = this.items.responses[0].faceAnnotations;

    //lopping through faces to get vertices
    for (let face of f1) {
      let faceVertices = face.boundingPoly.vertices;
      this.a = faceVertices[0]; //get the first vertices of face
      if (this.a.x == undefined) {
        this.a.x = 0;
      }

      //define style to strip the image
      let styles = {
        'object-fit': 'none',
        'object-position': '-' + this.a.x + 'px -' + this.a.y + 'px',
        "width": "200px",
        "height": "200px"
      };
      this.faces = this.items.responses[0].faceAnnotations;
      this.faces[this.i].style = styles; //adding style to array
      this.i++;
    }
  }

  //function to scan barcode
  async scanBarcode(id) {
    this.options = { prompt: 'Scan the barcode' };
    this.results = await this.barcode.scan(this.options);
    alert(this.results);

    id.color = "primary";
    // document.querySelector('#adulttext' + id).innerHTML = this.results.text;
  }

  submitForm(face, id) {
    let faceData = this.faceData.value;
    alert("faceData" + faceData);
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

    alert(this.items.length);
    alert(this.faceStorageArray.length);
    //check number of face detected and number of forms saved
    if (this.items.length == this.faceStorageArray.length) {
      alert("Hello");
      var success = this.database();
      if (success == true) {
        alert("Data Save Successful");
      }
    }
  }

  //firebase database to store data
  database() {
    alert("database");
    try {
      var storageId = Math.floor(Date.now() / 1000);  //generate number for unique storage
      var ref = firebase.database().ref("event");     //reference to database folder
      const imageRef = ref.child(`images/${storageId}`);
      //save data to firebase 
      imageRef.set(this.faceStorageArray);
      alert("Success");
      return true;
    }
    catch (e) {
      console.log(e);
    }
  }

}