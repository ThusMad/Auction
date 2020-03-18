import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignComponent } from './sign/sign.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    {
        path: 'sign',
        component: SignComponent,
        children: [
            {
                path: 'in',
                component: SignInComponent
            },
            {
                path: 'up',
                component: SignUpComponent
            }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignRoutingModule { }