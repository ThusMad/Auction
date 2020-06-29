import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/_services/balance.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.sass']
})
export class LimitsComponent implements OnInit {

  fundsInt : string;
  fundsDec : string;

  fee : number;

  constructor(private balanceService : BalanceService, private userService : UserService) {
    balanceService.getMyBalance().subscribe(balance => {
      this.fundsInt = this.numberWithCommas(Math.floor(balance.funds));
      this.fundsDec =  (balance.funds % 1 ).toFixed(2).toString().substr(1, 3);
    });

    userService.getFee().subscribe(fee => {
      this.fee = fee;
    });
   }

  ngOnInit(): void {
  }

  numberWithCommas(x) : string {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

}
