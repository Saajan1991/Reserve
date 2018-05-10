import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageDisplayPage } from '../image-display/image-display';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  htmlToAdd: any;
  htmlToDisplay: any;
  downloadURL: any;
  TotalNumberOfAdults = 0;
  TotalNumberOfKids = 0;

  public base64image: string;

  faces: { response: {} };
  items;

  filename;

  public storageRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    protected _sanitizer: DomSanitizer) {
    this.TotalNumberOfAdults = navParams.get('adults');
    this.TotalNumberOfKids = navParams.get('kids');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }


  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    //open camera in device
    this.camera.getPicture(options).then((imageData) => {
      let imageDataResult = 'data:image/jpeg;base64,' + imageData;
      let downloadUrl = this.upload(imageDataResult);

    }, err => {
      alert(err);
    });
  }


  public upload(imageDataResult) {
    try {
      this.storageRef = firebase.storage().ref();
      alert(this.storageRef);
    }
    catch (e) {
      alert(e);
    }

    this.filename = Math.floor(Date.now() / 1000);
    const imageRef = this.storageRef.child(`images/${this.filename}.jpg`);
    imageRef.putString(imageDataResult, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      alert("upload Success");

      this.vision.getFaces(this.filename).subscribe((result) => {
        this.items = JSON.parse(JSON.stringify(result));
        this.faces = this.items.responses[0].faceAnnotations;
        if (this.items != undefined) {
          alert("Total Face Detected: " + this.items.responses[0].faceAnnotations.length);
          this.faces = this.items.responses[0].faceAnnotations;

          let faces = this.items.responses[0].faceAnnotations;

          var a, b, c, d;

          for (let face of faces) {
            let faceVertices = face.boundingPoly.vertices;
            a = faceVertices[0];
            if (a.x == undefined) {
              a.x = 0;
            }
            let html = '<img class="person1" src="http://www.allwhitebackground.com/images/3/3809.jpg" style="object-fit: none; object-position: -' + a.x + 'px -' + a.y + 'px; width: 200px; height: 200px;">'
            //bypass html trust issue
            this.htmlToAdd = this.safeHtml(html);
            alert("html to add" + this.htmlToAdd);
            //adding all images to one for view
            this.htmlToDisplay = this.htmlToDisplay + this.htmlToAdd.changingThisBreaksApplicationSecurity;
            alert("html to Display" + this.htmlToDisplay);

          }
          //send data to imageDisplayPage
          this.navCtrl.push(ImageDisplayPage, {
            image: imageDataResult,
            adults: this.TotalNumberOfAdults,
            kids: this.TotalNumberOfKids,
            faces: this.faces,
            html: this.htmlToDisplay
          });
        }
        else {
          alert("Face Not Detected");
        }
        alert(this.faces + "item to display");
      }, err => {
        alert(err);
      });
    }).catch(function (err) {
      return err;
    });

    return this.downloadURL;
  }

  //function for bypass Html Trust
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}



// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { ImageDisplayPage } from '../image-display/image-display';
// import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
// import firebase from 'firebase';

// @Component({
//   selector: 'page-detail',
//   templateUrl: 'detail.html',
// })
// export class DetailPage {

//   TotalNumberOfAdults = 0;
//   TotalNumberOfKids = 0;

//   public base64image: string; 

//   labels: { response: {} };
//   items;

//   constructor(
//     public navCtrl: NavController,
//     public navParams: NavParams,
//     private camera: Camera,
//     private vision: GoogleCloudVisionServiceProvider) {
//     this.TotalNumberOfAdults = navParams.get('adults');
//     this.TotalNumberOfKids = navParams.get('kids');
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad DetailPage');
//   }


//   takePhoto() {

//     const options: CameraOptions = {
//       quality: 100,
//       targetHeight: 500,
//       targetWidth: 500,
//       destinationType: this.camera.DestinationType.DATA_URL,
//       encodingType: this.camera.EncodingType.PNG,
//       mediaType: this.camera.MediaType.PICTURE,
//       correctOrientation: true
//     }

//     //open camera in device
//     this.camera.getPicture(options).then((imageData) => {
//       this.vision.getLabels(imageData).subscribe((result) => {
//         // alert("Save success");
//         this.items = JSON.stringify(result);
//         this.items = JSON.parse(this.items);
//         // alert(this.items);
//         this.labels = this.items.responses[0].labelAnnotations;
//         // alert(this.labels);

//         this.base64image = 'data:image/jpeg;base64,' + imageData;

//         //send data to imageDisplayPage
//         this.navCtrl.push(ImageDisplayPage, {
//           image: this.base64image,
//           adults: this.TotalNumberOfAdults,
//           kids: this.TotalNumberOfKids,
//           labels: this.labels
//         });
//       }, err => {
//         alert(err);
//       });
//     }, err => {
//       alert(err);
//     });
//   }

// }