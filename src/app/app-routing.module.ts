import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_helpers/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path : '', component: HomeComponent 
  },
  {
    path : 'home', 
    redirectTo: '' 
  },
  {
    path : 'dashboard', component : DashboardComponent
  },
  {
    path : 'watched',
    redirectTo: "watched"
  },
  {
    path : "sign", 
    redirectTo: "sign",
    canActivate: [AuthGuard]
  },
  {
    path : "profile", 
    redirectTo: "profile",
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    redirectTo: "user"
  },
  {
    path : "auction", 
    redirectTo: "auction",
    canActivate: [AuthGuard]
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
