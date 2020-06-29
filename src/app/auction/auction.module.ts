import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuctionRoutingModule } from './auction-routing.module';

import { AuctionItemComponent } from './auction-item/auction-item.component';
import { AuctionItemOngoingComponent } from './auction-item-ongoing/auction-item-ongoing.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionFormComponent } from './auction-form/auction-form.component';
import { AuctionDashboardComponent } from './auction-dashboard/auction-dashboard.component';
import { AuctionDetailsComponent } from './auction-details/auction-details.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ImageInputComponent } from './auction-form/image-input/image-input.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OfferComponent } from './offer/offer.component';
import { AuctionPreviewComponent } from './auction-dashboard/auction-preview/auction-preview.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BiddersListComponent } from './auction-details/bidders-list/bidders-list.component';
import { BidControlComponent } from './auction-details/bid-control/bid-control.component';
import { ChartsModule } from 'ng2-charts';
import { TimerComponent } from './auction-details/timer/timer.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { WatchedAuctionsComponent } from './watched-auctions/watched-auctions.component';

@NgModule({
  declarations: [
    AuctionComponent,
    AuctionItemComponent,
    AuctionItemOngoingComponent, 
    AuctionFormComponent,
    AuctionDashboardComponent,
    AuctionDetailsComponent, 
    ImageInputComponent, 
    OfferComponent, 
    AuctionPreviewComponent, BiddersListComponent, BidControlComponent, TimerComponent, WatchedAuctionsComponent
  ],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    NgxDaterangepickerMd.forRoot(),
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatListModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ChartsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  ]
})
export class AuctionModule { 
  
}
