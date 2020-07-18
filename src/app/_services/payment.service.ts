import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { PaymentMethodItem } from '../_models/paymentMethod.model';
import { PaymentStatisticItem } from '../_models/paymentStatistic.model';
import { PaymentItem } from '../_models/payment.model';


@Injectable({ providedIn: 'root' })
export class PaymentService {
    constructor(private http: HttpClient) { }

    getAllPaymentMethods() : Observable<PaymentMethodItem[]> {
        return this.http.get<PaymentMethodItem[]>(`${environment.apiUrl}/payment/methods/getAll`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            },
            withCredentials : true
        }).pipe(map(result => {
            sessionStorage.setItem("paymentMethods", JSON.stringify(result))
            return result;
        }));
    }

    getAllPayments(limit? : number, offset? : number) : Observable<PaymentItem[]> {
        let urlParams = new HttpParams()
        urlParams.append("timestamp", new Date().getTime().toString());
        urlParams.append("recvWindow", '1000');
        if(limit != null){ 
            urlParams.append("limit", limit.toString());
        }
        if(offset != null) {
            urlParams.append("offset", offset.toString());
        }

        return this.http.get<PaymentItem[]>(`${environment.apiUrl}/payment/getAll`, {
            params : urlParams,
            withCredentials : true
        });
    }

    getPaymentMethodById(methodId : string) : Observable<PaymentMethodItem> {
        return this.http.get<PaymentMethodItem>(`${environment.apiUrl}/payment/methods/get`, {
            params : {
                methodId : methodId,
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            }
        });
    }

    getDefault() : Observable<PaymentMethodItem> {
        return this.http.get<PaymentMethodItem>(`${environment.apiUrl}/payment/methods/getDefault`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            },
            withCredentials : true
        }).pipe(map(result => {
            sessionStorage.setItem("defaultPaymentMethod", JSON.stringify(result))
            return result;
        }));;
    }

    addPaymentMethod(method: PaymentMethodItem) : Observable<PaymentMethodItem> {
        return this.http.post<PaymentMethodItem>(`${environment.apiUrl}/payment/methods/create`, JSON.stringify(method), 
        {
            params: {
                timestamp: new Date().getTime().toString(),
                recvWindow: '500'
            },
            withCredentials : true,
            observe: "body"
        });
    }

    getPaymentSatistic() : Observable<PaymentStatisticItem> {
        return this.http.get<PaymentStatisticItem>(`${environment.apiUrl}/payment/statistic`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            },
            withCredentials : true
        });
    }

    setDefaultPaymentMethod(id : string) : Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/payment/methods/setDefault`, "",
        {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000',  
                methodId : id       
            },
            withCredentials : true
        });
    }

    deletePaymentMethod(id : string) : Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/payment/methods/delete`,
        {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000',  
                id : id       
            },
            withCredentials : true
        });
    }

    createPayment(id : string) : Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/payment/create`, "",
        {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000',  
                auctionId : id       
            },
            withCredentials : true
        });
    }
}