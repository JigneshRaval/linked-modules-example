// REF : https://www.themarketingtechnologist.co/building-nested-components-in-angular-2/

import { Component } from '@angular/core';

@Component({
    selector: 'parent-component-1',
    template: `
    <div style="padding: 1em; border: 1px solid red;">
        <h1>I'm a container component ( Parent Component )</h1>
        <child-component-1 [title]="inputValue" (notify)="onNotify($event)"></child-component-1>
    </div>
    `
})
export class ParentComponent {
    inputValue = " Hi from parent component ";

    onNotify(message:string): void {
        alert(message);
    }
}