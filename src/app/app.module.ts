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

import * as firebase from 'firebase';

import { SafeHtmlPipe } from '../safeHtml';
import { FaceDetailPage } from '../pages/face-detail/face-detail';
import { TestPage } from '../pages/test/test';
import { CheckInOutPage } from '../pages/check-in-out/check-in-out';
import { CheckoutPage } from '../pages/checkout/checkout';
import { FindPage } from '../pages/find/find';
import { EventPage } from '../pages/event/event';
import { AddEventPage } from '../pages/add-event/add-event';
import { ApiProvider } from '../providers/api/api';
import { BusinessPage } from '../pages/business/business';
import { AddBusinessPage } from '../pages/add-business/add-business';
import { BusinessDetailPage } from '../pages/business-detail/business-detail';
import { VenuePage } from '../pages/venue/venue';
import { VenueDetailPage } from '../pages/venue-detail/venue-detail';
import { AddVenuePage } from '../pages/add-venue/add-venue';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { SubEventsPage } from '../pages/sub-events/sub-events';
// import { IonicStorageModule } from '@ionic/Storage';

firebase.initializeApp(environment.firebaseConfig)

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    CheckinPage,
    DetailPage,
    TabsPage,
    ImageDisplayPage,
    SafeHtmlPipe,
    TestPage,
    FaceDetailPage,
    CheckInOutPage,
    CheckoutPage,
    EventPage,
    FindPage,
    AddEventPage,
    BusinessPage,
    AddBusinessPage,
    BusinessDetailPage,
    VenuePage,
    VenueDetailPage,
    AddVenuePage,
    MenuPage,
    LoginPage,
    EventDetailPage,
    SubEventsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    HttpClientModule,
    // IonicStorageModule.forRoot()
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
    TestPage,
    FaceDetailPage,
    CheckInOutPage,
    CheckoutPage,
    EventPage,
    FindPage,
    AddEventPage,
    BusinessPage,
    AddBusinessPage,
    BusinessDetailPage,
    VenuePage,
    VenueDetailPage,
    AddVenuePage,
    MenuPage,
    LoginPage,
    EventDetailPage,
    SubEventsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    GoogleCloudVisionServiceProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
  ]
})
export class AppModule { }
