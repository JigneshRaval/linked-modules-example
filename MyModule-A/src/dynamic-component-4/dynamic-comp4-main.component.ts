import { Component, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { DynamicComp4Alert } from './dynamic-comp4.component';

@Component({
    selector: 'dynamic-comp4-main',
    template: `
        <ng-template #dynamicAlertContainer></ng-template>
        <button (click)="createComponent('success', [{'title': 'This is title 1'}, {'title': 'This is title 2'}])">Create success alert</button>
        <button (click)="createComponent('danger')">Create danger alert</button>
    `,
    entryComponents: [DynamicComp4Alert]
})
export class DynamicComp4Main {
    @ViewChild('dynamicAlertContainer', { read: ViewContainerRef }) container: any;

    componentRef: ComponentRef<any>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    createComponent(type:string, contents: any) {
        this.container.clear();

        const factory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(DynamicComp4Alert);

        this.componentRef = this.container.createComponent(factory);

        this.componentRef.instance.type = type;

        this.componentRef.instance.contents = contents;

        this.componentRef.instance.output1.subscribe((event:any) => console.log(event));
    }

    ngOnDestory() {
        this.componentRef.destroy();
    }
}


// Tutorial Link
//=========================
// REF : https://netbasal.com/dynamically-creating-components-with-angular-a7346f4a982d
// Plunker : https://plnkr.co/edit/VSctCwNMctHIp4WuHLBy?p=preview