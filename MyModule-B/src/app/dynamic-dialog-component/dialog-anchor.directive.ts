import { Directive, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

import { DialogComponent } from './dialog.component';

@Directive({
    selector: '[dialogAnchor]'
})
export class DialogAnchorDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        console.log("viewContainer :", viewContainer);
        console.log("componentFactoryResolver :", componentFactoryResolver);
     }

    createDialog(dialogComponent: { new (): DialogComponent }): ComponentRef<DialogComponent> {
        this.viewContainer.clear();

        let dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
        let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);

        dialogComponentRef.instance.close.subscribe(() => {
            dialogComponentRef.destroy();
        });

        return dialogComponentRef;
    }
}
