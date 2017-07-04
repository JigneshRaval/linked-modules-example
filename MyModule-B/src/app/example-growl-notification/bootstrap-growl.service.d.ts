import { BootstrapAlertTypes } from './bootstrap-growl-alert-types.enum';
import { BootstrapAlert } from './bootstrap-growl.model';
import { Subject } from 'rxjs';
export declare class BootstrapGrowlService {
    alerts: Subject<BootstrapAlert[]>;
    alertHolder: BootstrapAlert[];
    alertCount: number;
    autoClose: number;
    constructor();
    configure(alertCount: number, autoClose: number): void;
    addAlert(message: string, type: BootstrapAlertTypes, dismissable?: boolean): void;
    removeAlert(alert: BootstrapAlert): void;
    private _removeAlert(alert, alertHolder, alerts);
    private _scheduleAlertHide(timeout, alert);
    private _convertTypeToCssClass(type);
    private _removeAlertById(id, alertHolder, alerts);
}
