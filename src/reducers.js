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
import { NgrxJsonApiActionTypes, } from './actions';
import { clearQueryResult, compactStore, deleteStoreResources, getPendingChanges, removeQuery, removeStoreResource, rollbackStoreResources, setIn, updateQueriesForDeletedResource, updateQueryErrors, updateQueryParams, updateQueryResults, updateResourceErrors, updateResourceErrorsForQuery, updateResourceState, updateStoreDataFromPayload, updateStoreDataFromResource, } from './utils';
/** @type {?} */
export var initialNgrxJsonApiZone = {
    isCreating: 0,
    isReading: 0,
    isUpdating: 0,
    isDeleting: 0,
    isApplying: 0,
    data: {},
    queries: {},
};
/** @type {?} */
export var initialNgrxJsonApiState = {
    zones: {},
};
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
export function NgrxJsonApiStoreReducer(state, action) {
    if (state === void 0) { state = initialNgrxJsonApiState; }
    var _a;
    /** @type {?} */
    var zoneId = action['zoneId'];
    if (!zoneId) {
        return state;
    }
    /** @type {?} */
    var zone = state.zones[zoneId];
    if (!zone) {
        zone = initialNgrxJsonApiZone;
    }
    /** @type {?} */
    var newZone = NgrxJsonApiZoneReducer(zone, action);
    if (zone != newZone) {
        return __assign({}, state, { zones: __assign({}, state.zones, (_a = {}, _a[zoneId] = newZone, _a)) });
    }
    else {
        return state;
    }
}
/**
 * @param {?} zone
 * @param {?} action
 * @return {?}
 */
