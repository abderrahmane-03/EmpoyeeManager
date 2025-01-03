import { Injectable } from '@angular/core';

export interface Employee{
  id: number;
  name: string;
  email: string;
  hireDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly  storageKey = "employees";

  getEmployees():Employee[]{
    const employees = localStorage.getItem(this.storageKey);
    return employees ? JSON.parse(employees) : [];
  }

  addEmployee(employee: Employee):void{
    const employees = this.getEmployees();
    employees.push(employee);
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

  updateEmployee(updatedEmployee: Employee): void{
    const employees = this.getEmployees();
    const index = employees.findIndex((e=>e.id===updatedEmployee.id));
    if(index!==-1){
      employees[index] = updatedEmployee;
      localStorage.setItem(this.storageKey, JSON.stringify(employees));
    }
  }

  deleteEmployee(id: number): void{
    const employees = this.getEmployees().filter(e=>e.id!==id);
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

 }
