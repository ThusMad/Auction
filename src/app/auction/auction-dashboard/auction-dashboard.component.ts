import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { AuctionItem } from 'src/app/_models/auctionItem.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { AuctionService } from 'src/app/_services/auction.service';
import * as moment from 'moment'
import { Moment } from 'moment';
import { Category } from 'src/app/_models/category.model';
import { User } from 'src/app/_models/user.model';

const
  SEC = 1000,
  MIN = SEC * 60,
  HOUR = MIN * 60,
  DAY = HOUR * 24;

@Component({
  selector: 'app-auction-dashboard',
  templateUrl: './auction-dashboard.component.html',
  styleUrls: ['./auction-dashboard.component.sass']
})
export class AuctionDashboardComponent implements OnInit {

  @ViewChild('slider') slider; 
  @HostListener('document:keydown.escape', ['$event']) onKeyDown(event : KeyboardEvent) {
    this.selectedAuction = null;
  }

  index: number = 0;
  
  filters: string = "";

  filterButtons = [
    { text: 'All Listings', isClicked: true, callback: () => 
      {
        this.Auctions = [];
        this.filters = "";
        this.loadAuctions(5, 0);
      } 
    },
    { text: 'Recently Added', isClicked: false,
    callback: () => {
      this.Auctions = [];
      let topTime = Math.round((new Date()).getTime() / 1000);
      let bottomTime = Math.round((new Date()).getTime() / 1000) - 24 * 60 * 60;
      this.filters = `created=${bottomTime}-${topTime}`;
      this.loadAuctions(5, 0);
    } },
    { text: 'Currently on action', isClicked: false,
    callback: () => {
      this.Auctions = [];
      this.filters = `started`;
      this.loadAuctions(5, 0);
    }},
  ]

  searchForm: FormGroup;
  authenticationService : AuthenticationService;
  Auctions : {
    isSelected,
    auction,
  }[] = [];

  selectedAuction : AuctionItem;

  isAll : boolean = true ;
  isRecent : boolean = false;
  isOngoing : boolean = false;

  loading: boolean = false;

  constructor( private formBuilder: FormBuilder, 
    private authService : AuthenticationService,
    private auctionService: AuctionService
    ) { 
    this.authenticationService = this.authService;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchText: ['', Validators.required]
    });

    this.navigateToActive();
    this.filterButtons.find(b => b.isClicked == true).callback();
  }

  loadAuctions(limit, offset) {
    (this.filters == "" ? this.auctionService.getAll(limit, offset) : this.auctionService.getAllWithFilter(limit, offset, this.filters)).subscribe(items => {
      items.forEach(item => {
        this.Auctions.push( 
          {
          isSelected : false,
          auction : item
          })
      })
    });
  }

  loadWithFilter(limit, offset, filters) {
    this.auctionService.getAllWithFilter(limit, offset, filters).subscribe(items => {
      items.forEach(item => {
        this.Auctions.push( 
          {
          isSelected : false,
          auction : item
          })
      })
    });
  }

  loadMore() : void {
    let loaded = this.Auctions.length;
    this.loadAuctions(5, loaded);
  }

  selectAuction(auction : any) {
    for(let auc of this.Auctions) {
      auc.isSelected = false;
    }

    this.selectedAuction = auction.auction;
    auction.isSelected = true;
  }

  setActive(button: any): void {
    for(let but of this.filterButtons) {
      if(but.isClicked && but === button)
        return
      but.isClicked = false;
    }

    button.callback();
    button.isClicked = true;

    this.navigateToActive();
  }

  
  navigateToActive() {
    setTimeout(() => {
      let element = (document.getElementsByClassName("active"))[0];
      this.slider.nativeElement.style.left = this.offset(element).left + "px";
    }, 100);
  }

  offset(el) : any {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft - 260 }
  }

}
