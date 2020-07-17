import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/_services/balance.service';
import { UserService } from 'src/app/_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ReplenishDialogComponent } from '../dialogs/replenish-dialog/replenish-dialog.component';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.sass']
})
export class LimitsComponent implements OnInit {

  fundsInt : string;
  fundsDec : string;

  fee : number;

  constructor(
    private dialog: MatDialog,
    private balanceService : BalanceService, 
    private userService : UserService) {
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

  replenish() : void {
    let dialogRef = this.dialog.open(ReplenishDialogComponent, {
      height: '600px',
      width: '500px',
      panelClass: 'my-panel'
    });

    // dialogRef.afterClosed().subscribe((result : PaymentMethodItem) => {
    //   if (result != null) {
    //     this.creditCards.push( {
    //       isDefault : false,
    //       card : result
    //     });
    //   }
    // }); 
  }

}
