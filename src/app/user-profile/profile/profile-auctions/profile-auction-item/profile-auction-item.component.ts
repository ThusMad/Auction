import { Component, OnInit, Input } from '@angular/core';
import { AuctionItem } from 'src/app/_models/auctionItem.model';

@Component({
  selector: 'app-profile-auction-item',
  templateUrl: './profile-auction-item.component.html',
  styleUrls: ['./profile-auction-item.component.sass']
})
export class ProfileAuctionItemComponent implements OnInit {
  @Input() auction: AuctionItem;
  
  creationTime : string;
  startTime : string;
  endTime : string;

  constructor() { }
  ngOnInit(): void {
    var options = {month: 'short', year: 'numeric', day: 'numeric', minutes: '2-digit', hours: '2-digit'};

    var startDate = new Date(this.auction.startTime);
    var endDate = new Date(this.auction.endTime);
    var creationDate = new Date(this.auction.creationTime);

    this.creationTime = creationDate.toLocaleDateString("en-US", options);
    this.startTime = startDate.toLocaleTimeString("en-US", options) + " UTC";
    this.endTime = endDate.toLocaleTimeString("en-US", options) + " UTC";
  }

}
