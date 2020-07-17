import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { PaymentMethodItem } from '../_models/paymentMethod.model';
import { BalanceItem } from '../_models/balance.model';
import { BalanceTransactionItem } from '../_models/balanceTransaction.model';


@Injectable({ providedIn: 'root' })
export class BalanceService {
    constructor(private http: HttpClient) { }

    getMyBalance() : Observable<BalanceItem> {
        return this.http.get<BalanceItem>(`${environment.apiUrl}/balance`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            },
            withCredentials : true
        });
    }

    refillBalance(paymentMethodId : string, amount : number) : Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/balance/refill`, null, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000',
                methodId : paymentMethodId,
                amount : amount.toString()
            },
            withCredentials : true
        });
    }
    
    getTransactions(limit?, offset?) : Observable<BalanceTransactionItem[]> {
        let urlParams = new HttpParams()
        urlParams.append("timestamp", new Date().getTime().toString());
        urlParams.append("recvWindow", '1000');
        if(limit != null){ 
            urlParams.append("limit", limit);
        }
        if(offset != null) {
            urlParams.append("offset", offset);
        }

        return this.http.get<BalanceTransactionItem[]>(`${environment.apiUrl}/balance/transactions`, {
            params : urlParams,
            withCredentials : true
        });
    }

    // getPaymentMethodById(methodId : string) : Observable<PaymentMethodItem> {
    //     return this.http.get<PaymentMethodItem>(`${environment.apiUrl}/payment/methods/get`, {
    //         params : {
    //             methodId : methodId,
    //             timestamp : new Date().getTime().toString(),
    //             recvWindow : '1000'
    //         }
    //     });
    // }

    // getDefault() : Observable<PaymentMethodItem> {
    //     return this.http.get<PaymentMethodItem>(`${environment.apiUrl}/payment/methods/getDefault`, {
    //         params : {
    //             timestamp : new Date().getTime().toString(),
    //             recvWindow : '1000'
    //         },
    //         withCredentials : true
    //     });
    // }

    // addPaymentMethod(method: PaymentMethodItem) : Observable<PaymentMethodItem> {
    //     return this.http.post<PaymentMethodItem>(`${environment.apiUrl}/payment/methods/create`, JSON.stringify(method), 
    //     {
    //         params: {
    //             timestamp: new Date().getTime().toString(),
    //             recvWindow: '500'
    //         },
    //         withCredentials : true,
    //         observe: "body"
    //     });
    // }
}