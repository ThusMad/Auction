import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Url } from 'url';
import { AuctionItem } from 'src/app/_models/auctionItem.model';
import * as moment from 'moment'
import { Moment } from 'moment';

const
  SEC = 1000,
  MIN = SEC * 60,
  HOUR = MIN * 60,
  DAY = HOUR * 24;

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.sass']
})
export class AuctionItemComponent implements OnInit {
  @Input() auction: AuctionItem;
  @Input() isSelected: boolean;

  isTip : boolean = false;
  isLiked : boolean = false;
  isSubscribed : boolean = false;
  likeType : string = "outline"
  subscribeType : string = "outline"
  tip: string;
  
  creationTime : string;
  startTime : string;
  endTime : string;

  intervalID: number = 0;
  sec: number = 0;
  min: number = 0;
  hours: number = 0;
  days: number = 0;

  constructor() {
   }

  ngOnInit(): void {
    var options = {month: 'short', year: 'numeric', day: 'numeric', minutes: '2-digit', hours: '2-digit'};

    var d = new Date();
    var offset = d.getTimezoneOffset() * 60 * 60;

    var startDate = new Date(this.auction.startTime); //new Date(this.auction.startTime);
    var endDate = new Date(this.auction.endTime);
    var creationDate = new Date(this.auction.creationTime * 1000);
    
    this.creationTime = creationDate.toUTCString();
    this.startTime = startDate.toUTCString();
    this.endTime = endDate.toUTCString();

    if(Math.abs((new Date().getTime() - creationDate.getTime()) / 1000) < 60 * 60 * 24) {
      this.isTip = true;
      this.tip = "Added Recently";
    }
  }

  subscribe(event : any) : void {
    if(this.isSubscribed) {
      this.subscribeType = "outline";
    }
    else {
      this.subscribeType = "filled";
    }
    this.isSubscribed = !this.isSubscribed;
    event.stopPropagation();
  }

  ngOnDestroy() : void {
    clearInterval(this.intervalID);
  }

}
