import { Component, OnInit } from '@angular/core';
import { Bid } from 'src/app/_models/bid.model';
import { User } from 'src/app/_models/user.model';
import * as moment from 'moment'
import { Moment } from 'moment';

@Component({
  selector: 'app-bidders-list',
  templateUrl: './bidders-list.component.html',
  styleUrls: ['./bidders-list.component.sass']
})
export class BiddersListComponent implements OnInit {

  bids : {
    value: Bid,
    time: string
  }[] = [];

  constructor() { }

  ngOnInit(): void {

    let bidders = [
      "https://i.pinimg.com/236x/75/d9/d6/75d9d6a31977ebed4f2da313124ec3ea.jpg",
      "https://i.insider.com/589dbb873149a101788b4c85?width=1100&format=jpeg&auto=webp",
      "https://i.pinimg.com/originals/32/71/49/32714938459e9a14ac7b4ba42280f037.jpg",
      "https://i.pinimg.com/236x/75/d9/d6/75d9d6a31977ebed4f2da313124ec3ea.jpg"
    ]

    for(var i = 0; i < 10; i++) {
      let bid = new Bid();
      bid.amount = 1000 + (20 * i);
      bid.time = moment().valueOf() + 8000 * i;
      bid.user = new User();
      bid.user.username = "user_" + i; 
      bid.user.profilePicture = bidders[Math.floor(Math.random() * 4)];
      this.bids.push( {
        value: bid,
        time: new Date(bid.time.valueOf()).toLocaleTimeString()
      });
    }

    console.log(this.bids);
    
  }

}
