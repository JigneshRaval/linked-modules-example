// Dynamic Component 3
//==================================

import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable()
export class DynamicComponent3Service {
	constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {

	}

	appendComponentToBody(component: any) {
		// Create a component ref from component
		const componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

		// Attach component to the appRef so that it's inside the ng component tree
		this.appRef.attachView(componentRef.hostView);

		// Get DOM element from component
		const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
			.rootNodes[0] as HTMLElement;

		// Append DOM element to the body
		document.body.appendChild(domElem);

		// Wait some time and remove it from the component tree and from the DOM
		setTimeout(() => {
			this.appRef.detachView(componentRef.hostView);
			componentRef.destroy();
		}, 6000);

	}
}
