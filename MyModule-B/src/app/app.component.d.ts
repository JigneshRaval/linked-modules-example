import { BootstrapGrowlService } from './example-growl-notification/index';
import { DialogAnchorDirective } from './dynamic-dialog-component/dialog-anchor.directive';
export declare class AppComponent {
    private bootstrapGrowlService;
    constructor(bootstrapGrowlService: BootstrapGrowlService);
    dialogAnchor: DialogAnchorDirective;
    openDialogBox(): void;
    addGrowlAlert(): void;
}
