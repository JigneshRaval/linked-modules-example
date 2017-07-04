import { ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
export default class DynamicComponent {
    private resolver;
    currentComponent: any;
    dynamicComponentContainer: ViewContainerRef;
    componentData: {
        component: any;
        inputs: any;
    };
    constructor(resolver: ComponentFactoryResolver);
}
