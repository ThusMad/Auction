import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  user : User;
  isLoading : boolean = false;

  constructor(private auth : AuthenticationService,
    private route: ActivatedRoute, 
    private userService: UserService,
    private router: Router,
    private snackBar : MatSnackBar) {

     }

  ngOnInit(): void {
  }
}
