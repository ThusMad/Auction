import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WatchedComponent } from './watched/watched.component';
import { LikedComponent } from './liked/liked.component';
import { AuctionComponent } from './auction/auction.component';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuctionItemComponent } from './auction-item/auction-item.component';
import { SignModule } from './sign/sign.module';
import { SignComponent } from './sign/sign/sign.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SignUpComponent } from './sign/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { HeadersInterceptor } from './_helpers/headers.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NavigationComponent,
    DashboardComponent,
    WatchedComponent,
    LikedComponent,
    AuctionComponent,
    ScheduledComponent,
    UserProfileComponent,
    AuctionItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
