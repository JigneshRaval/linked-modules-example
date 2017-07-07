// REF : https://angular.io/guide/attribute-directives

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[myHighlight]'
})
export class HighlightDirective {
    @Input() highlightBgColor: string;
    @Input() highlightTextColor: string;

    constructor(private el: ElementRef) {
        this.el.nativeElement.style.padding = '1em';
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.highlightBgColor, this.highlightTextColor);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null, 'black');
    }

    highlight(bgColor: string, color: string) {
        this.el.nativeElement.style.backgroundColor = bgColor;
        this.el.nativeElement.style.color = color;
    }
}