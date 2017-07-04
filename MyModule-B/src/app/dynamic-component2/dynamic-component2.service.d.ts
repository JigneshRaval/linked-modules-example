import { ComponentFactoryResolver } from '@angular/core';
export declare class DynamicComp2Service {
    private _componentFactoryResolver;
    rootViewContainer: any;
    constructor(_componentFactoryResolver: ComponentFactoryResolver);
    setRootViewContainerRef(viewContainerRef: any): void;
    addDynamicComponent(): void;
}
