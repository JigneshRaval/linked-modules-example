/**
 * @license
 * Copyright Noémi Salaün All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/noemi-salaun/ng-logger/blob/master/LICENSE
 */
/**
 * Created by Noémi Salaün on 10/11/2016.
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyComponent } from './mycomponent.component';
import { CommonModule } from '@angular/common';
var MyMainModule = (function () {
    function MyMainModule() {
    }
    MyMainModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        MyComponent
                    ],
                    exports: [
                        MyComponent
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] },
    ];
    /** @nocollapse */
    MyMainModule.ctorParameters = function () { return []; };
    return MyMainModule;
}());
export { MyMainModule };
//# sourceMappingURL=index.js.map