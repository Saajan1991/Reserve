import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubEventsPage } from './sub-events';

@NgModule({
  declarations: [
    SubEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubEventsPage),
  ],
})
export class SubEventsPageModule {}
