var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/zip';
import { filter, map } from 'rxjs/operators';
import { select } from '@ngrx/store';
import { NGRX_JSON_API_DEFAULT_ZONE, } from './interfaces';
import { denormaliseStoreResource, denormaliseStoreResources } from './utils';
/**
 * @return {?}
 */
export function selectNgrxJson() {
    return function (state$) {
        return (/** @type {?} */ (state$)).pipe(select('NgrxJsonApi'), map(function (it) { return (it); }), filter(function (it) { return !_.isUndefined(it); }));
    };
}
/**
 * @return {?}
 */
export function selectNgrxJsonApiDefaultZone() {
    return selectNgrxJsonApiZone(NGRX_JSON_API_DEFAULT_ZONE);
}
/**
 * @param {?} zoneId
 * @return {?}
 */
export function selectNgrxJsonApiZone(zoneId) {
    return function (state$) {
        return (/** @type {?} */ (state$))
            .let(selectNgrxJson())
            .map(function (it) { return (it.zones[zoneId]); });
    };
}
/**
 * @param {?} state
 * @param {?} zoneId
 * @return {?}
 */
export function getNgrxJsonApiZone(state, zoneId) {
    return /** @type {?} */ (state['NgrxJsonApi']['zones'][zoneId]);
}
/**
 * @param {?} queryId
 * @return {?}
 */
export function selectStoreQuery(queryId) {
    return function (state$) {
        return state$.map(function (state) { return state.queries[queryId]; });
    };
}
/**
 * @param {?} type
 * @return {?}
 */
export function selectStoreResourcesOfType(type) {
    return function (state$) {
        return state$
            .map(function (state) { return state.data; })
            .map(function (data) { return (data ? data[type] : undefined); });
    };
}
/**
 * @param {?} identifier
 * @return {?}
 */
export function selectStoreResource(identifier) {
    return function (state$) {
        return state$
            .let(selectStoreResourcesOfType(identifier.type))
            .map(function (resources) { return ((resources ? resources[identifier.id] : undefined)); });
    };
}
/**
 * @param {?} identifiers
 * @return {?}
 */
export function selectStoreResources(identifiers) {
    return function (state$) {
        return state$.pipe(map(function (state) { return state.data; }), map(function (data) {
            return identifiers.map(function (identifier) {
                if (!data || !data[identifier.type]) {
                    return undefined;
                }
                return /** @type {?} */ (data[identifier.type][identifier.id]);
            });
        }));
    };
}
/**
 * @param {?} queryId
 * @param {?=} denormalize
 * @return {?}
 */
export function selectManyQueryResult(queryId, denormalize) {
    return function (state$) {
        return state$.map(function (state) {
            /** @type {?} */
            var storeQuery = state.queries[queryId];
            if (!storeQuery) {
                return undefined;
            }
            if (_.isEmpty(storeQuery.resultIds)) {
                /** @type {?} */
                var queryResult = __assign({}, storeQuery, { data: _.isUndefined(storeQuery.resultIds) ? undefined : [] });
                return queryResult;
            }
            else {
                /** @type {?} */
                var results = storeQuery.resultIds.map(function (id) { return (state.data[id.type] ? state.data[id.type][id.id] : undefined); });
                if (denormalize) {
                    results = denormaliseStoreResources(results, state.data);
                }
                return __assign({}, storeQuery, { data: /** @type {?} */ (results) });
            }
        });
    };
}
/**
 * @param {?} queryId
 * @param {?=} denormalize
 * @return {?}
 */
export function selectOneQueryResult(queryId, denormalize) {
    return function (state$) {
        return state$.map(function (state) {
            /** @type {?} */
            var storeQuery = state.queries[queryId];
            if (!storeQuery) {
                return undefined;
            }
            if (_.isEmpty(storeQuery.resultIds)) {
                /** @type {?} */
                var queryResult = __assign({}, storeQuery, { data: _.isUndefined(storeQuery.resultIds) ? undefined : null });
                return queryResult;
            }
            else {
                if (storeQuery.resultIds.length >= 2) {
                    throw new Error('expected single result for query ' + storeQuery.query.queryId);
                }
                /** @type {?} */
                var resultId = storeQuery.resultIds[0];
                /** @type {?} */
                var result = state.data[resultId.type]
                    ? state.data[resultId.type][resultId.id]
                    : undefined;
                if (denormalize) {
                    result = denormaliseStoreResource(result, state.data);
                }
                /** @type {?} */
                var queryResult = __assign({}, storeQuery, { data: result });
                return queryResult;
            }
        });
    };
}
/**
 * deprecated, to not use any longer
 * @param {?} state$
 * @return {?}
 */
export function getNgrxJsonApiStore(state$) {
    return state$.let(selectNgrxJsonApiDefaultZone());
}
/**
 * deprecated, to not use any longer
 */
var /**
 * deprecated, to not use any longer
 */
NgrxJsonApiSelectors = /** @class */ (function () {
    function NgrxJsonApiSelectors() {
    }
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getNgrxJsonApiStore$ = /**
     * @return {?}
     */
    function () {
        return function (state$) {
            return state$.let(selectNgrxJsonApiDefaultZone());
        };
    };
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreData$ = /**
     * @return {?}
     */
    function () {
        return function (state$) {
            return state$.select('data');
        };
    };
    /**
     * @param {?} type
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreResourceOfType$ = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreData$())
                .map(function (resources) { return (resources ? resources[type] : undefined); });
        };
    };
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreQueries$ = /**
     * @return {?}
     */
    function () {
        return function (state$) {
            return state$.select('queries');
        };
    };
    /**
     * @param {?} queryId
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getResourceQuery$ = /**
     * @param {?} queryId
     * @return {?}
     */
    function (queryId) {
        return selectStoreQuery(queryId);
    };
    /**
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreResource$ = /**
     * @param {?} identifier
     * @return {?}
     */
    function (identifier) {
        return selectStoreResource(identifier);
    };
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getManyResults$ = /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    function (queryId, denormalize) {
        return selectManyQueryResult(queryId, denormalize);
    };
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getOneResult$ = /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    function (queryId, denormalize) {
        return selectOneQueryResult(queryId, denormalize);
    };
    /**
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getPersistedResource$ = /**
     * @param {?} identifier
     * @return {?}
     */
    function (identifier) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreResource$(identifier))
                .map(function (it) { return (it ? it.persistedResource : undefined); });
        };
    };
    return NgrxJsonApiSelectors;
}());
/**
 * deprecated, to not use any longer
 */
export { NgrxJsonApiSelectors };
//# sourceMappingURL=selectors.js.map