import { DialogAnchorDirective } from './dynamic-dialog-component/dialog-anchor.directive';
import { Logger } from '@nsalaun/ng-logger';
import { BootstrapGrowlService } from 'MyModule-A';
export declare class AppComponent {
    private bootstrapGrowlService;
    private logger;
    bgColor: string;
    textColor: string;
    constructor(bootstrapGrowlService: BootstrapGrowlService, logger: Logger);
    dialogAnchor: DialogAnchorDirective;
    openDialogBox(): void;
    addGrowlAlert(): void;
}
