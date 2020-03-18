import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, timestamp } from 'rxjs/operators';

import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        let requestBody = {
            username: username,
            password: password
        }

        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, JSON.stringify(requestBody), 
            {
                params: {
                    timestamp: new Date().getTime().toString(),
                    recvWindow: '500'
                }
            })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user).replace("\\", ""));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}