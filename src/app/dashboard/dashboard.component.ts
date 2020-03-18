import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../_models/auctionItem.model';

const
  SEC = 1000,
  MIN = SEC * 60,
  HOUR = MIN * 60,
  DAY = HOUR * 24;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  Auctions = [];

  constructor() {
    
  }

  ngOnInit(): void {
    // this.Auctions = new AuctionItem[10];
    this.Auctions.push(new AuctionItem("Samsung Galaxy S20 Plus", new Date(+new Date() + DAY * 10 + HOUR * 15 + MIN * 21 + SEC * 9), "assets/backgrounds/placeholder.jpg", 100, "Brand new phone for your mother"));
    this.Auctions.push(new AuctionItem("Apple iPhone Xs Max 64Gb Gold", new Date(), "assets/backgrounds/placeholder.jpg", 200, "Brand new phone"));
  }

}
