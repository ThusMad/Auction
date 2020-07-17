import { Component, OnInit } from '@angular/core';
import { AuctionItemComponent } from 'src/app/auction/auction-item/auction-item.component';
import { PaymentMethodItem } from 'src/app/_models/paymentMethod.model';
import { BalanceService } from 'src/app/_services/balance.service';

@Component({
  selector: 'app-replenish-dialog',
  templateUrl: './replenish-dialog.component.html',
  styleUrls: ['./replenish-dialog.component.sass']
})
export class ReplenishDialogComponent implements OnInit {

  cards : {
    method: PaymentMethodItem,
    isSelected: boolean
  }[] = []

  amount : number = 0;

  constructor(private balanceService : BalanceService) { }

  ngOnInit(): void {
    var methods = JSON.parse(sessionStorage.getItem("paymentMethods")) as PaymentMethodItem[];
    var defaultMethod = JSON.parse(sessionStorage.getItem("defaultPaymentMethod")) as PaymentMethodItem;

    methods.forEach(method => {
      this.cards.push({
        method : method,
        isSelected : method.id == defaultMethod.id
      })
    })
  }

  select(card) : void {
    this.cards.forEach(item => {
      item.isSelected = false;
    })

    this.cards.find(item => item.method.cardNumber == card.method.cardNumber).isSelected = true;
  }

  replenish() : void {
    let selectedMethod = this.cards.find(item => item.isSelected == true);
    let amount = this.amount;

    this.balanceService.refillBalance(selectedMethod.method.id, amount).subscribe(res => {
      console.log(res);
    })
  }

}
