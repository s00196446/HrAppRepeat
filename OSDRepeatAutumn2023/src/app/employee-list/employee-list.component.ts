import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ExternalApiService } from '../external-api-service';
import { ToastrService } from 'ngx-toastr';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  randomUsers: any[] = [];
  selectedEmployee: any = {};

  constructor(
    private employeeService: EmployeeService,
    private externalApiService: ExternalApiService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadRandomUsers();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
        this.toastr.error('Failed to load employees');
      }
    );
  }

  loadRandomUsers(): void {
    this.externalApiService.getRandomUsers().subscribe(
      (data: any) => {
        this.randomUsers = data.results;
      },
      (error: any) => {
        console.error('Error fetching random users', error);
        this.toastr.error('Failed to load random users');
      }
    );
  }
  
  

  deleteEmployee(employeeId: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          this.toastr.success('Employee deleted successfully');
          this.loadEmployees(); // Reload employees after deletion
        },
        (error) => {
          console.error('Error deleting employee', error);
          this.toastr.error('Failed to delete employee');
        }
      );
    }
  }

  openEditModal(employee: any): void {
    const dialogRef = this.dialog.open(EditEmployeeModalComponent, {
      width: '400px',
      data: { employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees(); // Reload employees after edit
      }
    });
  }

  editEmployee(): void {
    this.employeeService.editEmployee(this.selectedEmployee._id, this.selectedEmployee).subscribe(
      () => {
        this.toastr.success('Employee updated successfully');
        // Implement modal closing logic with Angular Material dialog
        this.loadEmployees(); // Reload employees after edit
      },
      (error) => {
        console.error('Error updating employee', error);
        this.toastr.error('Failed to update employee');
      }
    );
  }
}
