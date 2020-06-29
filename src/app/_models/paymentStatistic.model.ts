import { formatDate } from '@angular/common';
import * as moment from 'moment';

export class PaymentStatisticItem {
    awaiting : number;
    completed: number;
    canceled: number;
    inProgress: number;
}