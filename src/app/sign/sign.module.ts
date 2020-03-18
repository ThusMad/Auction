import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { SignRoutingModule } from './sign-routing.module';

import { SignComponent } from './sign/sign.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [SignComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    SignRoutingModule,
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class SignModule { }
