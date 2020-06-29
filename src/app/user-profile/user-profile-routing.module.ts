import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './profile/user-profile.component';
import { NgModule } from '@angular/core';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { CommonModule } from '@angular/common';
import { ProfileAuctionsComponent } from './profile/profile-auctions/profile-auctions.component';
import { ProfileSettingsComponent } from './profile/profile-settings/profile-settings.component';
import { GeneralComponent } from './profile/general/general.component';
import { UserComponent } from './user/user.component';

const profileRoutes: Routes = [
    {
      path: 'profile',
      component: UserProfileComponent,
      children : [
        { 
          path: '', 
          redirectTo: 'general', 
          pathMatch: 'full' 
        },
        { 
          path: 'general', 
          component : GeneralComponent
        },
        { 
          path: 'settings', 
          component : ProfileSettingsComponent
        },
        { 
          path: 'auctions', 
          component : ProfileAuctionsComponent
        },
        { 
          path: 'payment', 
          component : PaymentInfoComponent
        }
      ]
    },
    {
      path: 'user',
      children : [
        { 
          path: '', 
          redirectTo: '/404', 
          pathMatch: 'full' 
        },
        { 
          path: ':id', 
          component : UserComponent
        },
      ]
    }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }

