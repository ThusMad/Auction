import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AuctionItem } from 'src/app/_models/auctionItem.model';

@Component({
  selector: 'app-auction-preview',
  templateUrl: './auction-preview.component.html',
  styleUrls: ['./auction-preview.component.sass']
})
export class AuctionPreviewComponent implements OnInit {

  @Input() auction : AuctionItem;

  isTip: boolean = false;

  isSubscribed : boolean = false;
  subscribeType : string = "outline";
  startTime: string;
  endTime: string;
  creationTime: string;

  subscribe() : void {
    if(this.isSubscribed) {
      this.subscribeType = "outline";
    }
    else {
      this.subscribeType = "filled";
    }
    this.isSubscribed = !this.isSubscribed;
  }

  constructor() { }

  ngOnInit(): void {
  }

  
  ngOnChanges(changes: SimpleChanges) {

    var options = {month: 'numeric', year: 'numeric', day: 'numeric', minutes: '2-digit', hours: '2-digit'};
  
    if(this.auction != null) {
      var startDate = new Date(this.auction.startTime);
      var endDate = new Date(this.auction.endTime);
      var creationDate = new Date(this.auction.creationTime * 1000);
  
      this.creationTime = creationDate.toLocaleDateString("en-US", options);
      this.startTime = startDate.toLocaleTimeString("en-US", options) + " UTC";
      this.endTime = endDate.toLocaleTimeString("en-US", options) + " UTC";
  
      if(Math.abs((new Date().getTime() - creationDate.getTime()) / 1000) < 60 * 60 * 24) {
        this.isTip = true;
      }
      else {
        this.isTip = false;
      }
    }

  }
}
