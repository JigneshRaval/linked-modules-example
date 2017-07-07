import { Component } from '@angular/core';
import { Employee } from './employee.interface';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeTableComponent } from './employee-table.component';

const employees: Employee[] = [
    { id: 0, firstName: 'Luke', lastName: 'Skywalker', email: 'last_jedi@lukeskywalker.com' },
    { id: 1, firstName: 'Han', lastName: 'Solo', email: 'scoundrel@hansolo.com' },
    { id: 2, firstName: 'Leia', lastName: 'Organa', email: 'princess@leiaorgana.com' },
]

@Component({
    selector: 'app-main-employee',
    template: `
        <p>Selected Employee: <br> {{selectedEmployee.firstName}} {{selectedEmployee.lastName}}</p>

        <button (click)="displayTable = true">Show Table</button>
        <button (click)="displayTable = false">Show List</button>

        <app-employee-list [employees]="employees" (select)="selectEmp($event)" *ngIf="!displayTable"></app-employee-list>
        <app-employee-table [employees]="employees" (select)="selectEmp($event)" *ngIf="displayTable"></app-employee-table>
    `
})
export class MainEmployeeComponent {
    displayTable = true;
    employees = employees;
    selectedEmployee = employees[0];

    constructor() {

    }

    selectEmp(employee: Employee) {
        console.log("selectEmp function emitted.");
        this.selectedEmployee = employee;
    }
}