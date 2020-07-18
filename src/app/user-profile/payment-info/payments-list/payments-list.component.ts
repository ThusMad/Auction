import { Component, OnInit, PipeTransform } from '@angular/core';
import { PaymentService } from 'src/app/_services/payment.service';
import { PaymentItem, PaymentStatus, PaymentType }  from 'src/app/_models/payment.model';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.sass']
})
export class PaymentsListComponent implements OnInit {

  constructor(private paymentServise : PaymentService) { }

  dataSource = new MatTableDataSource();
  letType = PaymentType;
  columnsToDisplay = ['id', 'amount', 'description', 'paymentType'];
  ngOnInit(): void {

    this.paymentServise.getAllPayments().subscribe(items => {
      this.dataSource = new MatTableDataSource(items);
     
      console.log(items);
    });
  }

  public getIndexValue(id) {
    var item = this.dataSource.data.find((a : PaymentItem) => a.id == id)
    return this.dataSource.data.indexOf(item) + 1;
  }
}
