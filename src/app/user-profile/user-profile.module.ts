import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserProfileComponent } from './profile/user-profile.component';

import { ProfileRoutingModule } from './user-profile-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BageComponent } from './bage/bage.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule} from '@angular/material/input';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlusComponent } from './promotion/plus/plus.component';
import { PremiumComponent } from './promotion/premium/premium.component';
import { CardDialogComponent } from './payment-info/card-dialog/card-dialog.component';
import { RecentActivityComponent } from './payment-info/recent-activity/recent-activity.component';
import { RecentActivityItemComponent } from './payment-info/recent-activity/recent-activity-item/recent-activity-item.component';
import { LimitsComponent } from './payment-info/limits/limits.component';
import { LimitsItemComponent } from './payment-info/limits/limits-item/limits-item.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PaymentStatisticComponent } from './payment-info/payment-statistic/payment-statistic.component';
import { ProfileSettingsComponent } from './profile/profile-settings/profile-settings.component';
import { ProfileSideviewComponent } from './profile/profile-sideview/profile-sideview.component';
import { ProfileMenuComponent } from './profile/profile-menu/profile-menu.component';
import { ProfileAuctionsComponent } from './profile/profile-auctions/profile-auctions.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GeneralComponent } from './profile/general/general.component';
import { SettingInputComponent } from './profile/general/setting-input/setting-input.component';
import { ProfileAuctionItemComponent } from './profile/profile-auctions/profile-auction-item/profile-auction-item.component';
import { UserComponent } from './user/user.component';
import { ReplenishDialogComponent } from './payment-info/dialogs/replenish-dialog/replenish-dialog.component';

@NgModule({
    declarations: [
      UserProfileComponent, 
      BageComponent, 
      PaymentInfoComponent,
      CreditCardComponent,
      ProfileSettingsComponent,
      PlusComponent, 
      PremiumComponent, 
      CardDialogComponent,
      RecentActivityComponent, 
      RecentActivityItemComponent, 
      LimitsComponent, 
      LimitsItemComponent, 
      PaymentStatisticComponent, 
      ProfileSideviewComponent, 
      ProfileMenuComponent, 
      ProfileAuctionsComponent, 
      ProfileSettingsComponent, 
      GeneralComponent, 
      SettingInputComponent, 
      ProfileAuctionItemComponent, 
      UserComponent, 
      ReplenishDialogComponent
    ],
    imports: [
      CommonModule,
      ProfileRoutingModule,
      BrowserModule,
      ReactiveFormsModule,
      TextMaskModule,
      MatTabsModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatExpansionModule,
      Ng2TelInputModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatTableModule,
      MatButtonModule,
      MatCardModule,
      MatListModule,
      MatTreeModule,
      CarouselModule,
      NgCircleProgressModule.forRoot({
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 8,
        outerStrokeColor: "#78C000",
        innerStrokeColor: "#C7E596",
        animationDuration: 300
      })
    ],
    providers: [
      {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
    ]
  })

  export class UserProfileModule { }