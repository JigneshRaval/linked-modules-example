// DEMO : https://plnkr.co/edit/VSctCwNMctHIp4WuHLBy?p=preview
// https://netbasal.com/dynamically-creating-components-with-angular-a7346f4a982d

import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'dynamic-comp4-alert',
    template: `
        <h1 (click)="output1.next()">Alert {{type}}</h1>
        <p *ngFor="let content of contents">{{ content.title }}</p>
    `
})
export class DynamicComp4Alert {
    @Input() type: string = "success";

    @Output() output1: EventEmitter<any> = new EventEmitter();

}
