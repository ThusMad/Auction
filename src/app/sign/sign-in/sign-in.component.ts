﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, map, catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MyErrorStateMatcher } from 'src/app/_errorMatcher/default.error-matcher';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass', '../sign/sign.component.sass']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.isAuthtorized) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.obtainToken(this.f.username.value, this.f.password.value)
        .subscribe(
            data => {
                this.userService.get("").subscribe(result => {
                    this.router.navigate([this.returnUrl]);
                });  
            },
            error => {
                this.loading = false;
            });
    }
}
