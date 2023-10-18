import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {
  apiURL = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string):Observable<any>{
    return this.http.post(this.apiURL+'/login/', {
      email, password
    })
    .pipe(retry(3));
  }
}
