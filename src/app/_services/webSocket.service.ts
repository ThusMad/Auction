import {Injectable} from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
    private subject: Subject<MessageEvent>;
    private subjectData: Subject<number>;
  private ws: any;
    public connect(url: string): Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
        }
        return this.subject;
    }

    private create(url: string): Subject<MessageEvent> {
        this.ws = new WebSocket(url);

        let observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                this.ws.onmessage = obs.next.bind(obs);
                this.ws.onerror   = obs.error.bind(obs);
                this.ws.onclose   = obs.complete.bind(obs);

                return this.ws.close.bind(this.ws);
            });

        let observer = {
            next: (data: Object) => {
                if (this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(JSON.stringify(data));
                }
            }
        };

        return Subject.create(observer, observable);
  }

  public close() {
    console.log('on closing WS');
    this.ws.close()
    this.subject = null
  }

} // end class WebSocketService