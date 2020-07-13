import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';

@Component({
  selector: 'app-bid-control',
  templateUrl: './bid-control.component.html',
  styleUrls: ['./bid-control.component.sass']
})
export class BidControlComponent implements OnInit {

  @Input() auctionId = "";
  @Input() bidStep = 0;
  @Input() currentPrice: number = 0;


  bid : number;

  constructor(private auctionService : AuctionService) { }

  ngOnInit(): void {
    this.bid = this.currentPrice;
  }

  placeBid() {
    this.auctionService.placeBid(this.auctionId, this.bid).subscribe(res => {
    });
  }

  increase() {
    this.bid += this.bidStep;
  }

  decrease() {
    if(this.bid != this.currentPrice) {
      this.bid -= this.bidStep;      
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.bid < this.currentPrice) {
      this.bid = this.currentPrice;
    }
  }

}
