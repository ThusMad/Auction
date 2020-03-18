import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Url } from 'url';

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
  @Input() name: string;
  @Input() auctionStartTime: Date;
  @Input() auctionStartPrice: number;
  @Input() placeholder: Url;
  @Input() description: string;
  
  intervalID: number = 0;
  sec: number = 0;
  min: number = 0;
  hours: number = 0;
  days: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.intervalID = <any>setInterval(() => {
      const dif = +this.auctionStartTime - +new Date();
      this.days = dif / DAY | 0;
      this.hours = (dif - this.days * DAY) / HOUR | 0;
      this.min = (dif - this.days * DAY - this.hours * HOUR) / MIN | 0;
      this.sec = (dif - this.days * DAY - this.hours * HOUR - this.min * MIN) / SEC | 0;
    }, 1000);
  }

  ngOnDestroy() : void {
    clearInterval(this.intervalID);
  }

}
