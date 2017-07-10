// Dynamic Component 3
//==================================

import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';

@Injectable()
export class DynamicComponent3Service {
	constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {

	}

	appendComponentToBody(component: any) {
		// Create a component ref from component
		const componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

		// Attach component to the AppRef sp that it is indisde ng component tree
		
	}
}
