import { formatDate } from '@angular/common';
import * as moment from 'moment';

export class PaymentMethodItem {
    id : string;
    cardNumber: string;
    cardHolder: string;
    expiration: number;

    constructor(cardNumber, cardHolder, expiration : string) {

        let split = expiration.split('/');
        let myDate = `20${split[1]}-${split[0]}-01T00:00:00`;

        let date = moment(myDate);

        console.log(date);
        console.log(myDate);
        console.log("unix " + date.unix())
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.expiration = date.unix();
    }
}