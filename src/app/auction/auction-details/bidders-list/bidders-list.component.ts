import { Component, OnInit, Input } from '@angular/core';
import { Bid } from 'src/app/_models/bid.model';
import { User } from 'src/app/_models/user.model';
import * as moment from 'moment'
import { Moment } from 'moment';
import { AuctionService } from 'src/app/_services/auction.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-bidders-list',
  templateUrl: './bidders-list.component.html',
  styleUrls: ['./bidders-list.component.sass']
})
export class BiddersListComponent implements OnInit {

  private users : User[];

  @Input() bids : {
    value: Bid,
    user: User,
    time: string
  }[] = [];

  constructor(private userService : UserService) { }

  ngOnInit(): void { 
  }

}
