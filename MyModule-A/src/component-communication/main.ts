// Exampel taken from :
// Plnkr : https://embed.plnkr.co/P8xCEwSKgcOg07pwDrlO/ [ https://github.com/angular/angular.io/issues/2663 ]

import { Component } from '@angular/core'
import { ComponentCommunicationSharedService } from './shared.service';
import { Sibling1Component } from './sibling1.component';
import { Sibling2Component } from './sibling2.component';

@Component({
    selector: 'component-communication-main',
    template: `
    <div>
      <h2>Communication between component siblings via a service</h2>
      <a href="https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service" target="_blank">Reference</a>
    </div>

    <sibling1-component></sibling1-component><hr>
    <sibling2-component></sibling2-component>
  `,
    providers: [ComponentCommunicationSharedService]
})
export class ComponentCommunicationMain {

}
