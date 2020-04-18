/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { InjectionToken, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxJsonApi } from './api';
import { NgrxJsonApiEffects } from './effects';
import { NgrxJsonApiService } from './services';
import { reducer } from './reducers';
import { DenormaliseStoreResourcePipe, GetDenormalisedValuePipe, SelectStoreResourcePipe, SelectStoreResourcesPipe, } from './pipes';
import { NgrxJsonApiSelectors } from './selectors';
/** @type {?} */
export var NGRX_JSON_API_CONFIG = new InjectionToken('NGRX_JSON_API_CONFIG');
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
export function apiFactory(http, config) {
    return new NgrxJsonApi(http, config);
}
/**
 * Deprecated, do not use any longer
 * @return {?}
 */
export function selectorsFactory() {
    return new NgrxJsonApiSelectors();
}
/**
 * @param {?} store
 * @param {?} config
 * @return {?}
 */
export function serviceFactory(store, config) {
    return new NgrxJsonApiService(store, config);
}
/**
 * @param {?} config
 * @return {?}
 */
export function configure(config) {
    return [
        {
            provide: NgrxJsonApi,
            useFactory: apiFactory,
            deps: [HttpClient, NGRX_JSON_API_CONFIG],
        },
        {
            provide: NgrxJsonApiSelectors,
            useFactory: selectorsFactory,
        },
        {
            provide: NgrxJsonApiService,
            useFactory: serviceFactory,
            deps: [Store, NGRX_JSON_API_CONFIG],
        },
        {
            provide: NGRX_JSON_API_CONFIG,
            useValue: config,
        },
    ];
}
var NgrxJsonApiModule = /** @class */ (function () {
    function NgrxJsonApiModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NgrxJsonApiModule.configure = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: NgrxJsonApiModule,
            providers: configure(config),
        };
    };
    NgrxJsonApiModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DenormaliseStoreResourcePipe,
                        GetDenormalisedValuePipe,
                        SelectStoreResourcePipe,
                        SelectStoreResourcesPipe,
                    ],
                    imports: [
                        EffectsModule.forFeature([NgrxJsonApiEffects]),
                        StoreModule.forFeature('NgrxJsonApi', reducer, {}),
                    ],
                    exports: [
                        DenormaliseStoreResourcePipe,
                        GetDenormalisedValuePipe,
                        SelectStoreResourcePipe,
                        SelectStoreResourcesPipe,
                    ],
                },] },
    ];
    return NgrxJsonApiModule;
}());
export { NgrxJsonApiModule };
//# sourceMappingURL=module.js.map