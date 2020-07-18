import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler,HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { catchError, take, pairwise } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, RoutesRecognized } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutingState } from './routing.state';

@Injectable({ providedIn: 'root' })
export class RefreshTokenInterceptor implements HttpInterceptor {

    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

  constructor(public auth: AuthenticationService,
     private router: Router,
     private routingState: RoutingState, 
     private snackBar : MatSnackBar) {
     }

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        <any>catchError((error : any) => {    
            if (request.url.includes("refresh") || request.url.includes("token")) {
                if (request.url.includes("refresh")) {
                    this.auth.logout();
                }
                return throwError(error);
            }

            if (error.status == 404) {
                this.router.navigate(['/404']); 
                return throwError(error);
            }
            if (error.status == 466) {
                console.log("retry...");
                return timer(1200).pipe(
                    switchMap( 
                        () => next.handle(request.clone({
                            params: request.params.set("timestamp", new Date().getTime().toString())
                        })))
                  )
            }

            if (error.status == 401) {
                if (this.refreshTokenInProgress) {
                    return this.refreshTokenSubject.pipe(
                        filter(result => result !== null),
                        take(1),
                        switchMap(() => next.handle(this.addAuthenticationToken(request)))
                    );             
                } 
                else {
                    this.refreshTokenInProgress = true;
                    this.refreshTokenSubject.next(null);
        
                    // Call auth.refreshAccessToken(this is an Observable that will be returned)
                    return this.auth
                        .refreshToken().pipe(
                            switchMap((token: any) => {
                                this.refreshTokenInProgress = false;
                                this.refreshTokenSubject.next(token);
            
                                return next.handle(this.addAuthenticationToken(request));
                            }),
                            catchError((err: HttpErrorResponse) => {
                                if((err.status === 401 || err.status === 404) && this.refreshTokenInProgress) {
                                    console.log("refresh failed");
                                    
                                    this.refreshTokenInProgress = false;
                                    this.auth.logout();
                                    console.log("prev url : " + this.routingState.getPreviousUrl());
                                    
                                    this.router.navigate(['/sign/in'], { queryParams: { returnUrl: this.routingState.getPreviousUrl() }});
            
                                    return throwError(error);
                                }
                            })
                        );
                }
            }
            else {
                console.log(error);
                // this.snackBar.open('Message', 'CLOSE', {
                //     duration: 2000
                // });
            }
                
            return throwError(error);
        }));
    }

    addAuthenticationToken(request) {

        // If access token is null this means that user is not logged in
        // And we return the original request
        if (!this.auth.isAuthtorized) {
            return request;
        }

        // We clone the request, because the original request is immutable
        return request.clone();
    }
}