import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.sass']
})
export class AuctionComponent implements OnInit {
  constructor(private router: Router) { 
    if(this.router.url === '/auction') {
      this.router.navigateByUrl('/auction/dashboard');
    }
  }

  ngOnInit(): void {
    
  }

}
