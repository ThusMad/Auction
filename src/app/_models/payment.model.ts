import { formatDate } from '@angular/common';
import * as moment from 'moment';

export enum PaymentStatus
{
    Cancelled,
    Awaiting,
    Completed,
    Pending
}

export enum PaymentType
{
    Transfer,
    Subscription
}

export class PaymentItem {
    id : string;
    amount: number;
    creationTime: number;
    paymentTime: number;
    description: string;
    paymentStatus: PaymentStatus;
    paymentType: PaymentType;
    senderId: string;
    recipientId: string;
}