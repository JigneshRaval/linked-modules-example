import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import {
  StyleGuideIndex,
  StyleGuideMainComponent,
  StyleGuideButtons,
  StyleGuideContentBox,
  StyleGuideContentDevider,
  StyleGuideIcons,
  StyleGuideBadges,
  StyleGuideFootnotes,
  StyleGuideGotoTop,
  StyleGuideHighlights,
  StyleGuideHorizontalRules,
  StyleGuideLists,
  StyleGuideTypography,
  StyleGuideTables
} from './index';

@Component({
  selector: 'dynamic-component',
  entryComponents: [StyleGuideIcons, StyleGuideBadges, StyleGuideGotoTop], // Reference to the components must be here in order to dynamically create them
  template: `
    <div #dynamicComponentContainer></div>
  `,
})
export class DynamicComponent {
  currentComponent = null;

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
  @Input() set componentData(data: any) {
    if (!data) {
      return;
    }
    data.map((element) => {
      console.log(element, element.component);

      // Inputs need to be in the following format to be resolved properly
      let inputProviders = Object.keys(element.inputs).map((inputName) => {
        console.log(element.inputs, inputName)
        return { provide: inputName, useValue: element.inputs[inputName] };
      });

      console.log("inputProviders :", inputProviders, this);

      let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

      // We create an injector out of the data we want to pass down and this components injector
      let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

      // We create a factory out of the component we want to create
      let factory = this.resolver.resolveComponentFactory(element.component);

      // We create the component using the factory and the injector
      let component = factory.create(injector);

      // We insert the component into the dom container
      this.dynamicComponentContainer.insert(component.hostView);

      // We can destroy the old component is we like by calling destroy
      if (this.currentComponent) {
        //this.currentComponent.destroy();
      }

      //this.currentComponent = component;


    })
  }

  constructor(private resolver: ComponentFactoryResolver) {

  }
}
