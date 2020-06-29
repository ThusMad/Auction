import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuctionItem } from '../_models/auctionItem.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

interface UploadResult {
    images : string[];
}

export const InterceptorSkipHeader = 'X-Skip-Header-Interceptor';

@Injectable({ providedIn: 'root' })
export class UploadService {

    constructor(private http: HttpClient) {
     }

     public upload(form : FormData) : Observable<string[]> {

        return this.http.post<string[]>(`${environment.apiUrl}/upload`, form, 
        { 
            params: {
                timestamp: new Date().getTime().toString(),
                recvWindow: '500'
            },
            headers: {
                'X-Skip-Header-Interceptor' : 'true' 
            },
            withCredentials : true
        });
    }

    public addProfilePicture(file : FormData) : Observable<string> {
        return this.http.post<string>(`${environment.apiUrl}/account/addProfilePicture`, file, 
        { 
            params: {
                timestamp: new Date().getTime().toString(),
                recvWindow: '500'
            },
            headers: {
                'X-Skip-Header-Interceptor' : 'true' 
            },
            withCredentials : true
        });
    }
}