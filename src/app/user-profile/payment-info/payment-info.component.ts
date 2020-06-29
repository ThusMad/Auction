import { Component, OnInit } from '@angular/core';
import { Url } from 'url';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { PaymentMethodItem } from 'src/app/_models/paymentMethod.model';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.sass']
})
export class PaymentInfoComponent implements OnInit {

  creditCards : {
    isDefault,
    card,
  }[] = [];

  customOptions: OwlOptions = {
    loop: false,
    autoplay: false,
    center: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 3,
      }
    },
    nav: false
  }

  constructor(public dialog: MatDialog, private paymentService : PaymentService) { 
    this.paymentService.getAllPaymentMethods().subscribe((result : PaymentMethodItem[]) => {
      console.log(result);
      
      result.forEach(item => {
        this.creditCards.push( {
          isDefault : false,
          card : item
        });
      })

      if(result.length != 0) {
        this.paymentService.getDefault().subscribe(defaultMethod => {
          this.creditCards.find(item => item.card.id == defaultMethod.id).isDefault = true;
        })
      }

    })
  }

  async ngOnInit() {
    
  }

  cardDialog() : void {
    let dialogRef = this.dialog.open(CardDialogComponent, {
      height: '600px',
      width: '500px',
      panelClass: 'my-panel'
    });

    dialogRef.afterClosed().subscribe((result : PaymentMethodItem) => {
      if (result != null) {
        this.creditCards.push( {
          isDefault : false,
          card : result
        });
      }
    });
  }
}
