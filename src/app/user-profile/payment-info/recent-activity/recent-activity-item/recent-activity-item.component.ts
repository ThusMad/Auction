import { Component, OnInit, Input } from '@angular/core';
import { BalanceTransactionItem } from 'src/app/_models/balanceTransaction.model';

@Component({
  selector: 'app-recent-activity-item',
  templateUrl: './recent-activity-item.component.html',
  styleUrls: ['./recent-activity-item.component.sass']
})
export class RecentActivityItemComponent implements OnInit {

  constructor() { }

  @Input() transaction: BalanceTransactionItem;

  ngOnInit(): void {
  }

}
