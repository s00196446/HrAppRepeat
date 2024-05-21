import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employeeData, { headers: this.getHeaders() });
  }

  editEmployee(id: string, employeeData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employeeData, { headers: this.getHeaders() });
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
  }
}
