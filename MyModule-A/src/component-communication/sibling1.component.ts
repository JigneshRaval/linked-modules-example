// Exampel taken from :
// Plnkr : https://embed.plnkr.co/P8xCEwSKgcOg07pwDrlO/ [ https://github.com/angular/angular.io/issues/2663 ]

import { Component, Input, OnInit, OnChanges } from '@angular/core';
//import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ComponentCommunicationSharedService } from './shared.service';

@Component({
    //moduleId: module.id,
    selector: 'sibling1-component',
    template: `
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">Sibling 1</div>
            <div class="panel-body">
                <div *ngIf="searchCaseNumber">Searching for: {{searchCaseNumber}}</div>
                <!--
                <form [formGroup]="sibling1Form" class="form-inline" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                    <label for="caseNumber">Case Number:</label>
                    <input type="text" class="form-control" id="caseNumber" formControlName="caseNumber" placeholder="Case Number">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
                -->
                <input type="text" class="form-control" id="caseNumber" [value]="searchCaseNumber" (input)="onInputValueChange($event)" > {{searchCaseNumber}}

            </div>
        </div>
    `
})
export class Sibling1Component implements OnChanges {

    searchCaseNumber: any = '';
    constructor(private _sharedService: ComponentCommunicationSharedService) {
        // watch for data changes in both the components
        this._sharedService.caseNumber$.subscribe(data => {
            console.log('Sibling1 Component-received data from sibling2: ' + data);
            this.searchCaseNumber = data;
        });

    }

    ngOnChanges() {
        // Not required. can remove
    }

    onInputValueChange(event: any) {
        // function which will run on input value change
        this._sharedService.publishData(event.target.value);
    }

    /*
    // Implemetation on Form submit ( requires @angular/forms )
    sibling1Form: FormGroup;
    searchCaseNumber: any = '';
    constructor(private fb: FormBuilder, private _sharedService: ComponentCommunicationSharedService) {
        this.createForm();
        this._sharedService.caseNumber$.subscribe(
            data => {
                console.log('Sibling1Component-received from sibling2: ' + data);
                this.searchCaseNumber = data;
                this.sibling1Form.patchValue({
                    caseNumber: data
                });
            });
    }

    createForm() {
        this.sibling1Form = this.fb.group({
            caseNumber: ''
        });
    }

    ngOnChanges() {
        //this.sibling2Form.get('caseNumber').value=this._sharedService.subscribeData();
        // this.searchCaseNumber = this._sharedService.subscribeData();
        //console.log('Sibling1Component-received from sibling2: ' + this.searchCaseNumber);
    }

    onSubmit(): void {
        // console.log('Sibling1Component-received from sibling2: ' + this._sharedService.subscribeData());
        console.log('Form submitted-sibling1Form');
        let caseNumber = this.sibling1Form.get('caseNumber').value;
        this.searchCaseNumber = caseNumber;
        this._sharedService.publishData(caseNumber);
    }
*/

}