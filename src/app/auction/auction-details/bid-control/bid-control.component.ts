import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bid-control',
  templateUrl: './bid-control.component.html',
  styleUrls: ['./bid-control.component.sass']
})
export class BidControlComponent implements OnInit {

  bidStep: number = 20;
  сurrentPrice: number = 1000;
  bid : number = this.сurrentPrice;
  constructor() { }

  ngOnInit(): void {
  }

  increase() {
    this.bid += this.bidStep;
  }

  decrease() {
    this.bid -= this.bidStep;
  }

}
