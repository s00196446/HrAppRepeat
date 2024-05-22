import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ExternalApiService } from '../external-api-service';
import { ToastrService } from 'ngx-toastr';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  randomUsers: any[] = [];
  selectedEmployee: any = {};
  isAdmin: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private externalApiService: ExternalApiService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadRandomUsers()
    this.isAdmin = this.authService.getUserRoleSync() === 'admin';
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
          this.loadEmployees();
        },
        (error) => {
          console.error('Error deleting employee', error);
          this.toastr.error('Failed to delete employee');
        }
      );
    }
  }

  openEditModal(employee: any): void {
    this.selectedEmployee = { ...employee};
    const dialogRef = this.dialog.open(EditEmployeeModalComponent, {
      width: '400px',
      data: { employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    })

  }
}