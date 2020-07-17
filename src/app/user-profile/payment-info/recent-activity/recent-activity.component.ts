import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/_services/balance.service';
import { BalanceTransactionItem } from 'src/app/_models/balanceTransaction.model';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.sass']
})
export class RecentActivityComponent implements OnInit {

  constructor(private balanceService : BalanceService) { }
  
  isLoading : boolean = false;
  transactions : BalanceTransactionItem[];
  ngOnInit(): void {
    this.balanceService.getTransactions().subscribe(items => {
      this.transactions = items;
      console.log(this.transactions);
      
      this.isLoading = true;
    })
  }

}