export function NgrxJsonApiZoneReducer(zone, action) {
    /** @type {?} */
    var newZone;
    switch (action.type) {
        case NgrxJsonApiActionTypes.API_POST_INIT: {
            /** @type {?} */
            var updatedData = updateStoreDataFromResource(zone.data, action.payload, false, true);
            newZone = __assign({}, zone, { data: updatedData, isCreating: zone.isCreating + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_GET_INIT: {
            /** @type {?} */
            var query = /** @type {?} */ (action.payload);
            newZone = __assign({}, zone, { queries: updateQueryParams(zone.queries, query), isReading: zone.isReading + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_PATCH_INIT: {
            /** @type {?} */
            var updatedData = updateStoreDataFromResource(zone.data, action.payload, false, false);
            newZone = __assign({}, zone, { data: updatedData, isUpdating: zone.isUpdating + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_DELETE_INIT: {
            newZone = __assign({}, zone, { data: updateResourceState(zone.data, action.payload, 'DELETED'), isDeleting: zone.isDeleting + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_POST_SUCCESS: {
            newZone = __assign({}, zone, { data: updateStoreDataFromPayload(zone.data, action.payload.jsonApiData), isCreating: zone.isCreating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_GET_SUCCESS: {
            newZone = __assign({}, zone, { data: updateStoreDataFromPayload(zone.data, action.payload.jsonApiData), queries: updateQueryResults(zone.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: zone.isReading - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_PATCH_SUCCESS: {
            newZone = __assign({}, zone, { data: updateStoreDataFromPayload(zone.data, action.payload.jsonApiData), isUpdating: zone.isUpdating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_DELETE_SUCCESS: {
            newZone = __assign({}, zone, { data: deleteStoreResources(zone.data, action.payload.query), queries: updateQueriesForDeletedResource(zone.queries, {
                    id: action.payload.query.id,
                    type: action.payload.query.type,
                }), isDeleting: zone.isDeleting - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_QUERY_REFRESH: {
            // clear result ids and wait until new data is fetched (triggered by effect)
            newZone = __assign({}, zone, { queries: clearQueryResult(zone.queries, action.payload) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_POST_FAIL: {
            newZone = __assign({}, zone, { data: updateResourceErrorsForQuery(zone.data, action.payload.query, action.payload.jsonApiData), isCreating: zone.isCreating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_GET_FAIL: {
            newZone = __assign({}, zone, { queries: updateQueryErrors(zone.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: zone.isReading - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_PATCH_FAIL: {
            newZone = __assign({}, zone, { data: updateResourceErrorsForQuery(zone.data, action.payload.query, action.payload.jsonApiData), isUpdating: zone.isUpdating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_DELETE_FAIL: {
            newZone = __assign({}, zone, { data: updateResourceErrorsForQuery(zone.data, action.payload.query, action.payload.jsonApiData), isDeleting: zone.isDeleting - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.REMOVE_QUERY: {
            /** @type {?} */
            var queryId = /** @type {?} */ (action.payload);
            newZone = __assign({}, zone, { queries: removeQuery(zone.queries, queryId) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_INIT: {
            /** @type {?} */
            var query = /** @type {?} */ (action.payload);
            newZone = __assign({}, zone, { queries: updateQueryParams(zone.queries, query) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS: {
            /** @type {?} */
            var payload = /** @type {?} */ (action.payload);
            newZone = __assign({}, zone, { data: updateResourceErrors(zone.data, payload.resourceId, payload.errors, payload.modificationType) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS: {
            return setIn(zone, 'queries', updateQueryResults(zone.queries, action.payload.query.queryId, action.payload.jsonApiData));
        }
        case NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE: {
            /** @type {?} */
            var updatedData = updateStoreDataFromResource(zone.data, action.payload, false, false);
            if (updatedData !== zone.data) {
                newZone = __assign({}, zone, { data: updatedData });
                return newZone;
            }
            else {
                return zone;
            }
        }
        case NgrxJsonApiActionTypes.POST_STORE_RESOURCE: {
            /** @type {?} */
            var updatedData = updateStoreDataFromResource(zone.data, action.payload, false, true);
            if (updatedData !== zone.data) {
                newZone = __assign({}, zone, { data: updatedData });
                return newZone;
            }
            else {
                return zone;
            }
        }
        case NgrxJsonApiActionTypes.NEW_STORE_RESOURCE: {
            /** @type {?} */
            var updatedData = updateStoreDataFromResource(zone.data, action.payload, false, true);
            updatedData = updateResourceState(updatedData, action.payload, 'NEW');
            if (updatedData !== zone.data) {
                newZone = __assign({}, zone, { data: updatedData });
                return newZone;
            }
            else {
                return zone;
            }
        }
        case NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE: {
            /** @type {?} */
            var resourceId = /** @type {?} */ (action.payload);
            if (zone.data[resourceId.type] &&
                zone.data[resourceId.type][resourceId.id]) {
                /** @type {?} */
                var resource = zone.data[resourceId.type][resourceId.id];
                if (resource.state === 'NEW' || resource.state === 'CREATED') {
                    // not yet stored on server-side, just delete
                    newZone = __assign({}, zone, { data: removeStoreResource(zone.data, resourceId) });
                    return newZone;
                }
                else {
                    // stored on server, mark for deletion
                    newZone = __assign({}, zone, { data: updateResourceState(zone.data, action.payload, 'DELETED') });
                    return newZone;
                }
            }
            return zone;
        }
        case NgrxJsonApiActionTypes.API_APPLY_INIT: {
            /** @type {?} */
            var payload = (/** @type {?} */ (action)).payload;
            /** @type {?} */
            var pending_2 = getPendingChanges(zone.data, payload.ids, payload.include);
            newZone = __assign({}, zone, { isApplying: zone.isApplying + 1 });
            for (var _i = 0, pending_1 = pending_2; _i < pending_1.length; _i++) {
                var pendingChange = pending_1[_i];
                if (pendingChange.state === 'CREATED') {
                    newZone.isCreating++;
                }
                else if (pendingChange.state === 'UPDATED') {
                    newZone.isUpdating++;
                }
                else if (pendingChange.state === 'DELETED') {
                    newZone.isDeleting++;
                }
                else {
                    throw new Error('unknown state ' + pendingChange.state);
                }
            }
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_APPLY_SUCCESS:
        case NgrxJsonApiActionTypes.API_APPLY_FAIL: {
            /** @type {?} */
            var actions = /** @type {?} */ (action.payload);
            newZone = zone;
            for (var _a = 0, actions_1 = actions; _a < actions_1.length; _a++) {
                var commitAction = actions_1[_a];
                newZone = NgrxJsonApiZoneReducer(newZone, commitAction);
            }
            newZone = __assign({}, newZone, { isApplying: zone['isApplying'] - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_ROLLBACK: {
            /** @type {?} */
            var payload = (/** @type {?} */ (action)).payload;
            newZone = __assign({}, zone, { data: rollbackStoreResources(zone.data, payload.ids, payload.include) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.CLEAR_STORE: {
            return initialNgrxJsonApiZone;
        }
        case NgrxJsonApiActionTypes.COMPACT_STORE: {
            return compactStore(zone);
        }
        default:
            return zone;
    }
}
/** @type {?} */
export var reducer = NgrxJsonApiStoreReducer;
//# sourceMappingURL=reducers.js.map