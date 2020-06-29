import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RndEmoji } from 'src/app/_helpers/randomEmoji';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.sass']
})
export class CreditCardComponent implements OnInit {

  @Input() isDefault: boolean;
  @Input() cardNumber: string;
  @Input() experationTimestamp: number;
  
  balance : string = "";
  experation: string = "";

  constructor() { }

  ngOnInit(): void {
    let date = new Date(this.experationTimestamp * 1000);

    var datePipe = new DatePipe('en-US');
    this.experation = datePipe.transform(date,'MM/yy');

    var rnd = new RndEmoji();

    this.balance = rnd.rand() + rnd.rand() + rnd.rand();
  }

}
