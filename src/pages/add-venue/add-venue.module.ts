import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddVenuePage } from './add-venue';

@NgModule({
  declarations: [
    AddVenuePage,
  ],
  imports: [
    IonicPageModule.forChild(AddVenuePage),
  ],
})
export class AddVenuePageModule {}
