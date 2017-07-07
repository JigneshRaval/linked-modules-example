// REF : https://coryrylan.com/blog/angular-component-inheritance-and-template-swapping

// Base Component
// employee-list.component.ts and employee-table.component.ts will extend our base employee class
// Here we are not using any template
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from './employee.interface';

@Component({
    selector: 'app-base-employee',
    template: ''
})
export class BaseEmployeeComponent {
    @Input() employees: Employee[] = [];

    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    heading = 'Employee';

    selectEmployeeBaseEvent(employee: Employee) {
        console.log("Select employee Base Event.")
        this.select.emit(employee);
    }

}

