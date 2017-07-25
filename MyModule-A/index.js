/**
 * @license
 * Copyright Noémi Salaün All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/noemi-salaun/ng-logger/blob/master/LICENSE
 */
/**
 * Created by Noémi Salaün on 17/09/2016.
 */
// *.d.ts files will generate when we run "npm run ngc" command and "declaration": true in tsconfig.json file
export { MyMainModule } from './src/index';
export { MyComponent } from './src/mycomponent.component';
// Growl Notification
export * from './src/growl-notifications';
// Component Inheritance and Component swapping
export * from './src/component-inheritance-and-swapping';
// Directive Examples
export { HighlightDirective } from './src/directives/example-1/highlight.directive';
// Data Passing from Parent to child and Child to Parent
export { ParentComponent } from './src/data-passing-1/parent.component';
export { ChildComponent } from './src/data-passing-1/child.component';
// Data Passing from Parent to child to Grand child
export { CounterParentComponent } from './src/data-passing-2/counter-parent.component';
export { CounterChildComponent } from './src/data-passing-2/counter-child.component';
export { GrandChildComponent } from './src/data-passing-2/counter-grandchild.component';
export { DynamicComponent3Service } from './src/dynamic-component3/dynamic-comp3.service';
export { DynamicComponent3 } from './src/dynamic-component3/dynamic-comp3.component';
// Dynamic Component 4 example
export { DynamicComp4Main } from './src/dynamic-component-4/dynamic-comp4-main.component';
export { DynamicComp4Alert } from './src/dynamic-component-4/dynamic-comp4.component';
// Dynamic Component 4 example
export { ComponentCommunicationMain } from './src/component-communication/main';
export { ComponentCommunicationSharedService } from './src/component-communication/shared.service';
export { Sibling1Component } from './src/component-communication/sibling1.component';
export { Sibling2Component } from './src/component-communication/sibling2.component';
//# sourceMappingURL=index.js.map