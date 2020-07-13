import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuctionItem } from '../_models/auctionItem.model';
import { map, switchMap } from 'rxjs/operators';
import { UploadService } from './upload.service';
import { templateJitUrl } from '@angular/compiler';
import { Observable, Subject } from 'rxjs';
import { Bid } from '../_models/bid.model';
import { webSocket } from 'rxjs/webSocket'
import { WebSocketService } from './webSocket.service';
import { User } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class AuctionService {
    constructor(private http: HttpClient, private uploadService : UploadService) { 

    }

    getAll(limit: number, offset : number) : Observable<AuctionItem[]> {
        return this.http.get<AuctionItem[]>(`${environment.apiUrl}/auction/getAll`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '500',
                limit : limit.toString(),
                offset: offset.toString()
            }
        });
    }

    getAllWithFilter(limit: number, offset : number, filter : string) : Observable<AuctionItem[]> {
        return this.http.get<AuctionItem[]>(`${environment.apiUrl}/auction/getAll`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '500',
                filters : filter,
                limit : limit.toString(),
                offset: offset.toString()
            }
        });
    }

    getMyAuctions() : Observable<AuctionItem[]> {
        return this.http.get<AuctionItem[]>(`${environment.apiUrl}/auction/my`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            },
            withCredentials : true
        }).pipe(map(result => {
            return result;
        }));
    }

    getUserAuctions(userId : string) : Observable<AuctionItem[]> {
        return this.http.get<AuctionItem[]>(`${environment.apiUrl}/auction/getAll`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000',
                filters : `userId=${userId}`
            },
            withCredentials : true
        }).pipe(map(result => {
            return result;
        }));
    }

    get(auctionId : string) : Observable<AuctionItem> {
        return this.http.get<AuctionItem>(`${environment.apiUrl}/auction`, {
            params : {
                id : auctionId,
                timestamp : new Date().getTime().toString(),
                recvWindow : '500'
            },
            observe : "body"
        }).pipe(
            map(auction => {
               var watchList : AuctionItem[] = [];
               if(localStorage.getItem("watchedCache") == undefined) {
                    localStorage.setItem('watchedCache', JSON.stringify(watchList));
               }

               var viewedAuctions = JSON.parse(localStorage.getItem("watchedCache")) as AuctionItem[];

               if(viewedAuctions.find(item => item.id == auction.id) == null) {
                    viewedAuctions.unshift(auction)
                    localStorage.setItem('watchedCache', JSON.stringify(viewedAuctions));
               }

               return auction; 
            })
        );
    }

    getCurrentPrice(auctionId : string) : Observable<number> {
        return this.http.get<number>(`${environment.apiUrl}/auction/currentPrice`, {
            params : {
                auctionId : auctionId,
                timestamp : new Date().getTime().toString(),
                recvWindow : '500'
            },
            observe : "body"
        })
    }

    getBids(auctionId : string, limit: number, offset : number) : Observable<Bid[]> {
        return this.http.get<Bid[]>(`${environment.apiUrl}/auction/getAllBids`, {
            params : {
                id : auctionId,
                limit : limit.toString(),
                offset: offset.toString(),
                timestamp : new Date().getTime().toString(),
                recvWindow : '3000'
            },
            observe : "body"
        })
    }

    placeBid(auctionId : string, bid : number) : Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/auction/bid`, {
            params : {
                auctionId : auctionId,
                price: bid.toString(),
                timestamp : new Date().getTime().toString(),
                recvWindow : "1000"
            },
            withCredentials : true
        })
    }

    getParticipants(auctionId : string) : Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/auction/getParticipants`, {
            params : {
                auctionId : auctionId,
                timestamp : new Date().getTime().toString(),
                recvWindow : "1000"
            }
        })
    }

    public create(item : AuctionItem, images : FormData) : Observable<AuctionItem> {
        return this.uploadService.upload(images).pipe(
            switchMap(data => {
                item.images = data;
        
                return this.http.post<AuctionItem>(`${environment.apiUrl}/auction/create`, JSON.stringify(item), 
                {
                    params: {
                        timestamp: new Date().getTime().toString(),
                        recvWindow: '500'
                    },
                    withCredentials : true
                }).pipe(map(result => {
                    return result;
                }));
            })
        )
    }

    delete(id : number) {

    }

}