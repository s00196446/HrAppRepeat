import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../employee.service';
import { of, throwError } from 'rxjs';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(() => {
    const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployees']);

    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      providers: [{ provide: EmployeeService, useValue: employeeServiceSpy }],
    });

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employees on initialization', () => {
    const mockEmployees = [
      { id: 1, name: 'Employee 1' },
      { id: 2, name: 'Employee 2' },
    ];

    employeeService.getEmployees.and.returnValue(of(mockEmployees));

    fixture.detectChanges();

    expect(component.employees).toEqual(mockEmployees);
  });

  it('should handle error when fetching employees', () => {
    const errorMessage = 'An error occurred while fetching employees';

    employeeService.getEmployees.and.returnValue(throwError(errorMessage));

    fixture.detectChanges();
  });
});
