import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.sass']
})
export class GeneralComponent implements OnInit {

  user : User;
  isLoading : boolean = true;
  constructor() { }

  ngOnInit(): void {
    var currentUser = sessionStorage.getItem('currentUser');
    this.user = JSON.parse(currentUser);
    this.isLoading = false;
  }

}
