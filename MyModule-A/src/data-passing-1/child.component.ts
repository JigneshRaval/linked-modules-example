import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'child-component-1',
    template: `
        <h2>{{title}}</h2>
        <span (click)="onclick()">Event</span>
    `
})
export class ChildComponent {
    @Input() title: string;

    @Output() notify: EventEmitter<string> = new EventEmitter();

    onclick() {
        this.notify.emit('Click from nested Child component.');
    }
}