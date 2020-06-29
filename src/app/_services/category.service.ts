import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private http: HttpClient) {
    }

    getAll() : Promise<Category[]> {
        return this.http.get<Category[]>(`${environment.apiUrl}/category/getAll`, {
            params : {
                timestamp : new Date().getTime().toString(),
                recvWindow : '500'
            }
        }).toPromise();
    }
}