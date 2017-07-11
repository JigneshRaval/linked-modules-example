import { DialogAnchorDirective } from './dynamic-dialog-component/dialog-anchor.directive';
import { Logger } from '@nsalaun/ng-logger';
import { BootstrapGrowlService } from 'MyModule-A';
import { DynamicComponent3Service } from 'MyModule-A';
export declare class AppComponent {
    private bootstrapGrowlService;
    private logger;
    private dynamicComponent3Service;
    bgColor: string;
    textColor: string;
    constructor(bootstrapGrowlService: BootstrapGrowlService, logger: Logger, dynamicComponent3Service: DynamicComponent3Service);
    dialogAnchor: DialogAnchorDirective;
    openDialogBox(): void;
    addGrowlAlert(): void;
    addToBody(): void;
}
