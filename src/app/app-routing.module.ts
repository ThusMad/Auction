import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuctionComponent } from './auction/auction.component';
import { LikedComponent } from './liked/liked.component';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { WatchedComponent } from './watched/watched.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SignUpComponent } from './sign/sign-up/sign-up.component';
import { SignComponent } from './sign/sign/sign.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  {
    path : '', component: HomeComponent 
  },
  {
    path : 'dashboard', component : DashboardComponent
  },
  {
    path : 'auction', component : AuctionComponent
  },
  {
    path : 'liked', component : LikedComponent
  },
  {
    path : 'scheduled', component : ScheduledComponent
  },
  {
    path : 'watched', component : WatchedComponent
  },
  {
    path: "profile", component: UserProfileComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
