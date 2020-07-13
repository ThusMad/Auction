import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

export const InterceptorSkipHeader = 'X-Skip-Header-Interceptor';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({ 
        params: request.params.set('timestamp', new Date().getTime().toString()),
      });

      if (request.headers.has(InterceptorSkipHeader)) {
        const headers = request.headers.delete(InterceptorSkipHeader);
        console.log(request);
        return next.handle(request.clone({ headers }));
      }

      request = request.clone({ 
        headers: request.headers.set('Accept-Encoding-Type', 'gzip, deflate, br')
      });

      if(!request.headers.has('content-type')) {
          request = request.clone({ 
            headers: request.headers.set('Content-Type', 'application/json; charset=UTF-8')
          });
        }

      console.log(request)
      return next.handle(request);
    }
}