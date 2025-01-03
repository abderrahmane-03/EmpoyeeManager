  import { Component, OnInit } from '@angular/core';
  import { EmployeeService, Employee } from '../../services/employee.service';
  import { CommonModule } from '@angular/common';
  import { RouterModule, Router } from '@angular/router'; // Import Router
  import { EmployeeCardComponent } from '../employee-card/employee-card.component';

  @Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [CommonModule, RouterModule, EmployeeCardComponent],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css',
  })
  export class EmployeeListComponent implements OnInit {
    employees: Employee[] = [];

    constructor(
      private employeeService: EmployeeService,
      private router: Router // Inject Router
    ) {}

    ngOnInit(): void {
      this.employees = this.employeeService.getEmployees();
    }

    // Méthode pour modifier un employé
    editEmployee(id: number): void {
      this.router.navigate(['/employees/edit', id]);
    }

    // Méthode pour supprimer un employé
    deleteEmployee(id: number): void {
      this.employeeService.deleteEmployee(id);
      this.employees = this.employeeService.getEmployees(); // Mettre à jour la liste
    }
  }
