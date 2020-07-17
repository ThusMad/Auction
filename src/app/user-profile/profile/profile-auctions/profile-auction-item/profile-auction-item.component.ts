import { Component, OnInit, Input } from '@angular/core';
import { AuctionItem } from 'src/app/_models/auctionItem.model';
import { AuctionService } from 'src/app/_services/auction.service';
import { Bid } from 'src/app/_models/bid.model';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';
import { PaymentService } from 'src/app/_services/payment.service';

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

  isLoading : boolean = false;
  isInAction: boolean = false;
  isHaveBids: boolean = false;
  winnerBid : Bid = null;
  auctionStatus : string = "Schedudled";
  winner : User = null;

  constructor(private auctionService: AuctionService, private userService : UserService, private paymentService : PaymentService) { }
  ngOnInit(): void {
    var options = {month: 'short', year: 'numeric', day: 'numeric', minutes: '2-digit', hours: '2-digit'};

    var startDate = new Date(this.auction.startTime);
    var endDate = new Date(this.auction.endTime);
    var creationDate = new Date(this.auction.creationTime * 1000);

    if(endDate < new Date()) {
      this.auctionStatus = "Ended";
    }

    if(endDate > new Date() && startDate < new Date()) {
      this.auctionStatus = "Ongoing";
      this.isInAction = true;
    }

    this.creationTime = creationDate.toLocaleDateString("en-US", options);
    this.startTime = startDate.toLocaleTimeString("en-US", options) + " UTC";
    this.endTime = endDate.toLocaleTimeString("en-US", options) + " UTC";
  }

  loadDetails() {
    if(this.isInAction == false) {
      this.auctionService.getBids(this.auction.id, 1, 0).subscribe(items => {
        this.isLoading = false;
        if(items.length == 1) {
          this.winnerBid = items[0];

          this.auctionService.getParticipants(this.auction.id).subscribe(users => {
            this.winner = users.find(item => item.id == items[0].userId);
            this.isHaveBids = true;
          })
        }
      });
      // TODO: load auction status etc...
    }
  }
  requestPayment() {
    this.paymentService.createPayment(this.auction.id).subscribe(res => {
      console.log(res);
    })
  }
}
