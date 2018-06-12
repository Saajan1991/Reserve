import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController, Toast, LoadingController } from 'ionic-angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner'; //import for barcode scanner
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import { CheckinPage } from '../checkin/checkin';


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
  barcodeCheckList = [];

  options: BarcodeScannerOptions;
  //result for barcode scan
  private barcodeResults: {
    text: string,
    cancelled: boolean,
    format: string
  };

  slidesPerView = 1; //number of slides displayed per page
  a;
  i = 0; //for incrementing value in style


  //constructor
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    private loadingCtrl: LoadingController,
    formBuilder: FormBuilder,
    private toastCtrl: ToastController) {
    this.items = navParams.get('faces');
    this.imageData = navParams.get('image');

    //creating form
    this.faceData = formBuilder.group({
      firstName: ['', Validators.required],
      gender: [''],
      age: [''],
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
    this.barcodeResults = await this.barcode.scan(this.options);
    let barcode = this.barcodeResults.text;


    let checkBarcode = this.checkBarcodeData(barcode);
    alert(checkBarcode);

    if (checkBarcode) {
      document.querySelector('#barcode' + id).innerHTML = barcode;
    }
    else {
      alert("Scan Again");
      this.scanBarcode(id);
    }
  }


  submitForm(face, id) {
    let faceData = this.faceData.value;
    faceData.barcode = this.barcodeResults.text;
    // alert(faceData.barcode);
    if (faceData.firstName != '' && faceData.barcode != '') {
      let data = {
        "firstName": faceData.firstName,
        "gender": faceData.gender,
        "age": faceData.age,
        "barcode": faceData.barcode,
        "faceVertices": face.boundingPoly.vertices
      };

      this.faceStorageArray.push(data);

      this.slides.slideNext();
    }

    // alert(this.faceStorageArray.length);
    //check number of face detected and number of forms saved
    if (this.items.responses[0].faceAnnotations.length == this.faceStorageArray.length) {
      // alert("Hello");
      var success = this.database();
      if (success == true) {
        let toast = this.toastCtrl.create({
          message: "Data Save Successful",
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
        // alert("Data Save Successful");
        this.navCtrl.push(CheckinPage);
      }
    }
  }

  //firebase database to store data
  database() {
    // alert("database");
    try {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      var storageId = Math.floor(Date.now() / 1000);  //generate number for unique storage
      var ref = firebase.database().ref("visits/event");     //reference to database folder
      const imageRef = ref.child(`images/${storageId}`);
      //save data to firebase 
      imageRef.set(this.faceStorageArray);
      loading.dismiss();
      // alert("Success");
      return true;
    }
    catch (e) {
      console.log(e);
    }
  }

  checkBarcodeData(barcode) {

    let barcodeCheckList = [];
    var ref = firebase.database().ref("visits/event/images");     //reference to database folder

    ref.on('value', function (snapshot) {
      console.log(snapshot.val());
      let data = snapshot.val();

      let tempArray = [];
      for (var key in data) {
        tempArray.push(data[key]);
      }
      console.log(tempArray);


      tempArray.forEach(result => {
        for (var a in result) {
          console.log(result[a].barcode);
          let barcode = result[a].barcode;

          barcodeCheckList.push(barcode);
        }
      });
      // let list = barcodeCheckList;
    });

    let list = barcodeCheckList;
    var test = list.indexOf(barcode);
    if (test > -1) {
      console.log("Barcode is already used");
      alert("Barcode is already used");
      return false;
    } else {
      console.log("Unique Barcode");
      alert("Unique Barcode");
      return true;
    }
  }


}