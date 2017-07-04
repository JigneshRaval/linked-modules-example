import { BootstrapGrowlService } from './example-growl-notification/index';
import { DialogAnchorDirective } from './dynamic-dialog-component/dialog-anchor.directive';
import { Logger } from '@nsalaun/ng-logger';
export declare class AppComponent {
    private bootstrapGrowlService;
    private logger;
    constructor(bootstrapGrowlService: BootstrapGrowlService, logger: Logger);
    dialogAnchor: DialogAnchorDirective;
    openDialogBox(): void;
    addGrowlAlert(): void;
}
