import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/account/getAll`);
    }

    getById(userId : string) : Promise<User> {
        return this.http.get<User>(`${environment.apiUrl}/account`, {
            params : {
                userId : userId,
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            }
        }).toPromise();
    }

    getFee() : Observable<number> {
        return this.http.get<number>(`${environment.apiUrl}/account/fee`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            },
            withCredentials : true
        });
    }

    getRole() : Observable<string> {
        return this.http.get<string>(`${environment.apiUrl}/account/role`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '1000'
            },
            withCredentials : true
        });
    }

    get(userId : string) : Observable<User> {
        if(userId != "") {
            return this.http.get<User>(`${environment.apiUrl}/account/preview`, {
                params : {
                    timestamp : new Date().getTime().toString(),
                    recvWindow : '1000',
                    userId : userId
                },
                withCredentials : true
            })
            .pipe(map(result => {
                return JSON.parse(JSON.parse(JSON.stringify(result)));
            }));
        }
        else {
            return this.http.get<User>(`${environment.apiUrl}/account`, {
                params : {
                    timestamp : new Date().getTime().toString(),
                    recvWindow : '1000'
                },
                withCredentials : true
            })
            .pipe(map(result => {
                sessionStorage.setItem('currentUser', JSON.stringify(result));
                return JSON.parse(JSON.parse(JSON.stringify(result)));
            }));
        }
    }
}