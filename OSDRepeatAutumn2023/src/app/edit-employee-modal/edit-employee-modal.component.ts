import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.css']
})
export class EditEmployeeModalComponent {
  employee: any;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {
    this.employee = { ...data.employee };
  }

  save(): void {
    this.employeeService.editEmployee(this.employee._id, this.employee).subscribe(
      () => {
        this.toastr.success('Employee updated successfully');
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error updating employee', error);
        this.toastr.error('Failed to update employee');
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
