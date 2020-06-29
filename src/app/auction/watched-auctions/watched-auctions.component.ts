import { Component, OnInit } from '@angular/core';
import { AuctionItem } from 'src/app/_models/auctionItem.model';
import { AuctionService } from 'src/app/_services/auction.service';

@Component({
  selector: 'app-watched-auctions',
  templateUrl: './watched-auctions.component.html',
  styleUrls: ['./watched-auctions.component.sass']
})
export class WatchedAuctionsComponent implements OnInit {

  Auctions : AuctionItem[] = [];
  watched : string;
  isLoading: boolean = false;
  constructor(private auctionService : AuctionService) { }

  ngOnInit(): void {
    let watched = JSON.parse(localStorage.getItem("watchedCache")) as AuctionItem[];

    watched.forEach(item => {
      this.Auctions.push(item);
    });

  }

  loadMore() : void {

  }

}
