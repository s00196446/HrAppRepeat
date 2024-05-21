// src/app/employee-create/employee-create.component.ts
import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  employee = {
    firstName: '',
    lastName: '',
    email: '',
    hours: 0
  };

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  createEmployee(): void {
    this.employeeService.createEmployee(this.employee).subscribe(
      () => {
        this.toastr.success('Employee created successfully');
        this.resetForm();
      },
      (error) => {
        console.error('Error creating employee', error);
        this.toastr.error('Failed to create employee');
      }
    );
  }

  resetForm(): void {
    this.employee = {
      firstName: '',
      lastName: '',
      email: '',
      hours: 0
    };
  }
}
