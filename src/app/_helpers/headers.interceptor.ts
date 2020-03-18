import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // request.headers.append('Content-Type', 'application/json')
        request = request.clone({ 
            headers: request.headers.set('Content-Type', 'application/json; charset=UTF-8')
          });
        request = request.clone({ 
            headers: request.headers.set('Accept-Encoding-Type', 'gzip, deflate, br')
          });
          
        console.log(request);
        return next.handle(request);
    }
}