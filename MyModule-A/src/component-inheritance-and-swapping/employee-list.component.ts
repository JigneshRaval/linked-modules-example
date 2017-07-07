import { Component } from '@angular/core';
import { BaseEmployeeComponent } from './base-employee.component';

@Component({
    selector: 'app-employee-list',
    template: `
        <h1>{{heading}}</h1>
        <ul>
            <li *ngFor="let employee of employees">
                {{employee.firstName}} {{employee.lastName}} <br/>
                {{employee.email}} <br/>
                <button (click)="selectEmployeeBaseEvent(employee)">Select Employee</button>
            </li>
        </ul>
    `
})
export class EmployeeListComponent extends BaseEmployeeComponent {
    heading = "Employee List";
}