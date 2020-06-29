import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, timestamp, pairwise } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    public isAuthtorized : boolean = false;

    returnUrl: string;

    constructor(private http: HttpClient, 
        private route: ActivatedRoute,
        private router: Router) {
        var authCache = sessionStorage.getItem('authtorized')
        this.isAuthtorized = JSON.parse(JSON.parse(authCache))

        if(this.isAuthtorized === null) {
            this.isAuthtorized = false;
        }
    }

    obtainToken(username: string, password: string) {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        let requestBody = {
            username: username,
            password: password
        }

        return this.http.post<any>(`${environment.apiUrl}/oauth/token`, JSON.stringify(requestBody), 
            {
                params: {
                    timestamp: new Date().getTime().toString(),
                    recvWindow: '500'
                },
                observe: "response",
                withCredentials: true
            })
            .pipe(map(response => {
                console.log(response);
                this.isAuthtorized = true;
                sessionStorage.setItem('authtorized', JSON.stringify(true));
                this.router.navigate([this.returnUrl]);
                return response;
            }));
    }

    refreshToken() : Observable<any> {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        return this.http.get<any>(`${environment.apiUrl}/oauth/refresh`, 
        {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            },
            withCredentials : true,
            observe : "response"
        })
        .pipe(map((response:any) => {
            console.log(response);
            this.isAuthtorized = true;
            sessionStorage.setItem('authtorized', JSON.stringify(true));
            this.router.navigate([this.returnUrl]);
            return response;
        }));
    }

    register(username: string, password: string, email : string) {
        let requestBody = {
            username: username,
            email: email,
            password: password
        }

        return this.http.post<any>(`${environment.apiUrl}/account/create`, JSON.stringify(requestBody), 
            {
                params: {
                    timestamp: new Date().getTime().toString(),
                    recvWindow: '500'
                }
            })
            .pipe(map(user => {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    loadFromLocalStorage() {
    }

    logout() {
        // remove user from local storage to log user out
        this.isAuthtorized = false;
        sessionStorage.setItem('authtorized', JSON.stringify(false));
        sessionStorage.removeItem('currentUser');
    }
}