import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'grand-child-component',
    template: `
        <div style="padding: 1em; margin: 1em; border: 1px solid green">
            <h3>Grand Child Component {{count}}</h3>
            <a href="javascript:void(0);" (click)="grandChildEvent()">Grand child Click</a>
        </div>
    `
})
export class GrandChildComponent {
    @Input() count: number;

    @Output() myGrandChildEvent: EventEmitter<any> = new EventEmitter<any>();

    grandChildEvent() {
        this.myGrandChildEvent.emit();
    }
}
