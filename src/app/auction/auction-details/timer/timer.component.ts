import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import { Moment } from 'moment';

const
  SEC = 1000,
  MIN = SEC * 60,
  HOUR = MIN * 60,
  DAY = HOUR * 24;

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  @Input() startDate : number;
  @Input() creationDate : number;
  
  timeleftConst: number;
  timeleft: number;
  sec: number = 0;
  min: number = 0;
  hours: number = 0;
  days: number = 0;

  dTotal: number = 0;

  dayPercent : number = 0;
  hoursPercent : number = 0;
  minPercent : number = 0;
  secPercent : number = 0;

  intervalID: any;

  constructor() { }

  ngOnInit(): void {
    let timeDif = this.startDate / 1000 - this.creationDate
    this.timeleft = this.startDate - moment().valueOf();
    this.timeleftConst = this.timeleft;
    
    let dTotal = (timeDif / 86400);
    console.log(this.timeleft);


    this.intervalID = <any>setInterval(() => {
      this.timeleft -= 1000;
      this.days = this.timeleft / DAY | 0;
      this.hours = (this.timeleft - this.days * DAY) / HOUR | 0;
      this.min = (this.timeleft - this.days * DAY - this.hours * HOUR) / MIN | 0;
      this.sec = (this.timeleft - this.days * DAY - this.hours * HOUR - this.min * MIN) / SEC | 0;

      this.dayPercent = ((dTotal - this.days) / dTotal) * 100;
      
      this.hoursPercent = ((24 - this.hours) / 24) * 100;
      this.minPercent = ((60 - this.min) / 60) * 100;
      this.secPercent = ((60 - this.sec) / 60) * 100;

    }, 1000);

  }

}
