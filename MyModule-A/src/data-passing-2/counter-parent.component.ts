// REF : https://toddmotto.com/component-events-event-emitter-output-angular-2
// REF : https://hahoangv.wordpress.com/2016/05/21/angular-2-essentials-component-with-inputs-and-outputs/

import { Component } from '@angular/core';

@Component({
    selector: 'counter-parent-component',
    template: `
    <div style="margin: 1em; padding: 1em; border: 1px solid red;">
        <h2>Parent Component 2</h2>
        <a href="javascript:void(0);" (click)="increment();">Increment Parent Count</a>
        <p><strong>My Count Parent :</strong> {{ myCount }}</p>
        <counter-child-component [count]="myCount" (myChildEvent)="parentEvent($event)"></counter-child-component>
    </div>
    `
})
export class CounterParentComponent {
    myCount: number = 10;

    parentEvent(count: number) {
        this.myCount = count;
        console.log("Parent Event executed by child.", this.myCount);
    }

    increment() {
        this.myCount++
    }
}