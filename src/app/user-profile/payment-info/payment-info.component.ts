import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Url } from 'url';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { PaymentMethodItem } from 'src/app/_models/paymentMethod.model';
import { PaymentService } from 'src/app/_services/payment.service';
import { Subscription, fromEvent } from 'rxjs';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { take, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.sass']
})
export class PaymentInfoComponent implements OnInit {

  @ViewChild('cardMenu') cardMenu: TemplateRef<any>;

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

  sub: Subscription;
  overlayRef: OverlayRef | null;
  isCardLoading : boolean = true;
  isCardEmpty : boolean = true;

  constructor(public dialog: MatDialog, 
    private paymentService : PaymentService,  
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef) { 
    this.paymentService.getAllPaymentMethods().subscribe((result : PaymentMethodItem[]) => {
      this.isCardLoading = false;
      
      if(result.length > 0) {
        result.forEach(item => {
          this.creditCards.push( {
            isDefault : false,
            card : item
          });
        })

        this.paymentService.getDefault().subscribe(defaultMethod => {
          this.creditCards.find(item => item.card.id == defaultMethod.id).isDefault = true;
        })

        this.isCardEmpty = false;
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

  open({ x, y }: MouseEvent, card) {
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.cardMenu, this.viewContainerRef, {
      $implicit: card
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(event => {
        const clickTarget = event.target as HTMLElement;
        return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
      }),
      take(1)
    ).subscribe(() => this.close())

  }

  delete(card) {
    console.log("deleting card with id : " + card.card.id);
    
    this.close();
  }

  makeDefault(cardItem) {
    console.log("set as default card with id : " + cardItem.card.id);

    this.paymentService.setDefaultPaymentMethod(cardItem.card.id).subscribe(res => {
      this.creditCards.forEach(element => {
        element.isDefault = false;
      });

      this.creditCards.find(item => item == cardItem).isDefault = true;
    });

    this.close();
  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
