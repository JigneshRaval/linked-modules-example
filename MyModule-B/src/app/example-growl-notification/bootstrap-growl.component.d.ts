import { OnInit } from '@angular/core';
import { BootstrapGrowlService } from "./bootstrap-growl.service";
import { BootstrapAlert } from "./bootstrap-growl.model";
export declare class BootstrapGrowlComponent implements OnInit {
    private growlService;
    alertCount: number;
    autoClose: number;
    alerts: BootstrapAlert[];
    constructor(growlService: BootstrapGrowlService);
    ngOnInit(): void;
    closeAlert(alert: BootstrapAlert): void;
}
