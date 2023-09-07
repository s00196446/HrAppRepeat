import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve employees', (done: DoneFn) => {
    service.getEmployees().subscribe((employees: any[]) => {
      expect(employees).toBeDefined();
      expect(employees.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should add a new employee', (done: DoneFn) => {
    const newEmployee = { firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
    service.createEmployee(newEmployee).subscribe(() => {
      service.getEmployees().subscribe((employees: any[]) => {
        const addedEmployee = employees.find((e) => e.email === 'john@example.com');
        expect(addedEmployee).toBeDefined();
        done();
      });
    });
  });
});