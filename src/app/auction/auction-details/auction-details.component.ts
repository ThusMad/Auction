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
  startTime : string= "";
  endTime : string= "";

  public lineChartData: ChartDataSets[] = [
    { data: [1000, 1200, 2000, 2480, 2660]}
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    layout: {
      
      padding: {
          left: 50,
          right: 50,
          top: 10,
          bottom: 10
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          drawBorder: false,
          color: "transparent",
          zeroLineWidth : 1,
          zeroLineColor : "transparent"
        },
      }],
      yAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        },
        scaleLabel: {
          display: false
        },
        ticks: {
          display: false
        }
      }],
    },
    annotation: {
      annotations: [
        {
          display : false,
          type: 'line',
          mode: 'vertical',
          color: "#fff",
          borderColor: 'transparent',
          borderWidth: 0,
          gridLines: "transparent"
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    { 
      backgroundColor: '#a0d4f7',
      borderColor: '#69b5e7',
      pointBackgroundColor: '#69b5e7',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: '#69b5e7',
      pointHoverBorderColor: '#fff'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  bidders : any[] = [
    {
      img: "https://i.pinimg.com/236x/75/d9/d6/75d9d6a31977ebed4f2da313124ec3ea.jpg"
    },
    {
      img: "https://i.insider.com/589dbb873149a101788b4c85?width=1100&format=jpeg&auto=webp"
    },
    {
      img: "https://i.pinimg.com/originals/32/71/49/32714938459e9a14ac7b4ba42280f037.jpg"
    },
    {
      img: "https://i.pinimg.com/236x/75/d9/d6/75d9d6a31977ebed4f2da313124ec3ea.jpg"
    }
  ]

  startPrice : number = 1000;
  priceStep: number = 20;
  currentTime: number;
  intervalID: any;

  constructor(private route: ActivatedRoute, private auctionService: AuctionService, private auctionWebsocket : AuctionWebsocketService) {
    this.route.params.subscribe( 
      params =>  {
        console.log(params);
        this.auctionService.get(params.id)
        .subscribe(result => {
          console.log(result);
          this.auction = result;
          this.calculateTime();
          this.isLoading = false;

          // this.auctionWebsocket.connect(params.id).subscribe(res => {
          //   console.log(res);
          // })
        });
        }
      );
      
  }

  ngOnInit(): void {
    this.lineChartLabels.push(new Date().toDateString());
    this.lineChartLabels.push(new Date().toDateString());
    this.lineChartLabels.push(new Date().toDateString());
    this.lineChartLabels.push(new Date().toDateString());
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
