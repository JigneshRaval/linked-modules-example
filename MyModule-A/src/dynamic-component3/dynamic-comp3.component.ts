// Dynamic Component 3
//==================================

import { Component } from '@angular/core';

@Component({
	selector: 'app-dynamic-component3',
	template: `
		<div class="" style="position: fixed; top: 50%;left: 50%;border: 1px solid #000;padding: 1em; background: #FFF;">
			<h4>Dynamic Content example 3</h4>
			<p>This is dynamic component example</p>
		</div>
	`
})
export class DynamicComponent3 {

}

// REF : https://medium.com/@caroso1222/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
// Plunker : https://plnkr.co/edit/Yc1ijM6shHt2JAPi7Fdg?p=preview
