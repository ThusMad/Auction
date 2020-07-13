import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Category } from 'src/app/_models/category.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuctionItem } from 'src/app/_models/auctionItem.model';
import * as moment from 'moment'
import { Moment } from 'moment';
import { User } from 'src/app/_models/user.model';
import { Subscription } from 'rxjs';
import { AuctionService } from 'src/app/_services/auction.service';
import { map } from 'rxjs/operators';
import { AuctionWebsocketService } from 'src/app/_services/auctionWebsocket.service';
import { JsonPipe } from '@angular/common';
import { Bid } from 'src/app/_models/bid.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.sass']
})
export class AuctionDetailsComponent implements OnInit {
  auction : AuctionItem;
  private routeSub: Subscription;
  
  auctionId : string;
  isLoading : boolean = true;

  creationTime : string = "";
  startTime : string = "";
  endTime : string = "";

  bids : {
    value: Bid,
    user : User,
    time: string
  }[] = [];

  currentPrice: number;

  bidders : User[] = []
  displayBidders : User[] = []

  startPrice : number = 1000;
  priceStep: number = 20;
  currentTime: number;
  intervalID: any;

  constructor(private route: ActivatedRoute,
     private userService: UserService,
     private auctionService: AuctionService, 
     private auctionWebsocket : AuctionWebsocketService) {
    this.route.params.subscribe( 
      params =>  {
        console.log(params);
        this.auctionId = params.id;

        this.auctionService.getCurrentPrice(this.auctionId).subscribe(price => {
          this.currentPrice = price
        });

        this.auctionService.get(params.id).subscribe(result => {
          this.auction = result;
          this.calculateTime();

          this.auctionWebsocket.connect(params.id).subscribe(event => {
            let bid = JSON.parse(event.data);
            this.currentPrice = bid.price;

            this.addNewBid(bid);
          })

          this.isLoading = false;
        });

        this.auctionService.getParticipants(params.id).subscribe(users => {
          users.forEach(user => {
            console.log(user);
            
            if(this.displayBidders.length < 3) {
              this.displayBidders.push(user);
            }

            this.bidders.push(user);
            let bid = this.bids.find(b => b.value.userId == user.id)
            if(bid != null) {
              bid.user = user;
            }
          })
        })
      }
    );
      
  }

  addNewBid(bid : Bid) {
    if(this.bids.length > 9) {
      this.bids.pop()
    }

    let user = this.bidders.find(b => b.id == bid.userId);

    if(user != null) {
      this.bids.unshift({
        user : user,
        value: bid,
        time: new Date(bid.time * 1000).toLocaleTimeString()
      })
    }
    else {
      this.userService.get(bid.userId).pipe(
        map(user => {
          this.bidders.push(user);
          this.bids.unshift({
            user : user,
            value: bid,
            time: new Date(bid.time * 1000).toLocaleTimeString()
          })
        }));
    }
  }

  ngOnInit(): void {
    this.auctionService.getBids(this.auctionId, 10, 0).subscribe(items => {
      items.reverse().forEach(bid => {
        this.addNewBid(bid);
      });
    });
  }

  calculateTime() {
    var options = {month: 'short', year: 'numeric', day: 'numeric', minutes: '2-digit', hours: '2-digit'};

    var startDate = new Date(this.auction.startTime);
    var endDate = new Date(this.auction.endTime);
    var creationDate = new Date(this.auction.creationTime);

    this.creationTime = creationDate.toLocaleDateString("en-US", options) + " \n " + creationDate.toLocaleTimeString("en-US");
    this.startTime = startDate.toLocaleDateString("en-US", options) + " \n " + creationDate.toLocaleTimeString("en-US");
    this.endTime = endDate.toLocaleDateString("en-US", options) + " \n " + creationDate.toLocaleTimeString("en-US");

    this.currentTime = moment().valueOf();

    this.intervalID = <any>setInterval(() => {
      this.currentTime += 1000;
    }, 1000);
  }

  ngOnDestroy() {
    //this.routeSub.unsubscribe();
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
