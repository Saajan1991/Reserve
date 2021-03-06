import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ActionSheet, ActionSheetController, Platform, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { BusinessPage } from '../business/business';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-add-business',
  templateUrl: 'add-business.html',
})
export class AddBusinessPage {


  imageURI: any = "https://www.freelogodesign.org/img/logo-ex-7.png";
  BusinessData;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public platform: Platform,
    public toastCtrl: ToastController,
    // private filePath: FilePath,
    private api: ApiProvider) {
    this.BusinessData = formBuilder.group({
      businessName: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBusinessPage');
  }

  //uploading logo
  uploadLogo() {
    console.log("Update logo");
  }


  //submit for with data
  submitForm() {
    let BusinessData = this.BusinessData.value;
    let data = {
      name: BusinessData.businessName,
      user_id: 1,
      logo: this.imageURI
    };
    this.storeBusinessData(data);
  }


  //store business data 
  storeBusinessData(data) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.storeBusiness(data).subscribe((result => {
      let response = result;
      let jsonResponse = JSON.parse(JSON.stringify(result));
      setTimeout(() => {
        loading.dismiss();
        // this.navCtrl.popAll();
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(BusinessPage).then(()=> {
          this.navCtrl.remove(currentIndex);
          this.navCtrl.remove(currentIndex-1)
        });
      }, 1000);
    }));
  }

  //dismiss the modal
  dismiss() {
    this.viewCtrl.dismiss();
  }


  getImage() {
    // const options: CameraOptions = {
    //   quality: 50,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
