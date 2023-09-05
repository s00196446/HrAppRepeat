import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent {
  employeeData: any = {
    firstName: '',
    lastName: '',
    email: '',
    hours: 0,
  };

  constructor(private employeeService: EmployeeService) {}

  createEmployee() {
    this.employeeService.createEmployee(this.employeeData).subscribe(
      (response) => {
        // Handle success, e.g., show a success message
        console.log('Employee created:', response);
      },
      (error) => {
        // Handle error, e.g., show an error message
        console.error('Error creating employee:', error);
      }
    );
  }
}
