// REF : https://alligator.io/angular/building-custom-directives-angular/

// This Directive will show box-shadow as per value passed into it
import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appShadow]'
})
export class AppShadowDirective implements OnInit {

    // Values passed into directive
    /**
     * <span appShadow
            appShadowX="1px"
            appShadowY="1px"
            appShadowBlur="10px"
            appShadowColor="red" style="display: inline-block; padding: 15px;">Shadow Directive</span>
     */
    @Input() appShadowColor: string;
    @Input() appShadowX: string;
    @Input() appShadowY: string;
    @Input() appShadowBlur: string;

    constructor(private el: ElementRef, private renderer: Renderer) {

    }

    ngOnInit() {
        // Set box-shadow once dom is ready
        let shadowString = `${this.appShadowX} ${this.appShadowY} ${this.appShadowBlur} ${this.appShadowColor}`;
        this.renderer.setElementStyle(this.el.nativeElement, 'box-shadow', shadowString);
    }
}