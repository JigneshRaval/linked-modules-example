import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEmployeeComponent } from './base-employee.component';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeTableComponent } from './employee-table.component';
import { MainEmployeeComponent } from './main.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MainEmployeeComponent,
        BaseEmployeeComponent,
        EmployeeListComponent,
        EmployeeTableComponent
    ],
    exports: [
        MainEmployeeComponent,
        BaseEmployeeComponent,
        EmployeeListComponent,
        EmployeeTableComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SwappingModuleDemo {
    /*public static logAndLoadModule(message) {
        console.log('I first log and then give you my module');
        return {
            ngModule: SwappingModuleDemo
        }
    }
    public static alertAndLoadModule(message) {
        alert('I first alert and then give you my module');
        return {
            ngModule: SwappingModuleDemo
        }
    }*/
}