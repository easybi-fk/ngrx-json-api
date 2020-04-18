/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import 'rxjs/add/operator/let';
import { NgrxJsonApiService } from './services';
import { NGRX_JSON_API_DEFAULT_ZONE, } from './interfaces';
var SelectStoreResourcePipe = /** @class */ (function () {
    function SelectStoreResourcePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} id
     * @param {?=} zoneId
     * @return {?}
     */
    SelectStoreResourcePipe.prototype.transform = /**
     * @param {?} id
     * @param {?=} zoneId
     * @return {?}
     */
    function (id, zoneId) {
        if (zoneId === void 0) { zoneId = NGRX_JSON_API_DEFAULT_ZONE; }
        return this.service.getZone(zoneId).selectStoreResource(id);
    };
    SelectStoreResourcePipe.decorators = [
        { type: Pipe, args: [{ name: 'jaSelectStoreResource' },] },
    ];
    /** @nocollapse */
    SelectStoreResourcePipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService }
    ]; };
    return SelectStoreResourcePipe;
}());
export { SelectStoreResourcePipe };
if (false) {
    /** @type {?} */
    SelectStoreResourcePipe.prototype.service;
}
var SelectStoreResourcesPipe = /** @class */ (function () {
    function SelectStoreResourcesPipe(service) {
        this.service = service;
    }
    /**
     * @param {?} ids
     * @param {?=} zoneId
     * @return {?}
     */
    SelectStoreResourcesPipe.prototype.transform = /**
     * @param {?} ids
     * @param {?=} zoneId
     * @return {?}
     */
    function (ids, zoneId) {
        if (zoneId === void 0) { zoneId = NGRX_JSON_API_DEFAULT_ZONE; }
        return this.service.getZone(zoneId).selectStoreResources(ids);
    };
    SelectStoreResourcesPipe.decorators = [
        { type: Pipe, args: [{ name: 'jaSelectStoreResources' },] },
    ];
    /** @nocollapse */
    SelectStoreResourcesPipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService }
    ]; };
    return SelectStoreResourcesPipe;
}());
export { SelectStoreResourcesPipe };
if (false) {
    /** @type {?} */
    SelectStoreResourcesPipe.prototype.service;
}
var DenormaliseStoreResourcePipe = /** @class */ (function () {
    function DenormaliseStoreResourcePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} obs
     * @param {?=} zoneId
     * @return {?}
     */
    DenormaliseStoreResourcePipe.prototype.transform = /**
     * @param {?} obs
     * @param {?=} zoneId
     * @return {?}
     */
    function (obs, zoneId) {
        if (zoneId === void 0) { zoneId = NGRX_JSON_API_DEFAULT_ZONE; }
        return this.service.denormaliseResource(obs, zoneId);
    };
    DenormaliseStoreResourcePipe.decorators = [
        { type: Pipe, args: [{ name: 'denormaliseStoreResource' },] },
    ];
    /** @nocollapse */
    DenormaliseStoreResourcePipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService }
    ]; };
    return DenormaliseStoreResourcePipe;
}());
export { DenormaliseStoreResourcePipe };
if (false) {
    /** @type {?} */
    DenormaliseStoreResourcePipe.prototype.service;
}
var GetDenormalisedValuePipe = /** @class */ (function () {
    function GetDenormalisedValuePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    GetDenormalisedValuePipe.prototype.transform = /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    function (path, storeResource) {
        return this.service.getDenormalisedValue(path, storeResource);
    };
    GetDenormalisedValuePipe.decorators = [
        { type: Pipe, args: [{ name: 'getDenormalisedValue' },] },
    ];
    /** @nocollapse */
    GetDenormalisedValuePipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService }
    ]; };
    return GetDenormalisedValuePipe;
}());
export { GetDenormalisedValuePipe };
if (false) {
    /** @type {?} */
    GetDenormalisedValuePipe.prototype.service;
}
//# sourceMappingURL=pipes.js.map