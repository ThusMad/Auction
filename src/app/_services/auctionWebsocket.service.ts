import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { WebSocketService } from './webSocket.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuctionWebsocketService {
    public messages: Subject<any>  = new Subject<any>();

    constructor(private wsService: WebSocketService) {
        console.log('constructyor ws synop service')
    }

    public connect(auctionId) : Subject<any> {

        const sock = new WebSocket(`${environment.wssUrl}?timestamp=${new Date().getTime().toString()}&recvWindow=500&streamName=${auctionId}@1`);
        sock.onmessage = function(event) {
            console.log(event);
        }

        return <Subject<any>>this.wsService
            .connect(`${environment.wssUrl}?timestamp=${new Date().getTime().toString()}&recvWindow=500&streamName=${auctionId}@1`);
    }

    public close() {
        this.wsService.close()
    }
} // end class 