import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';
import { MyErrorStateMatcher } from 'src/app/_errorMatcher/default.error-matcher';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass', '../sign/sign.component.sass']
})
export class SignUpComponent implements OnInit {

  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.isAuthtorized) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
      this.registrationForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          email: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.password.value, this.f.email.value)
        .pipe(first())
        .subscribe(
            error => {
                this.loading = false;
            });
}

}
