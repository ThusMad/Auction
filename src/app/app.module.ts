import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignModule } from './sign/sign.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuctionModule } from './auction/auction.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeadersInterceptor } from './_helpers/headers.interceptor';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RefreshTokenInterceptor } from './_helpers/refreshToken.interceptor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    DashboardComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SignModule,
    AuctionModule,
    UserProfileModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Ng2TelInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTreeModule,
    MatChipsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    ChartsModule,
    CarouselModule,
    MatPaginatorModule,
    NgCircleProgressModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true 
    },
    { 
      provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true 
    }
],
  bootstrap: [AppComponent]
})

export class AppModule { }
