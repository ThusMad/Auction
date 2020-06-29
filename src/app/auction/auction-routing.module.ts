import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionComponent } from './auction/auction.component';
import { AuctionDashboardComponent } from './auction-dashboard/auction-dashboard.component';
import { AuctionFormComponent } from './auction-form/auction-form.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { AuctionDetailsComponent } from './auction-details/auction-details.component';
import { WatchedAuctionsComponent } from './watched-auctions/watched-auctions.component';

const routes: Routes = [
    {
        path: 'auction',
        component: AuctionComponent,
        children: [
          { 
            path: '', 
            redirectTo: 'dashboard', 
            pathMatch: 'full' 
          },
          {
              path: 'new',
              component: AuctionFormComponent
          },
          {
            path: 'dashboard',
            component: AuctionDashboardComponent
          }
      ]
    },
    {
      path: 'auction/:id',
      component: AuctionDetailsComponent,
    },
    {
      path: 'watched',
      component: WatchedAuctionsComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }