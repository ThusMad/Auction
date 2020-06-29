import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/_services/payment.service';
import { PaymentStatisticItem } from 'src/app/_models/paymentStatistic.model';

@Component({
  selector: 'app-payment-statistic',
  templateUrl: './payment-statistic.component.html',
  styleUrls: ['./payment-statistic.component.sass']
})
export class PaymentStatisticComponent implements OnInit {

  statistic : PaymentStatisticItem;
  isLoaded : boolean = false;

  constructor(private paymentSerice : PaymentService) {
    paymentSerice.getPaymentSatistic().subscribe(stat => {
      this.statistic = stat;
      this.isLoaded = true;
    })
   }

  ngOnInit(): void {
  }

}
