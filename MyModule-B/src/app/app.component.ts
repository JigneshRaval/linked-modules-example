import { Component, ViewContainerRef, ViewChild } from '@angular/core';

import { DialogComponent } from './dynamic-dialog-component/dialog.component';
import { DialogAnchorDirective } from './dynamic-dialog-component/dialog-anchor.directive';

// Example of linked "ng-logger" example
//import { Logger } from '@nsalaun/ng-logger';

// Example of Linked Component using `npm link MyModule-A`
import { MyComponent } from 'MyModule-A';

import { BootstrapGrowlService, BootstrapAlertTypes } from 'MyModule-A';

import { DynamicComponent3Service, DynamicComponent3 } from 'MyModule-A';

//import { ComponentCommunicationSharedService } from 'MyModule-A';

@Component({
	selector: 'my-app',
	template: `
		<div class="container">
			<p>Hello Angular 4</p>

			<mousewheel-directive-example-component></mousewheel-directive-example-component>

			<dynamic-component-main></dynamic-component-main>

			<dynamic-component-main2></dynamic-component-main2>

			<div class="example-section">
				<h3>Bootstrap Growl Notifications</h3>
				<bootstrap-growl [alertCount]="3" [autoClose]="10000"></bootstrap-growl>
				<button (click)="addGrowlAlert()">Test</button>
			</div>

			<div class="example-section">
				<h4>Dynamic Dialog box Example</h4>
				<div dialogAnchor></div>
				<button class="open-button" (click)='openDialogBox()'>Open dialog box</button>
			</div>

			<my-component></my-component>

			<div class="example-section">
				<!-- Parent child data passing example -->
				<!-- Data passing 1 -->
				<parent-component-1></parent-component-1>
			</div>

			<div class="example-section">
				<!-- Data passing 2 -->
				<counter-parent-component></counter-parent-component>
			</div>

			<div class="example-section">
				<!-- Component Inheritance and Component Swapping -->
				<h3>Component Inheritance and Component Swapping</h3>
				<app-main-employee></app-main-employee>
			</div>

			<div class="example-section">
				<!-- Directive Example -->
				<h3>Directives</h3>
				<!-- hightlight.directive.ts -->
				<p myHighlight [highlightBgColor]="bgColor" [highlightTextColor]="textColor">Dynamic Highlight Directive</p>
				<pre>&lt;p myHighlight [highlightBgColor]="bgColor" [highlightTextColor]="textColor">Dynamic Highlight Directive&lt;/p></pre>

				<p myHighlight highlightBgColor="yellow" highlightTextColor="black">Highlighted in yellow Directive</p>
				<pre>&lt;p myHighlight highlightBgColor="yellow" highlightTextColor="black">Highlighted in yellow Directive&lt;/p></pre>

				<p myHighlight [highlightBgColor]="'orange'" [highlightTextColor]="'white'">Highlighted in orange Directive</p>
			</div>

			<div class="example-section">
				<h3>Dynamic Component Example 3</h3>
				<p>Component will be added and removed dynamically into body</p>
				<button (click)="addToBody()">Add Dynamic Component 3</button>
			</div>

			<dynamic-comp4-main></dynamic-comp4-main>

			<div class="example-section">
				<h3>Communication between two sibling components in angular 2</h3>
				<p><a href="https://github.com/angular/angular.io/issues/2663" target="_blank">https://github.com/angular/angular.io/issues/2663</a></p>
				<p><a href="https://embed.plnkr.co/P8xCEwSKgcOg07pwDrlO/" target="_blank">https://embed.plnkr.co/P8xCEwSKgcOg07pwDrlO/</a></p>
				<component-communication-main></component-communication-main>
			</div>

			<div class="example-section">
				<ah-carousel [value]="carouselItems">
					
				</ah-carousel>
			</div>

		</div>
    `,
	styleUrls: [],
	entryComponents: [DialogComponent],
	providers: []
})
export class AppComponent {
	bgColor: string = 'blue';
	textColor: string = 'white';
	carouselItems: any[];


	constructor(private bootstrapGrowlService: BootstrapGrowlService, private dynamicComponent3Service: DynamicComponent3Service) {

		//this.logger.log('Hello !', "It's working :)");
		this.carouselItems = [
			{ vin: "Slide 1", image: "http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-2.jpg" },
			{ vin: "Slide 2", image: "http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-3.jpg" },
			{ vin: "Slide 3", image: "http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-4.jpg" },
			{ vin: "Slide 4", image: "http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-5.jpg" }
		]
	}

	@ViewChild(DialogAnchorDirective) dialogAnchor: DialogAnchorDirective;

	openDialogBox() {
		this.dialogAnchor.createDialog(DialogComponent);
	}

	addGrowlAlert() {
		this.bootstrapGrowlService.addAlert("any custom message 123", BootstrapAlertTypes.SUCCESS);
		this.bootstrapGrowlService.addAlert("any custom message 456 <b>with</b> HTML", BootstrapAlertTypes.INFO);
		this.bootstrapGrowlService.addAlert("any custom message 222", BootstrapAlertTypes.WARNING);
		this.bootstrapGrowlService.addAlert("any custom message 888", BootstrapAlertTypes.DANGER, false);
	}

	addToBody() {
		this.dynamicComponent3Service.appendComponentToBody(DynamicComponent3);
	}
}
