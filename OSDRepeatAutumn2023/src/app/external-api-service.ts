import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {
  private apiUrl = 'https://randomuser.me/api';

  constructor(private http: HttpClient) { }

  getRandomUsers(results: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?results=${results}`);
  }
}
