import { Component, OnInit, Input } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';
import { AuctionItem } from 'src/app/_models/auctionItem.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-auctions',
  templateUrl: './profile-auctions.component.html',
  styleUrls: ['./profile-auctions.component.sass']
})
export class ProfileAuctionsComponent implements OnInit {

  @Input() userId : string = "";

  constructor(private auctionService: AuctionService, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>
      console.log(params['id'])
    )
   }

  auctions : AuctionItem[] = [];

  ngOnInit(): void {
    if(this.userId == "") {
      this.auctionService.getMyAuctions().subscribe(items => {
        items.forEach(item => {
          this.auctions.push(item);
          console.log(item);
        })
      })
    }
    else {
      this.auctionService.getUserAuctions(this.userId).subscribe(items => {
        items.forEach(item => {
          this.auctions.push(item);
          console.log(item);
        })
      })
    }

  }

}
