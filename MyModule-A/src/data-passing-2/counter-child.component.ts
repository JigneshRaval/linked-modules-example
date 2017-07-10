import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'counter-child-component',
    template: `
        <div style="padding: 1em; margin: 1em; border: 1px solid blue">
            <h3>Child Component</h3>
            <p>Counter Child Component {{count}}</p>
            <a href="javascript:void(0);" (click)="childOutput(count)">Click Here</a>

            <grand-child-component [count]="count" (myGrandChildEvent)="grandChildOutput($event)"></grand-child-component>
        </div>
    `
})
export class CounterChildComponent {
    @Input() count: number;

    @Output() myChildEvent: EventEmitter<any> = new EventEmitter<any>();

    childOutput() {
        this.count++;
        this.myChildEvent.emit(this.count);
    }

    grandChildOutput(count: number) {

        this.count = 15;
        this.myChildEvent.emit(this.count);

        console.log('Event fired from Grand Child');
    }

}