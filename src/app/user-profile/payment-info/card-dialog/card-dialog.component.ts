import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from 'src/app/_services/payment.service';
import { PaymentMethodItem } from 'src/app/_models/paymentMethod.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.sass']
})
export class CardDialogComponent implements OnInit {

  submitted : boolean = false;

  cardnumber: string;
  cardholder: string = "";
  expirationDate: string;
  securityCode: string = "";

  flipped : boolean;
  isLoaded: boolean = false;
  view: boolean = false;
  logoBase: string = "../../../../assets/icons/payment/"
  bankLogo: any;
  constructor(public dialogRef: MatDialogRef<CardDialogComponent>, private paymentService : PaymentService) { 
    this.bankLogo = this.logoBase + "visa.svg";
    this.flipped = false;
  }

  submit() {
    this.submitted = true;

    this.dialogRef.disableClose = true;

    this.paymentService.addPaymentMethod(new PaymentMethodItem(this.cardnumber.replace(/ /g,"") , this.cardholder, this.expirationDate))
    .subscribe(
      (card : PaymentMethodItem) => {
        console.log(card);
        this.dialogRef.close(card);
      },
      error => {
        this.dialogRef.disableClose = false;
      }
    )
  }

  public card_mask = [/\d/, /\d/, /\d/, /\d/, ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', /\d/, /\d/, /\d/, /\d/]
  public expiration_mask = [/\d/, /\d/, '/', /\d/, /\d/]
  ngOnInit() : void {
    (async () => { 
      console.log(this.isLoaded)

      await this.delay(1000);
      this.isLoaded = true;

      console.log(this.isLoaded)
  })();
  }

  flipIt() : void {
    console.log("flip");
    this.flipped = !this.flipped;
  }

  flipFocus() : void {
    if(!this.flipped) {
      this.flipped = !this.flipped;
    }
  }

  flipLostFocus() {
    if(this.flipped) {
      this.flipped = !this.flipped;
    }
  }

  inputCard(event : any) {
    this.cardnumber = event.target.value;
  }
  
  inputCardholder(event : any) {
    this.cardholder = event.target.value;
  }

  inputExpiration(event : any) {
    this.expirationDate = event.target.value;
  }

  inputSecurityCode(event : any) {
    var value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    this.securityCode = value;
    //console.log(this.securityCode);
  }

  changeView() : void {
    this.view = !this.view;
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  onSearchChange(searchValue: any): void {  
    var input = searchValue.target.value.replace(/_/g, "").replace(/ /g,'')
    var card = this.GetCardType(input);
    console.log(card);

    if(card === "") {
      this.bankLogo = this.logoBase + "visa.svg";
      return;
    }
    if(card === "Visa") {
      this.bankLogo = this.logoBase + "visa.svg";
      return;
    }
    if(card === "JСB") {
      this.bankLogo = this.logoBase + "jcb.svg";
      return;
    }
    if(card.includes("Diners")) {
      this.bankLogo = this.logoBase + "diners.svg";
      return;
    }
    if(card === "AMEX") {
      this.bankLogo = this.logoBase + "amex.svg";
      return;
    }
    if(card === "Mastercard") {
      this.bankLogo = this.logoBase + "mastercard.svg";
      return;
    }
  }

  GetCardType(number)
  {
      // visa
      var re = new RegExp("^4");
      if (number.match(re) != null)
          return "Visa";

      // Mastercard 
      // Updated for Mastercard 2017 BINs expansion
      if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
          return "Mastercard";

      // AMEX
      re = new RegExp("^3[47]");
      if (number.match(re) != null)
          return "AMEX";

      // Discover
      re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
      if (number.match(re) != null)
          return "Discover";

      // Diners
      re = new RegExp("^36");
      if (number.match(re) != null)
          return "Diners";

      // Diners - Carte Blanche
      re = new RegExp("^30[0-5]");
      if (number.match(re) != null)
          return "Diners - Carte Blanche";

      // JCB
      re = new RegExp("^35(2[89]|[3-8][0-9])");
      if (number.match(re) != null)
          return "JCB";

      // Visa Electron
      re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
      if (number.match(re) != null)
          return "Visa Electron";

      return "";
  }

}
