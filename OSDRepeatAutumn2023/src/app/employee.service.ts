import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employeeData);
  }

  editEmployee(employeeId: string, employeeData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${employeeId}`, employeeData);
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${employeeId}`);
  }
}
