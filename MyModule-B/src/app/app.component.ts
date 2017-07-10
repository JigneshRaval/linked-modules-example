import { Component, ViewContainerRef, ViewChild } from '@angular/core';

import { DialogComponent } from './dynamic-dialog-component/dialog.component';
import { DialogAnchorDirective } from './dynamic-dialog-component/dialog-anchor.directive';

// Example of linked "ng-logger" example
import { Logger } from '@nsalaun/ng-logger';

// Example of Linked Component using `npm link MyModule-A`
import { MyComponent } from 'MyModule-A';

import { BootstrapGrowlService, BootstrapAlertTypes } from 'MyModule-A';

@Component({
	selector: 'my-app',
	template: `
		<div class="container">
			<p>Hello Angular 4</p>

			<mousewheel-directive-example-component></mousewheel-directive-example-component>

			<dynamic-component-main></dynamic-component-main>

			<dynamic-component-main2></dynamic-component-main2>

			<h3>Bootstrap Growl Notifications</h3>
			<bootstrap-growl [alertCount]="3" [autoClose]="10000"></bootstrap-growl>
			<button (click)="addGrowlAlert()">Test</button>

			<div dialogAnchor></div>
			<div class="open-button" (click)='openDialogBox()'>Open dialog box</div>

			<my-component></my-component>

			<!-- Parent child data passing example -->
			<!-- Data passing 1 -->
			<parent-component-1></parent-component-1>

			<!-- Data passing 2 -->
			<counter-parent-component></counter-parent-component>

			<!-- Component Inheritance and Component Swapping -->
			<h3>Component Inheritance and Component Swapping</h3>
			<app-main-employee></app-main-employee>

			<!-- Directive Example -->
			<h3>Directives</h3>
			<!-- hightlight.directive.ts -->
			<p myHighlight [highlightBgColor]="bgColor"   [highlightTextColor]="textColor">Dynamic Highlight Directive</p>
			<pre>&lt;p myHighlight [highlightBgColor]="bgColor" [highlightTextColor]="textColor">Dynamic Highlight Directive&lt;/p></pre>

			<p myHighlight highlightBgColor="yellow"      highlightTextColor="black">Highlighted in yellow Directive</p>
			<pre>&lt;p myHighlight highlightBgColor="yellow" highlightTextColor="black">Highlighted in yellow Directive&lt;/p></pre>

			<p myHighlight [highlightBgColor]="'orange'"  [highlightTextColor]="'white'">Highlighted in orange Directive</p>
		</div>
    `,
	styleUrls: [],
	entryComponents: [DialogComponent]
})
export class AppComponent {
	bgColor: string = 'blue';
	textColor: string = 'white';

	constructor(private bootstrapGrowlService: BootstrapGrowlService, private logger: Logger) {

		this.logger.log('Hello !', "It's working :)");

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
}
