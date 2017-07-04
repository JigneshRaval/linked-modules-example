var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyComponent } from './mycomponent.component';
var MyMainModule = (function () {
    function MyMainModule() {
    }
    MyMainModule = __decorate([
        NgModule({
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
        })
    ], MyMainModule);
    return MyMainModule;
}());
export { MyMainModule };
//# sourceMappingURL=index.js.map