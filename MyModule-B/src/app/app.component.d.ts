import { DialogAnchorDirective } from './dynamic-dialog-component/dialog-anchor.directive';
import { BootstrapGrowlService } from 'MyModule-A';
import { DynamicComponent3Service } from 'MyModule-A';
export declare class AppComponent {
    private bootstrapGrowlService;
    private dynamicComponent3Service;
    bgColor: string;
    textColor: string;
    carouselItems: any[];
    constructor(bootstrapGrowlService: BootstrapGrowlService, dynamicComponent3Service: DynamicComponent3Service);
    dialogAnchor: DialogAnchorDirective;
    openDialogBox(): void;
    addGrowlAlert(): void;
    addToBody(): void;
}
