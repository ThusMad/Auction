import { Component, OnInit, Input } from '@angular/core';
import { Url } from 'url';
import { AuctionItem } from 'src/app/_models/auctionItem.model';

const
  SEC = 1000,
  MIN = SEC * 60,
  HOUR = MIN * 60,
  DAY = HOUR * 24;

@Component({
  selector: 'app-auction-item-ongoing',
  templateUrl: './auction-item-ongoing.component.html',
  styleUrls: ['./auction-item-ongoing.component.sass']
})
export class AuctionItemOngoingComponent implements OnInit {

  @Input() auction: AuctionItem;
  
  isLiked : boolean = false;
  likeType : string = "outline"

  startTime : number;
  currentTime : number;
  intervalID: number = 0;
  sec: number = 0;
  min: number = 0;
  hours: number = 0;
  days: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startTime = +this.auction.startTime - +new Date();
    this.currentTime = this.startTime;

    this.intervalID = <any>setInterval(() => {
      const dif = +this.auction.startPrice - +new Date();
      this.days = dif / DAY | 0;
      this.hours = (dif - this.days * DAY) / HOUR | 0;
      this.min = (dif - this.days * DAY - this.hours * HOUR) / MIN | 0;
      this.sec = (dif - this.days * DAY - this.hours * HOUR - this.min * MIN) / SEC | 0;
    }, 1000);
  }

  like(event : any) : void {
    if(this.isLiked) {
      this.likeType = "outline";
    }
    else {
      this.likeType = "filled";
    }
    this.isLiked = !this.isLiked;
  }

  ngOnDestroy() : void {
    clearInterval(this.intervalID);
  }

}
