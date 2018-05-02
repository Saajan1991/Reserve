import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Camera } from '@ionic-native/camera';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CheckinPage } from '../pages/checkin/checkin';
import { DetailPage } from '../pages/detail/detail';
import { ImageDisplayPage } from '../pages/image-display/image-display';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { environment } from '../environment';
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service/google-cloud-vision-service';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    CheckinPage,
    DetailPage,
    TabsPage,
    ImageDisplayPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    DetailPage,
    CheckinPage,
    ImageDisplayPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    GoogleCloudVisionServiceProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
