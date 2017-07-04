import { ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { DialogComponent } from './dialog.component';
export declare class DialogAnchorDirective {
    private viewContainer;
    private componentFactoryResolver;
    constructor(viewContainer: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver);
    createDialog(dialogComponent: {
        new (): DialogComponent;
    }): ComponentRef<DialogComponent>;
}
