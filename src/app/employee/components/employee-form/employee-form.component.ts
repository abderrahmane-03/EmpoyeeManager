import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // Add ReactiveFormsModule and related classes

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Replace FormsModule with ReactiveFormsModule
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup; // Use non-null assertion
  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    hireDate: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private fb: FormBuilder // Inject FormBuilder for reactive forms
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      const existingEmployee = this.employeeService.getEmployees().find(e => e.id === +id);
      if (existingEmployee) {
        this.employee = { ...existingEmployee };
      }
    }

    // Initialize the form
    this.employeeForm = this.fb.group({
      name: [this.employee.name, [Validators.required]],
      email: [this.employee.email, [Validators.required, Validators.email]],
      hireDate: [this.employee.hireDate, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      if (this.employee.id) {
        // Update existing employee
        this.employeeService.updateEmployee({ ...employeeData, id: this.employee.id });
      } else {
        // Add new employee
        const newEmployee = { ...employeeData, id: Date.now() }; // Generate unique ID for new employee
        this.employeeService.addEmployee(newEmployee);
      }
      this.router.navigate(['/employees']);
    }
  }
}
