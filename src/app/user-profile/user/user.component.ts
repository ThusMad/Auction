import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  isLoading : boolean = false;

  userId = "";

  constructor(private route: ActivatedRoute) { 
    console.log("id: " + route.snapshot.params['id']);
    this.userId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}
