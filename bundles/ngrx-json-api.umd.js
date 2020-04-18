(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('rxjs/add/observable/concat'), require('rxjs/add/observable/throw'), require('rxjs/add/operator/combineLatest'), require('rxjs/add/operator/concat'), require('rxjs/add/operator/concatMap'), require('rxjs/add/operator/distinctUntilChanged'), require('rxjs/add/operator/do'), require('rxjs/add/operator/filter'), require('rxjs/add/operator/let'), require('rxjs/add/operator/map'), require('rxjs/add/operator/mergeMap'), require('rxjs/add/observable/zip'), require('rxjs/operators'), require('@ngrx/store'), require('rxjs/add/operator/finally'), require('@angular/core'), require('@angular/common/http'), require('rxjs/Observable'), require('@ngrx/effects'), require('rxjs/observable/of'), require('rxjs/add/operator/concatAll')) :
	typeof define === 'function' && define.amd ? define(['exports', 'lodash', 'rxjs/add/observable/concat', 'rxjs/add/observable/throw', 'rxjs/add/operator/combineLatest', 'rxjs/add/operator/concat', 'rxjs/add/operator/concatMap', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/do', 'rxjs/add/operator/filter', 'rxjs/add/operator/let', 'rxjs/add/operator/map', 'rxjs/add/operator/mergeMap', 'rxjs/add/observable/zip', 'rxjs/operators', '@ngrx/store', 'rxjs/add/operator/finally', '@angular/core', '@angular/common/http', 'rxjs/Observable', '@ngrx/effects', 'rxjs/observable/of', 'rxjs/add/operator/concatAll'], factory) :
	(factory((global.ngrx = global.ngrx || {}, global.ngrx.json = global.ngrx.json || {}, global.ngrx.json.api = {}),global.lodash,null,null,null,null,null,null,null,null,null,null,null,null,global.operators,global.store,null,global.ng.core,global.http,global.Rx,global.effects,global.Rx.Observable));
}(this, (function (exports,lodash,concat,_throw,combineLatest,concat$1,concatMap,distinctUntilChanged,_do,filter,_let,map,mergeMap,zip,operators,store,_finally,core,http,Observable,effects,of) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var NGRX_JSON_API_DEFAULT_ZONE = 'default';
/** @enum {number} */
var Direction = {
    ASC: 0,
    DESC: 1,
};
Direction[Direction.ASC] = 'ASC';
Direction[Direction.DESC] = 'DESC';
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
// unsupported: template constraints.
/**
 * Used by code generators to navigate relationships in a type-safe manner.
 * See crnk.io for a first such generator.
 * @record
 * @template T
 */
// unsupported: template constraints.
/**
 * Used by code generators to navigate relationships in a type-safe manner.
 * See crnk.io for a first such generator.
 * @record
 * @template T
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * deprecated, mae use of NgrxJsonApiZone instead
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * Specifies a GET query with parameters.
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * Represents a resource obtained from the server.
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * Container to hold a Resource in the store with state information.
 * @record
 */
var __assign = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} state
 * @param {?} path
 * @param {?} value
 * @return {?}
 */
function setIn(state, path, value) {
    /** @type {?} */
    var currentValue = lodash.get(state, path);
    if (value === currentValue) {
        return state;
    }
    return lodash.setWith(lodash.clone(state), path, value, function (nsValue, key, nsObject) {
        /** @type {?} */
        var newObject = lodash.clone(nsObject);
        newObject[key] = nsValue;
        return newObject;
    });
}
/** @type {?} */
var denormaliseObject = function (resource, storeData, bag, denormalizePersisted) {
    if (denormalizePersisted === void 0) {
        denormalizePersisted = false;
    }
    // this function MUST MUTATE resource
    if (resource.hasOwnProperty('relationships')) {
        Object.keys(resource.relationships).forEach(function (relationshipName) {
            /** @type {?} */
            var orginalRelationship = resource.relationships[relationshipName];
            /** @type {?} */
            var data = orginalRelationship.data;
            if (!lodash.isUndefined(data)) {
                /** @type {?} */
                var denormalizedRelation = void 0;
                if (data === null) {
                    denormalizedRelation = data;
                }
                else if (!lodash.isArray(data)) {
                    /** @type {?} */
                    var relatedRS = getSingleStoreResource(/** @type {?} */ (data), storeData);
                    denormalizedRelation = denormaliseStoreResource(relatedRS, storeData, bag, denormalizePersisted);
                }
                else if (( /** @type {?} */(data)).length == 0) {
                    denormalizedRelation = data;
                }
                else {
                    /** @type {?} */
                    var relatedRSs = getMultipleStoreResource(/** @type {?} */ (data), storeData);
                    denormalizedRelation = relatedRSs.map(function (r) {
                        return denormaliseStoreResource(r, storeData, bag, denormalizePersisted);
                    });
                }
                /** @type {?} */
                var relationship = __assign({}, orginalRelationship);
                relationship['reference'] = denormalizedRelation;
                resource.relationships[relationshipName] = relationship;
            }
        });
    }
    return resource;
};
/** @type {?} */
var denormaliseStoreResources = function (items, storeData, bag, denormalizePersisted) {
    if (bag === void 0) {
        bag = {};
    }
    if (denormalizePersisted === void 0) {
        denormalizePersisted = false;
    }
    /** @type {?} */
    var results = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        results.push(denormaliseStoreResource(item, storeData, bag, denormalizePersisted));
    }
    return results;
};
/** @type {?} */
var denormaliseStoreResource = function (item, storeData, bag, denormalizePersisted) {
    if (bag === void 0) {
        bag = {};
    }
    if (denormalizePersisted === void 0) {
        denormalizePersisted = false;
    }
    if (!item) {
        return null;
    }
    if (lodash.isUndefined(bag[item.type])) {
        bag[item.type] = {};
    }
    if (lodash.isUndefined(bag[item.type][item.id])) {
        /** @type {?} */
        var storeResource = __assign({}, item);
        if (item.relationships) {
            storeResource.relationships = __assign({}, item.relationships);
        }
        bag[storeResource.type][storeResource.id] = storeResource;
        storeResource = denormaliseObject(storeResource, storeData, bag, denormalizePersisted);
        if (storeResource.persistedResource && denormalizePersisted) {
            storeResource.persistedResource = denormaliseObject(storeResource.persistedResource, storeData, bag, denormalizePersisted);
        }
    }
    return bag[item.type][item.id];
};
/** @type {?} */
var getSingleStoreResource = function (resourceId, storeData) {
    return lodash.get(storeData, [resourceId.type, resourceId.id], null);
};
/** @type {?} */
var getMultipleStoreResource = function (resourceIds, resources) {
    return resourceIds.map(function (id) { return getSingleStoreResource(id, resources); });
};
/** @type {?} */
var getDenormalisedPath = function (path, baseResourceType, resourceDefinitions, pathSeparator) {
    /** @type {?} */
    var denormPath = [];
    if (lodash.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    /** @type {?} */
    var fields = path.split(pathSeparator);
    /** @type {?} */
    var currentResourceType = baseResourceType;
    for (var i = 0; i < fields.length; i++) {
        /** @type {?} */
        var definition = lodash.find(resourceDefinitions, { type: currentResourceType });
        if (lodash.isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (lodash.isUndefined(definition.attributes) &&
            lodash.isUndefined(definition.relationships)) {
            throw new Error('Attributes or Relationships must be provided');
        }
        if (definition.attributes.hasOwnProperty(fields[i])) {
            denormPath.push('attributes', fields[i]);
            break;
        }
        else if (definition.relationships.hasOwnProperty(fields[i])) {
            /** @type {?} */
            var resourceRelation = definition.relationships[fields[i]];
            if (resourceRelation.relationType === 'hasMany') {
                if (i !== fields.length - 1) {
                    throw new Error('Cannot filter past a hasMany relation');
                }
                else {
                    denormPath.push('relationships', fields[i], 'reference');
                }
            }
            else {
                currentResourceType = resourceRelation.type;
                denormPath.push('relationships', fields[i], 'reference');
            }
        }
        else {
            throw new Error('Cannot find field in attributes or relationships');
        }
    }
    return denormPath.join(pathSeparator);
};
/** @type {?} */
var getDenormalisedValue = function (path, storeResource, resourceDefinitions, pathSeparator) {
    /** @type {?} */
    var denormalisedPath = getDenormalisedPath(path, storeResource.type, resourceDefinitions, pathSeparator);
    return lodash.get(storeResource, denormalisedPath);
};
/** *
 * Given two objects, it will merge the second in the first.
 *
  @type {?} */
var updateResourceObject = function (original, source) {
    /**
     * @param {?} objValue
     * @param {?} srcValue
     * @return {?}
     */
    function customizer(objValue, srcValue) {
        if (lodash.isArray(objValue)) {
            return srcValue;
        }
    }
    return lodash.mergeWith({}, original, source, customizer);
};
/** *
 * Insert a StoreResource given the Resource and the StoreResources
 *
  @type {?} */
var insertStoreResource = function (storeResources, resource, fromServer) {
    /** @type {?} */
    var newStoreResources = __assign({}, storeResources);
    if (fromServer) {
        newStoreResources[resource.id] = /** @type {?} */ (__assign({}, resource, { persistedResource: resource, state: 'IN_SYNC', errors: [], loading: false }));
    }
    else {
        newStoreResources[resource.id] = /** @type {?} */ (__assign({}, resource, { persistedResource: null, state: 'CREATED', errors: [], loading: false }));
    }
    return lodash.isEqual(storeResources, newStoreResources)
        ? storeResources
        : newStoreResources;
};
/** *
 * Removes a StoreResource given the Resource and the StoreResources
 *
  @type {?} */
var removeStoreResource = function (storeData, resourceId) {
    if (storeData[resourceId.type][resourceId.id]) {
        /** @type {?} */
        var newState = __assign({}, storeData);
        newState[resourceId.type] = __assign({}, newState[resourceId.type]);
        delete newState[resourceId.type][resourceId.id];
        return newState;
    }
    return storeData;
};
/** *
 * Updates the state of a StoreResource in the store.
 *
 * \@param storeData
 * \@param resourceId
 * \@param resourceState
 * \@param loading
 * \@return
  @type {?} */
var updateResourceState = function (storeData, resourceId, resourceState, loading) {
    if (lodash.isUndefined(storeData[resourceId.type]) ||
        lodash.isUndefined(storeData[resourceId.type][resourceId.id])) {
        if (resourceState === 'DELETED') {
            /** @type {?} */
            var newState_1 = __assign({}, storeData);
            newState_1[resourceId.type] = __assign({}, newState_1[resourceId.type]);
            newState_1[resourceId.type][resourceId.id] = __assign({}, newState_1[resourceId.type][resourceId.id]);
            newState_1[resourceId.type][resourceId.id] = /** @type {?} */ ({
                type: resourceId.type,
                id: resourceId.id,
                persistedResource: null,
            });
            newState_1[resourceId.type][resourceId.id].state = 'NOT_LOADED';
            return newState_1;
        }
        else {
            return storeData;
        }
    }
    /** @type {?} */
    var newState = __assign({}, storeData);
    newState[resourceId.type] = __assign({}, newState[resourceId.type]);
    newState[resourceId.type][resourceId.id] = __assign({}, newState[resourceId.type][resourceId.id]);
    if (resourceState !== null) {
        newState[resourceId.type][resourceId.id].state = resourceState;
    }
    if (loading != null) {
        newState[resourceId.type][resourceId.id].loading = loading;
    }
    return newState;
};
/** *
 * Check equality of resource and ignore additional contents used by the
 * store (state, persistedResource, etc.)
 * \@param resource0
 * \@param resource1
 * \@return
  @type {?} */
var isEqualResource = function (resource0, resource1) {
    if (resource0 === resource1) {
        return true;
    }
    if ((resource0 !== null) !== (resource1 !== null)) {
        return false;
    }
    return (lodash.isEqual(resource0.id, resource1.id) &&
        lodash.isEqual(resource0.type, resource1.type) &&
        lodash.isEqual(resource0.attributes, resource1.attributes) &&
        lodash.isEqual(resource0.meta, resource1.meta) &&
        lodash.isEqual(resource0.links, resource1.links) &&
        lodash.isEqual(resource0.relationships, resource1.relationships));
};
/** @type {?} */
var updateStoreResource = function (state, resource, fromServer) {
    /** @type {?} */
    var foundStoreResource = state[resource.id];
    /** @type {?} */
    var persistedResource = state[resource.id].persistedResource;
    /** @type {?} */
    var newResource;
    /** @type {?} */
    var newResourceState;
    if (fromServer) {
        // form server, override everything
        // TODO need to handle check and keep local updates?
        newResource = resource;
        persistedResource = resource;
        newResourceState = 'IN_SYNC';
    }
    else {
        /** @type {?} */
        var mergedResource = updateResourceObject(foundStoreResource, resource);
        if (isEqualResource(mergedResource, persistedResource)) {
            // no changes anymore, do nothing
            newResource = persistedResource;
            newResourceState = 'IN_SYNC';
        }
        else {
            // merge changes and mark as CREATED or UPDATED depending on whether
            // an original version is available
            newResource = mergedResource;
            if (persistedResource !== null) {
                newResourceState = 'UPDATED';
            }
            else if (foundStoreResource.state === 'NEW') {
                newResourceState = 'NEW';
            }
            else {
                newResourceState = 'CREATED';
            }
        }
    }
    /** @type {?} */
    var newState = __assign({}, state);
    newState[resource.id] = /** @type {?} */ (__assign({}, newResource, { persistedResource: persistedResource, state: newResourceState, errors: [], loading: false }));
    return lodash.isEqual(newState[resource.id], state[resource.id])
        ? state
        : newState;
};
/** @type {?} */
var updateQueriesForDeletedResource = function (state, deletedId) {
    /** @type {?} */
    var newState = state;
    for (var queryId in state) {
        if (state.hasOwnProperty(queryId)) {
            /** @type {?} */
            var queryState = state[queryId];
            if (queryState.query.id === deletedId.id &&
                queryState.query.type === deletedId.type) {
                // found a query for a resource that was deleted => modify to 404
                newState = clearQueryResult(newState, queryState.query.queryId);
                /** @type {?} */
                var notFoundError = { code: '404', status: 'Not Found' };
                newState[queryState.query.queryId].errors = [notFoundError];
            }
        }
    }
    return newState;
};
/** @type {?} */
var updateResourceErrorsForQuery = function (storeData, query, document) {
    if (!query.type || !query.id || document.data instanceof Array) {
        throw new Error('invalid parameters');
    }
    return updateResourceErrors(storeData, { id: query.id, type: query.type }, document.errors, 'SET');
};
/** @type {?} */
var updateResourceErrors = function (storeData, id, errors, modificationType) {
    var _a, _b, _c;
    if (!storeData[id.type] || !storeData[id.type][id.id]) {
        return storeData;
    }
    /** @type {?} */
    var newState = __assign({}, storeData);
    newState[id.type] = __assign({}, newState[id.type]);
    /** @type {?} */
    var storeResource = __assign({}, newState[id.type][id.id]);
    if (modificationType === 'SET') {
        storeResource.errors = [];
        if (errors) {
            (_a = storeResource.errors).push.apply(_a, errors);
        }
    }
    else if (modificationType === 'ADD') {
        /** @type {?} */
        var currentErrors = storeResource.errors;
        storeResource.errors = [];
        if (currentErrors) {
            (_b = storeResource.errors).push.apply(_b, currentErrors);
        }
        if (errors) {
            (_c = storeResource.errors).push.apply(_c, errors);
        }
    }
    else {
        /** @type {?} */
        var currentErrors = storeResource.errors;
        storeResource.errors = [];
        if (currentErrors) {
            var _loop_1 = function (currentError) {
                /** @type {?} */
                var remove = errors && errors.filter(function (it) { return lodash.isEqual(it, currentError); }).length > 0;
                if (!remove) {
                    storeResource.errors.push(currentError);
                }
            };
            for (var _i = 0, currentErrors_1 = currentErrors; _i < currentErrors_1.length; _i++) {
                var currentError = currentErrors_1[_i];
                _loop_1(currentError);
            }
        }
    }
    newState[id.type][id.id] = storeResource;
    return newState;
};
/**
 * @param {?} newState
 * @param {?} type
 * @param {?} id
 * @return {?}
 */
function rollbackResource(newState, type, id) {
    /** @type {?} */
    var storeResource = newState[type][id];
    if (!storeResource.persistedResource) {
        delete newState[type][id];
    }
    else if (storeResource.state !== 'IN_SYNC') {
        newState[type][id] = /** @type {?} */ (__assign({}, newState[type][id], { state: 'IN_SYNC', resource: newState[type][id].persistedResource }));
    }
}
/** @type {?} */
var rollbackStoreResources = function (storeData, ids, include) {
    /** @type {?} */
    var newState = __assign({}, storeData);
    if (lodash.isUndefined(ids)) {
        Object.keys(newState).forEach(function (type) {
            newState[type] = __assign({}, newState[type]);
            Object.keys(newState[type]).forEach(function (id) {
                rollbackResource(newState, type, id);
            });
        });
    }
    else {
        /** @type {?} */
        var modifiedResources = getPendingChanges(newState, ids, include, true);
        for (var _i = 0, modifiedResources_1 = modifiedResources; _i < modifiedResources_1.length; _i++) {
            var modifiedResource = modifiedResources_1[_i];
            rollbackResource(newState, modifiedResource.type, modifiedResource.id);
        }
    }
    return newState;
};
/** @type {?} */
var deleteStoreResources = function (storeData, query) {
    /** @type {?} */
    var newState = __assign({}, storeData);
    // if an id is not provided, all resources of the provided type will be deleted
    if (typeof query.id === 'undefined') {
        newState[query.type] = {};
    }
    else {
        newState[query.type] = /** @type {?} */ (lodash.omit(newState[query.type], [
            query.id,
        ]));
    }
    return newState;
};
/** @type {?} */
var clearQueryResult = function (storeData, queryId) {
    /** @type {?} */
    var newQuery = __assign({}, storeData[queryId]);
    delete newQuery.resultIds;
    delete newQuery.errors;
    delete newQuery.meta;
    delete newQuery.links;
    /** @type {?} */
    var newState = __assign({}, storeData);
    newState[queryId] = newQuery;
    return newState;
};
/** *
 * Updates a given storeData by either inserting a resource or updating
 * an existing resource.
 *
 * \@param storeData
 * \@param resource
 * \@param fromServer
 * \@param override
 *
 * \@return a new NgrxJsonApiStoreData with an inserted/updated resource.
  @type {?} */
var updateStoreDataFromResource = function (storeData, resource, fromServer, override) {
    if (lodash.isUndefined(storeData[resource.type])) {
        /** @type {?} */
        var newStoreData = __assign({}, storeData);
        newStoreData[resource.type] = {};
        newStoreData[resource.type] = insertStoreResource(newStoreData[resource.type], resource, fromServer);
        return newStoreData;
    }
    else if (lodash.isUndefined(storeData[resource.type][resource.id]) || override) {
        /** @type {?} */
        var updatedStoreResources = insertStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            /** @type {?} */
            var newStoreData = __assign({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
    else {
        /** @type {?} */
        var updatedStoreResources = updateStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            /** @type {?} */
            var newStoreData = __assign({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
};
/** @type {?} */
var updateStoreDataFromPayload = function (storeData, payload) {
    /** @type {?} */
    var data = /** @type {?} */ (lodash.get(payload, 'data'));
    if (lodash.isUndefined(data)) {
        return storeData;
    }
    /** @type {?} */
    var resources = lodash.isArray(data)
        ? /** @type {?} */ (data) : /** @type {?} */ ([data]);
    /** @type {?} */
    var included = /** @type {?} */ (lodash.get(payload, 'included'));
    if (!lodash.isUndefined(included)) {
        resources = resources.concat(included);
    }
    /** @type {?} */
    var newStoreData = __assign({}, storeData);
    /** @type {?} */
    var hasChange = false;
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        /** @type {?} */
        var storeResource = /** @type {?} */ (__assign({}, resource, { persistedResource: resource, state: 'IN_SYNC', errors: [], loading: false }));
        if (!lodash.isEqual(storeResource, resource)) {
            hasChange = true;
            if (!newStoreData[resource.type]) {
                newStoreData[resource.type] = {};
            }
            else if (newStoreData[resource.type] === storeData[resource.type]) {
                newStoreData[resource.type] = __assign({}, storeData[resource.type]);
            }
            newStoreData[resource.type][resource.id] = storeResource;
        }
    }
    return hasChange ? newStoreData : storeData;
};
/** *
 * Updates the storeQueries by either adding a new ResourceQueryStore
 * or modifying an existing one.
 *
 * \@param storeQueries
 * \@param query
 *
 * \@return a new NgrxJsonApiStoreQueries with the inserted/modified
 * ResourceQueryStore
  @type {?} */
var updateQueryParams = function (storeQueries, query) {
    if (!query.queryId) {
        return storeQueries;
    }
    /** @type {?} */
    var newStoreQuery = __assign({}, storeQueries[query.queryId]);
    newStoreQuery.loading = true;
    newStoreQuery.query = lodash.cloneDeep(query);
    if (lodash.isUndefined(newStoreQuery.errors)) {
        newStoreQuery.errors = [];
    }
    /** @type {?} */
    var newStoreQueries = __assign({}, storeQueries);
    newStoreQueries[newStoreQuery.query.queryId] = newStoreQuery;
    return newStoreQueries;
};
/** *
 * Updates the query results for given a queryId and the results.
  @type {?} */
var updateQueryResults = function (storeQueries, queryId, document) {
    /** @type {?} */
    var storeQuery = storeQueries[queryId];
    if (storeQuery) {
        /** @type {?} */
        var data = lodash.isArray(document.data) ? document.data : [document.data];
        /** @type {?} */
        var newQueryStore = __assign({}, storeQuery, { resultIds: data.map(function (it) { return (it ? toResourceIdentifier(it) : []); }), meta: document.meta, links: document.links, loading: false });
        if (!lodash.isEqual(newQueryStore, storeQuery)) {
            /** @type {?} */
            var newState = __assign({}, storeQueries);
            newState[queryId] = /** @type {?} */ (newQueryStore);
            return newState;
        }
    }
    return storeQueries;
};
/** *
 * Update the query errors given the queryId and a storeQueries and the
 * document containing the error
 *
 *
  @type {?} */
var updateQueryErrors = function (storeQueries, queryId, document) {
    var _a;
    if (!queryId || !storeQueries[queryId]) {
        return storeQueries;
    }
    /** @type {?} */
    var newState = __assign({}, storeQueries);
    /** @type {?} */
    var newStoreQuery = __assign({}, newState[queryId]);
    newStoreQuery.errors = [];
    newStoreQuery.loading = false;
    if (document.errors) {
        (_a = newStoreQuery.errors).push.apply(_a, document.errors);
    }
    newState[queryId] = newStoreQuery;
    return newState;
};
/** *
 * Removes a query given its queryId from the NgrxJsonApiStoreQueries.
  @type {?} */
var removeQuery = function (storeQueries, queryId) {
    /** @type {?} */
    var newState = __assign({}, storeQueries);
    delete newState[queryId];
    return newState;
};
/** *
 * Given a resource, it will return an object containing the resource id and type.
  @type {?} */
var toResourceIdentifier = function (resource) {
    return { type: resource.type, id: resource.id };
};
/** *
 * Get the value for the last field in a given fitering path.
 *
 * \@param path
 * \@param baseStoreResource
 * \@param storeData
 * \@param resourceDefinitions
 * \@param pathSepartor
 * \@return the value of the last field in the path.
  @type {?} */
var getResourceFieldValueFromPath = function (path, baseStoreResource, storeData, resourceDefinitions, pathSeparator) {
    if (lodash.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    /** @type {?} */
    var fields = path.split(pathSeparator);
    /** @type {?} */
    var currentStoreResource = baseStoreResource;
    for (var i = 0; i < fields.length; i++) {
        /** @type {?} */
        var definition = lodash.find(resourceDefinitions, {
            type: currentStoreResource.type,
        });
        if (lodash.isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (lodash.isUndefined(definition.attributes) &&
            lodash.isUndefined(definition.relationships)) {
            throw new Error('Attributes or Relationships must be provided');
        }
        if (fields[i] === 'id') {
            return lodash.get(currentStoreResource, 'id', null);
        }
        else if (definition.attributes.hasOwnProperty(fields[i])) {
            return lodash.get(currentStoreResource, 'attributes.' + fields[i], null);
        }
        else if (definition.relationships.hasOwnProperty(fields[i])) {
            if (i === fields.length - 1) {
                throw new Error('The last field in the filtering path cannot be a relation');
            }
            /** @type {?} */
            var resourceRelation = definition.relationships[fields[i]];
            if (resourceRelation.relationType === 'hasMany') {
                throw new Error('Cannot filter past a hasMany relation');
            }
            else {
                /** @type {?} */
                var relation = lodash.get(currentStoreResource, 'relationships.' + fields[i], null);
                if (!relation || !relation.data) {
                    return null;
                }
                else {
                    /** @type {?} */
                    var relatedPath = [resourceRelation.type, relation.data.id];
                    currentStoreResource = lodash.get(storeData, relatedPath);
                }
            }
        }
        else {
            throw new Error('Cannot find field in attributes or relationships');
        }
        if (lodash.isUndefined(currentStoreResource)) {
            return null;
        }
    }
};
/** @type {?} */
var filterResources = function (resources, storeData, query, resourceDefinitions, filteringConfig) {
    return lodash.filter(resources, function (resource) {
        if (query.hasOwnProperty('params') &&
            query.params.hasOwnProperty('filtering')) {
            return query.params.filtering.every(function (element) {
                /** @type {?} */
                var pathSeparator;
                /** @type {?} */
                var filteringOperators;
                if (!lodash.isUndefined(filteringConfig)) {
                    pathSeparator = /** @type {?} */ (lodash.get(filteringConfig, 'pathSeparator'));
                    filteringOperators = /** @type {?} */ (lodash.get(filteringConfig, 'filteringOperators'));
                }
                /** @type {?} */
                var resourceFieldValue = getResourceFieldValueFromPath(element.path, resource, storeData, resourceDefinitions, pathSeparator);
                if (!resourceFieldValue) {
                    return false;
                }
                /** @type {?} */
                var operator = /** @type {?} */ (lodash.find(filteringOperators, {
                    name: element.operator,
                }));
                if (operator) {
                    return operator.comparison(element.value, resourceFieldValue);
                }
                element.operator = element.hasOwnProperty('operator')
                    ? element.operator
                    : 'iexact';
                switch (element.operator) {
                    case 'iexact':
                        if (lodash.isString(element.value) && lodash.isString(resourceFieldValue)) {
                            return (element.value.toLowerCase() === resourceFieldValue.toLowerCase());
                        }
                        else {
                            return element.value === resourceFieldValue;
                        }
                    case 'exact':
                        return element.value === resourceFieldValue;
                    case 'contains':
                        return lodash.includes(resourceFieldValue, element.value);
                    case 'icontains':
                        return lodash.includes(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'in':
                        if (lodash.isArray(element.value)) {
                            return lodash.includes(element.value, resourceFieldValue);
                        }
                        else {
                            return lodash.includes([element.value], resourceFieldValue);
                        }
                    case 'gt':
                        return element.value > resourceFieldValue;
                    case 'gte':
                        return element.value >= resourceFieldValue;
                    case 'lt':
                        return element.value < resourceFieldValue;
                    case 'lte':
                        return element.value <= resourceFieldValue;
                    case 'startswith':
                        return lodash.startsWith(resourceFieldValue, element.value);
                    case 'istartswith':
                        return lodash.startsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'endswith':
                        return lodash.endsWith(resourceFieldValue, element.value);
                    case 'iendswith':
                        return lodash.endsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    default:
                        return true;
                }
            });
        }
        else {
            return true;
        }
    });
};
/** @type {?} */
var generateIncludedQueryParams = function (included) {
    if (lodash.isEmpty(included)) {
        return '';
    }
    return 'include=' + included.join();
};
/** @type {?} */
var generateFieldsQueryParams = function (fields) {
    if (lodash.isEmpty(fields)) {
        return '';
    }
    return 'fields=' + fields.join();
};
/** @type {?} */
var generateFilteringQueryParams = function (filtering) {
    if (lodash.isEmpty(filtering)) {
        return '';
    }
    /** @type {?} */
    var filteringParams = filtering.map(function (f) {
        return ('filter' +
            (f.path ? '[' + f.path + ']' : '') +
            (f.operator ? '[' + f.operator + ']' : '') +
            '=' +
            encodeURIComponent(f.value));
    });
    return filteringParams.join('&');
};
/** @type {?} */
var generateSortingQueryParams = function (sorting) {
    if (lodash.isEmpty(sorting)) {
        return '';
    }
    return ('sort=' +
        sorting
            .map(function (f) { return (f.direction === Direction.ASC ? '' : '-') + f.api; })
            .join(','));
};
/** @type {?} */
var generateQueryParams = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    /** @type {?} */
    var newParams = params.filter(function (p) { return p !== ''; });
    if (newParams.length !== 0) {
        return '?' + newParams.join('&');
    }
    else {
        return '';
    }
};
/** @type {?} */
var generatePayload = function (resource, operation) {
    /** @type {?} */
    var payload = {
        query: {
            type: resource.type,
        },
    };
    // the data to be updated or created
    if (operation === 'POST' || operation === 'PATCH') {
        payload.jsonApiData = __assign({ data: {
                id: resource.id,
                type: resource.type,
                attributes: resource.attributes,
                relationships: resource.relationships,
            } }, (resource.meta
            ? {
                meta: resource.meta,
            }
            : null));
    }
    if (operation === 'POST' && resource.hasTemporaryId) {
        delete payload.jsonApiData.data.id;
    }
    if (resource.isMetaOnly) {
        delete payload.jsonApiData.data;
    }
    // 'DELETE' only needs a query and it also needs an id in its query
    // 'PATCH' also needs an id in its query
    // 'POST' needed locally to allow to write back errors to store if id is available
    if (operation === 'PATCH' || operation === 'DELETE' || operation === 'POST') {
        payload.query.id = resource.id;
    }
    return payload;
};
/** @type {?} */
var uuid = function () {
    /** @type {?} */
    var lut = [];
    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }
    /** @type {?} */
    var d0 = (Math.random() * 0xffffffff) | 0;
    /** @type {?} */
    var d1 = (Math.random() * 0xffffffff) | 0;
    /** @type {?} */
    var d2 = (Math.random() * 0xffffffff) | 0;
    /** @type {?} */
    var d3 = (Math.random() * 0xffffffff) | 0;
    return (lut[d0 & 0xff] +
        lut[(d0 >> 8) & 0xff] +
        lut[(d0 >> 16) & 0xff] +
        lut[(d0 >> 24) & 0xff] +
        '-' +
        lut[d1 & 0xff] +
        lut[(d1 >> 8) & 0xff] +
        '-' +
        lut[((d1 >> 16) & 0x0f) | 0x40] +
        lut[(d1 >> 24) & 0xff] +
        '-' +
        lut[(d2 & 0x3f) | 0x80] +
        lut[(d2 >> 8) & 0xff] +
        '-' +
        lut[(d2 >> 16) & 0xff] +
        lut[(d2 >> 24) & 0xff] +
        lut[d3 & 0xff] +
        lut[(d3 >> 8) & 0xff] +
        lut[(d3 >> 16) & 0xff] +
        lut[(d3 >> 24) & 0xff]);
};
/** @type {?} */
var toKey = function (id) {
    return id.id + '@' + id.type;
};
/** @type {?} */
var collectQueryResults = function (state, usedResources) {
    for (var queryName in state.queries) {
        if (state.queries.hasOwnProperty(queryName)) {
            /** @type {?} */
            var query = state.queries[queryName];
            if (query.resultIds) {
                for (var _i = 0, _a = query.resultIds; _i < _a.length; _i++) {
                    var resultId = _a[_i];
                    usedResources[toKey(resultId)] = true;
                }
            }
        }
    }
};
/** @type {?} */
var collectPendingChanges = function (state, usedResources) {
    for (var type in state.data) {
        if (state.data.hasOwnProperty(type)) {
            /** @type {?} */
            var resources = state.data[type];
            for (var id in resources) {
                if (resources.hasOwnProperty(id)) {
                    /** @type {?} */
                    var resource = resources[id];
                    if (resource.state !== 'IN_SYNC') {
                        usedResources[toKey(resource)] = true;
                    }
                }
            }
        }
    }
};
/** @type {?} */
var collectReferencesForResource = function (state, usedResources, resource) {
    /** @type {?} */
    var hasChanges;
    for (var relationshipName in resource.relationships) {
        if (resource.relationships.hasOwnProperty(relationshipName)) {
            /** @type {?} */
            var data = resource.relationships[relationshipName].data;
            if (data) {
                /** @type {?} */
                var dependencyIds = data instanceof Array ? data : [data];
                for (var _i = 0, dependencyIds_1 = dependencyIds; _i < dependencyIds_1.length; _i++) {
                    var dependencyId = dependencyIds_1[_i];
                    /** @type {?} */
                    var dependencyKey = toKey(dependencyId);
                    if (!usedResources[dependencyKey]) {
                        // change found, an other iteration will be necssary to detect
                        // transitive dependencies
                        hasChanges = true;
                        usedResources[dependencyKey] = true;
                    }
                }
            }
        }
    }
    return hasChanges;
};
/** @type {?} */
var collectReferences = function (state, usedResources) {
    while (true) {
        /** @type {?} */
        var hasChanges = false;
        for (var type in state.data) {
            if (state.data.hasOwnProperty(type)) {
                /** @type {?} */
                var resources = state.data[type];
                for (var id in resources) {
                    if (resources.hasOwnProperty(id)) {
                        /** @type {?} */
                        var resource = resources[id];
                        if (usedResources[toKey(resource)]) {
                            // in use, do not collect its relations
                            hasChanges =
                                hasChanges ||
                                    collectReferencesForResource(state, usedResources, resource);
                        }
                    }
                }
            }
        }
        if (!hasChanges) {
            break;
        }
    }
};
/** @type {?} */
var sweepUnusedResources = function (state, usedResources) {
    /** @type {?} */
    var hasDeletions = false;
    /** @type {?} */
    var newState = lodash.cloneDeep(state);
    for (var type in newState.data) {
        if (newState.data.hasOwnProperty(type)) {
            /** @type {?} */
            var resources = newState.data[type];
            for (var id in resources) {
                if (resources.hasOwnProperty(id)) {
                    /** @type {?} */
                    var resource = resources[id];
                    if (!usedResources[toKey(resource)]) {
                        hasDeletions = true;
                        delete resources[id];
                    }
                }
            }
            if (lodash.isEmpty(resources)) {
                delete newState.data[type];
            }
        }
    }
    return hasDeletions ? newState : state;
};
/** @type {?} */
var compactStore = function (state) {
    /** @type {?} */
    var usedResources = {};
    // query results can not be collected
    collectQueryResults(state, usedResources);
    // pending changes cannot be collected
    collectPendingChanges(state, usedResources);
    // references from non-collected objects cannot be collected as well
    collectReferences(state, usedResources);
    // remove everything that is not collected
    return sweepUnusedResources(state, usedResources);
};
/** @type {?} */
var sortPendingChanges = function (pendingResources) {
    /** @type {?} */
    var dependencies = {};
    /** @type {?} */
    var pendingMap = {};
    for (var _i = 0, pendingResources_1 = pendingResources; _i < pendingResources_1.length; _i++) {
        var pendingResource = pendingResources_1[_i];
        /** @type {?} */
        var resource = pendingResource;
        /** @type {?} */
        var key = toKey(resource);
        dependencies[key] = [];
        pendingMap[key] = pendingResource;
    }
    var _loop_2 = function (pendingResource) {
        /** @type {?} */
        var resource = pendingResource;
        if (resource.relationships) {
            /** @type {?} */
            var key_1 = toKey(resource);
            Object.keys(resource.relationships).forEach(function (relationshipName) {
                /** @type {?} */
                var data = resource.relationships[relationshipName].data;
                if (data) {
                    /** @type {?} */
                    var dependencyIds = data instanceof Array ? data : [data];
                    for (var _i = 0, dependencyIds_2 = dependencyIds; _i < dependencyIds_2.length; _i++) {
                        var dependencyId = dependencyIds_2[_i];
                        /** @type {?} */
                        var dependencyKey = toKey(dependencyId);
                        if (pendingMap[dependencyKey] &&
                            pendingMap[dependencyKey].state === 'CREATED') {
                            // we have a dependency between two unsaved objects
                            dependencies[key_1].push(pendingMap[dependencyKey]);
                        }
                    }
                }
            });
        }
    };
    // extract dependencies
    for (var _a = 0, pendingResources_2 = pendingResources; _a < pendingResources_2.length; _a++) {
        var pendingResource = pendingResources_2[_a];
        _loop_2(pendingResource);
    }
    /** @type {?} */
    var context = {
        pendingResources: pendingResources,
        cursor: pendingResources.length,
        sorted: new Array(pendingResources.length),
        dependencies: dependencies,
        visited: /** @type {?} */ ([]),
    };
    /** @type {?} */
    var i = context.cursor;
    while (i--) {
        if (!context.visited[i]) {
            visitPending(pendingResources[i], i, [], context);
        }
    }
    return context.sorted.reverse();
};
/** @type {?} */
var visitPending = function (pendingResource, i, predecessors, context) {
    /** @type {?} */
    var key = toKey(pendingResource);
    if (predecessors.indexOf(key) >= 0) {
        throw new Error('Cyclic dependency: ' + key + ' with ' + JSON.stringify(predecessors));
    }
    if (context.visited[i]) {
        return;
    }
    context.visited[i] = true;
    /** @type {?} */
    var outgoing = context.dependencies[key];
    /** @type {?} */
    var preds = predecessors.concat(key);
    for (var _i = 0, outgoing_1 = outgoing; _i < outgoing_1.length; _i++) {
        var child = outgoing_1[_i];
        visitPending(child, context.pendingResources.indexOf(child), preds, context);
    }
    context.sorted[--context.cursor] = pendingResource;
};
/**
 * @param {?} state
 * @param {?} pending
 * @param {?} id
 * @param {?} include
 * @param {?} includeNew
 * @return {?}
 */
function collectPendingChange(state, pending, id, include, includeNew) {
    /** @type {?} */
    var storeResource = state[id.type][id.id];
    if (storeResource.state !== 'IN_SYNC' &&
        (storeResource.state !== 'NEW' || includeNew)) {
        pending.push(storeResource);
    }
    var _loop_3 = function (includeElement) {
        if (includeElement.length > 0) {
            /** @type {?} */
            var relationshipName_1 = includeElement[0];
            if (storeResource.relationships &&
                storeResource.relationships[relationshipName_1]) {
                /** @type {?} */
                var data = storeResource.relationships[relationshipName_1].data;
                if (data) {
                    /** @type {?} */
                    var relationInclude_1 = [];
                    include
                        .filter(function (relIncludeElem) {
                        return relIncludeElem.length >= 2 &&
                            relIncludeElem[0] == relationshipName_1;
                    })
                        .forEach(function (relIncludeElem) {
                        return relationInclude_1.push(relIncludeElem.slice(1));
                    });
                    if (lodash.isArray(data)) {
                        /** @type {?} */
                        var relationIds = /** @type {?} */ (data);
                        relationIds.forEach(function (relationId) {
                            return collectPendingChange(state, pending, relationId, relationInclude_1, includeNew);
                        });
                    }
                    else {
                        /** @type {?} */
                        var relationId = /** @type {?} */ (data);
                        collectPendingChange(state, pending, relationId, relationInclude_1, includeNew);
                    }
                }
            }
        }
    };
    for (var _i = 0, include_1 = include; _i < include_1.length; _i++) {
        var includeElement = include_1[_i];
        _loop_3(includeElement);
    }
}
/**
 * @param {?} state
 * @param {?} ids
 * @param {?} include
 * @param {?=} includeNew
 * @return {?}
 */
function getPendingChanges(state, ids, include, includeNew) {
    /** @type {?} */
    var pending = [];
    if (lodash.isUndefined(ids)) {
        // check all
        Object.keys(state).forEach(function (type) {
            Object.keys(state[type]).forEach(function (id) {
                /** @type {?} */
                var storeResource = state[type][id];
                if (storeResource.state !== 'IN_SYNC' &&
                    (storeResource.state !== 'NEW' || includeNew)) {
                    pending.push(storeResource);
                }
            });
        });
    }
    else {
        /** @type {?} */
        var relationshipInclusions = [];
        if (include) {
            for (var _i = 0, include_2 = include; _i < include_2.length; _i++) {
                var includeElement = include_2[_i];
                relationshipInclusions.push(includeElement.split('.'));
            }
        }
        for (var _a = 0, ids_1 = ids; _a < ids_1.length; _a++) {
            var id = ids_1[_a];
            collectPendingChange(state, pending, id, relationshipInclusions, includeNew);
        }
        pending = lodash.uniqBy(pending, function (e) {
            return e.type + '####' + e.id;
        });
    }
    return pending;
}
var __assign$1 = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function selectNgrxJson() {
    return function (state$) {
        return ( /** @type {?} */(state$)).pipe(store.select('NgrxJsonApi'), operators.map(function (it) { return (it); }), operators.filter(function (it) { return !lodash.isUndefined(it); }));
    };
}
/**
 * @return {?}
 */
function selectNgrxJsonApiDefaultZone() {
    return selectNgrxJsonApiZone(NGRX_JSON_API_DEFAULT_ZONE);
}
/**
 * @param {?} zoneId
 * @return {?}
 */
function selectNgrxJsonApiZone(zoneId) {
    return function (state$) {
        return ( /** @type {?} */(state$))
            .let(selectNgrxJson())
            .map(function (it) { return (it.zones[zoneId]); });
    };
}
/**
 * @param {?} state
 * @param {?} zoneId
 * @return {?}
 */
function getNgrxJsonApiZone(state, zoneId) {
    return /** @type {?} */ (state['NgrxJsonApi']['zones'][zoneId]);
}
/**
 * @param {?} queryId
 * @return {?}
 */
function selectStoreQuery(queryId) {
    return function (state$) {
        return state$.map(function (state) { return state.queries[queryId]; });
    };
}
/**
 * @param {?} type
 * @return {?}
 */
function selectStoreResourcesOfType(type) {
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
function selectStoreResource(identifier) {
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
function selectStoreResources(identifiers) {
    return function (state$) {
        return state$.pipe(operators.map(function (state) { return state.data; }), operators.map(function (data) {
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
function selectManyQueryResult(queryId, denormalize) {
    return function (state$) {
        return state$.map(function (state) {
            /** @type {?} */
            var storeQuery = state.queries[queryId];
            if (!storeQuery) {
                return undefined;
            }
            if (lodash.isEmpty(storeQuery.resultIds)) {
                /** @type {?} */
                var queryResult = __assign$1({}, storeQuery, { data: lodash.isUndefined(storeQuery.resultIds) ? undefined : [] });
                return queryResult;
            }
            else {
                /** @type {?} */
                var results = storeQuery.resultIds.map(function (id) { return (state.data[id.type] ? state.data[id.type][id.id] : undefined); });
                if (denormalize) {
                    results = denormaliseStoreResources(results, state.data);
                }
                return __assign$1({}, storeQuery, { data: /** @type {?} */ (results) });
            }
        });
    };
}
/**
 * @param {?} queryId
 * @param {?=} denormalize
 * @return {?}
 */
function selectOneQueryResult(queryId, denormalize) {
    return function (state$) {
        return state$.map(function (state) {
            /** @type {?} */
            var storeQuery = state.queries[queryId];
            if (!storeQuery) {
                return undefined;
            }
            if (lodash.isEmpty(storeQuery.resultIds)) {
                /** @type {?} */
                var queryResult = __assign$1({}, storeQuery, { data: lodash.isUndefined(storeQuery.resultIds) ? undefined : null });
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
                var queryResult = __assign$1({}, storeQuery, { data: result });
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
function getNgrxJsonApiStore(state$) {
    return state$.let(selectNgrxJsonApiDefaultZone());
}
/**
 * deprecated, to not use any longer
 */
var NgrxJsonApiSelectors = /** @class */ (function () {
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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var NgrxJsonApiActionTypes = {
    API_POST_INIT: '[NgrxJsonApi] API_POST_INIT',
    API_POST_SUCCESS: '[NgrxJsonApi] API_POST_SUCCESS',
    API_POST_FAIL: '[NgrxJsonApi] API_POST_FAIL',
    API_GET_INIT: '[NgrxJsonApi] API_GET_INIT',
    API_GET_SUCCESS: '[NgrxJsonApi] API_GET_SUCCESS',
    API_GET_FAIL: '[NgrxJsonApi] API_GET_FAIL',
    API_PATCH_INIT: '[NgrxJsonApi] API_PATCH_INIT',
    API_PATCH_SUCCESS: '[NgrxJsonApi] API_PATCH_SUCCESS',
    API_PATCH_FAIL: '[NgrxJsonApi] API_PATCH_FAIL',
    API_DELETE_INIT: '[NgrxJsonApi] API_DELETE_INIT',
    API_DELETE_SUCCESS: '[NgrxJsonApi] API_DELETE_SUCCESS',
    API_DELETE_FAIL: '[NgrxJsonApi] API_DELETE_FAIL',
    API_APPLY_INIT: '[NgrxJsonApi] API_APPLY_INIT',
    API_APPLY_SUCCESS: '[NgrxJsonApi] API_APPLY_SUCCESS',
    API_APPLY_FAIL: '[NgrxJsonApi] API_APPLY_FAIL',
    API_ROLLBACK: '[NgrxJsonApi] API_ROLLBACK',
    API_QUERY_REFRESH: '[NgrxJsonApi] API_QUERY_REFRESH',
    LOCAL_QUERY_INIT: '[NgrxJsonApi] LOCAL_QUERY_INIT',
    LOCAL_QUERY_SUCCESS: '[NgrxJsonApi] LOCAL_QUERY_SUCCESS',
    LOCAL_QUERY_FAIL: '[NgrxJsonApi] LOCAL_QUERY_FAIL',
    DELETE_STORE_RESOURCE: '[NgrxJsonApi] DELETE_STORE_RESOURCE',
    PATCH_STORE_RESOURCE: '[NgrxJsonApi] PATCH_STORE_RESOURCE',
    NEW_STORE_RESOURCE: '[NgrxJsonApi] NEW_STORE_RESOURCE',
    POST_STORE_RESOURCE: '[NgrxJsonApi] POST_STORE_RESOURCE',
    MODIFY_STORE_RESOURCE_ERRORS: '[NgrxJsonApi] MODIFY_STORE_RESOURCE_ERRORS',
    REMOVE_QUERY: '[NgrxJsonApi] REMOVE_QUERY',
    COMPACT_STORE: '[NgrxJsonApi] COMPACT_STORE',
    CLEAR_STORE: '[NgrxJsonApi] CLEAR_STORE',
};
/**
 * @record
 */
/**
 * @record
 */
/**
 * @abstract
 */
var NgrxJsonApiAction = /** @class */ (function () {
    function NgrxJsonApiAction() {
    }
    return NgrxJsonApiAction;
}());
var ApiApplyInitAction = /** @class */ (function (_super) {
    __extends(ApiApplyInitAction, _super);
    function ApiApplyInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_APPLY_INIT;
        return _this;
    }
    return ApiApplyInitAction;
}(NgrxJsonApiAction));
var ApiApplySuccessAction = /** @class */ (function (_super) {
    __extends(ApiApplySuccessAction, _super);
    function ApiApplySuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_APPLY_SUCCESS;
        return _this;
    }
    return ApiApplySuccessAction;
}(NgrxJsonApiAction));
var ApiApplyFailAction = /** @class */ (function (_super) {
    __extends(ApiApplyFailAction, _super);
    function ApiApplyFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_APPLY_FAIL;
        return _this;
    }
    return ApiApplyFailAction;
}(NgrxJsonApiAction));
var ApiPostInitAction = /** @class */ (function (_super) {
    __extends(ApiPostInitAction, _super);
    function ApiPostInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_POST_INIT;
        return _this;
    }
    return ApiPostInitAction;
}(NgrxJsonApiAction));
var ApiPostSuccessAction = /** @class */ (function (_super) {
    __extends(ApiPostSuccessAction, _super);
    function ApiPostSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_POST_SUCCESS;
        return _this;
    }
    return ApiPostSuccessAction;
}(NgrxJsonApiAction));
var ApiPostFailAction = /** @class */ (function (_super) {
    __extends(ApiPostFailAction, _super);
    function ApiPostFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_POST_FAIL;
        return _this;
    }
    return ApiPostFailAction;
}(NgrxJsonApiAction));
var ApiDeleteInitAction = /** @class */ (function (_super) {
    __extends(ApiDeleteInitAction, _super);
    function ApiDeleteInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_DELETE_INIT;
        return _this;
    }
    return ApiDeleteInitAction;
}(NgrxJsonApiAction));
var ApiDeleteSuccessAction = /** @class */ (function (_super) {
    __extends(ApiDeleteSuccessAction, _super);
    function ApiDeleteSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_DELETE_SUCCESS;
        return _this;
    }
    return ApiDeleteSuccessAction;
}(NgrxJsonApiAction));
var ApiDeleteFailAction = /** @class */ (function (_super) {
    __extends(ApiDeleteFailAction, _super);
    function ApiDeleteFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_DELETE_FAIL;
        return _this;
    }
    return ApiDeleteFailAction;
}(NgrxJsonApiAction));
var ApiGetInitAction = /** @class */ (function (_super) {
    __extends(ApiGetInitAction, _super);
    function ApiGetInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_GET_INIT;
        return _this;
    }
    return ApiGetInitAction;
}(NgrxJsonApiAction));
var ApiGetSuccessAction = /** @class */ (function (_super) {
    __extends(ApiGetSuccessAction, _super);
    function ApiGetSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_GET_SUCCESS;
        return _this;
    }
    return ApiGetSuccessAction;
}(NgrxJsonApiAction));
var ApiGetFailAction = /** @class */ (function (_super) {
    __extends(ApiGetFailAction, _super);
    function ApiGetFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_GET_FAIL;
        return _this;
    }
    return ApiGetFailAction;
}(NgrxJsonApiAction));
var ApiRollbackAction = /** @class */ (function (_super) {
    __extends(ApiRollbackAction, _super);
    function ApiRollbackAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_ROLLBACK;
        return _this;
    }
    return ApiRollbackAction;
}(NgrxJsonApiAction));
var ApiPatchInitAction = /** @class */ (function (_super) {
    __extends(ApiPatchInitAction, _super);
    function ApiPatchInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_PATCH_INIT;
        return _this;
    }
    return ApiPatchInitAction;
}(NgrxJsonApiAction));
var ApiPatchSuccessAction = /** @class */ (function (_super) {
    __extends(ApiPatchSuccessAction, _super);
    function ApiPatchSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_PATCH_SUCCESS;
        return _this;
    }
    return ApiPatchSuccessAction;
}(NgrxJsonApiAction));
var ApiPatchFailAction = /** @class */ (function (_super) {
    __extends(ApiPatchFailAction, _super);
    function ApiPatchFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_PATCH_FAIL;
        return _this;
    }
    return ApiPatchFailAction;
}(NgrxJsonApiAction));
var DeleteStoreResourceAction = /** @class */ (function (_super) {
    __extends(DeleteStoreResourceAction, _super);
    function DeleteStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE;
        return _this;
    }
    return DeleteStoreResourceAction;
}(NgrxJsonApiAction));
var PatchStoreResourceAction = /** @class */ (function (_super) {
    __extends(PatchStoreResourceAction, _super);
    function PatchStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE;
        return _this;
    }
    return PatchStoreResourceAction;
}(NgrxJsonApiAction));
var NewStoreResourceAction = /** @class */ (function (_super) {
    __extends(NewStoreResourceAction, _super);
    function NewStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.NEW_STORE_RESOURCE;
        return _this;
    }
    return NewStoreResourceAction;
}(NgrxJsonApiAction));
var PostStoreResourceAction = /** @class */ (function (_super) {
    __extends(PostStoreResourceAction, _super);
    function PostStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.POST_STORE_RESOURCE;
        return _this;
    }
    return PostStoreResourceAction;
}(NgrxJsonApiAction));
var RemoveQueryAction = /** @class */ (function (_super) {
    __extends(RemoveQueryAction, _super);
    function RemoveQueryAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.REMOVE_QUERY;
        return _this;
    }
    return RemoveQueryAction;
}(NgrxJsonApiAction));
var LocalQueryInitAction = /** @class */ (function (_super) {
    __extends(LocalQueryInitAction, _super);
    function LocalQueryInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_INIT;
        return _this;
    }
    return LocalQueryInitAction;
}(NgrxJsonApiAction));
var LocalQuerySuccessAction = /** @class */ (function (_super) {
    __extends(LocalQuerySuccessAction, _super);
    function LocalQuerySuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS;
        return _this;
    }
    return LocalQuerySuccessAction;
}(NgrxJsonApiAction));
var LocalQueryFailAction = /** @class */ (function (_super) {
    __extends(LocalQueryFailAction, _super);
    function LocalQueryFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_FAIL;
        return _this;
    }
    return LocalQueryFailAction;
}(NgrxJsonApiAction));
var CompactStoreAction = /** @class */ (function (_super) {
    __extends(CompactStoreAction, _super);
    function CompactStoreAction(zoneId) {
        var _this = _super.call(this) || this;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.COMPACT_STORE;
        return _this;
    }
    return CompactStoreAction;
}(NgrxJsonApiAction));
var ClearStoreAction = /** @class */ (function (_super) {
    __extends(ClearStoreAction, _super);
    function ClearStoreAction(zoneId) {
        var _this = _super.call(this) || this;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.CLEAR_STORE;
        return _this;
    }
    return ClearStoreAction;
}(NgrxJsonApiAction));
var ApiQueryRefreshAction = /** @class */ (function (_super) {
    __extends(ApiQueryRefreshAction, _super);
    function ApiQueryRefreshAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_QUERY_REFRESH;
        if (!payload) {
            throw new Error('no query id provided for ApiQueryRefreshAction');
        }
        return _this;
    }
    return ApiQueryRefreshAction;
}(NgrxJsonApiAction));
var ModifyStoreResourceErrorsAction = /** @class */ (function (_super) {
    __extends(ModifyStoreResourceErrorsAction, _super);
    function ModifyStoreResourceErrorsAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS;
        return _this;
    }
    return ModifyStoreResourceErrorsAction;
}(NgrxJsonApiAction));
var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$2 = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * @record
 */
/**
 * This internface is deprecated, do no longer use.
 * @record
 */
/**
 * Represents an isolated area in the store with its own set of resources and queries.
 * 'api' is the default zone that already historically has been put beneath NgrxJsonApi within the store.
 */
var NgrxJsonApiZoneService = /** @class */ (function () {
    function NgrxJsonApiZoneService(zoneId, store$$1) {
        this.zoneId = zoneId;
        this.store = store$$1;
    }
    /**
     * Adds the given query to the store. Any existing query with the same queryId is replaced.
     * Make use of selectResults(...) to fetch the data.
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.putQuery = /**
     * Adds the given query to the store. Any existing query with the same queryId is replaced.
     * Make use of selectResults(...) to fetch the data.
     * @param {?} options
     * @return {?}
     */
        function (options) {
            /** @type {?} */
            var query = options.query;
            /** @type {?} */
            var fromServer = lodash.isUndefined(options.fromServer)
                ? true
                : options.fromServer;
            if (!query.queryId) {
                throw new Error('to query must have a queryId');
            }
            if (fromServer) {
                this.store.dispatch(new ApiGetInitAction(query, this.zoneId));
            }
            else {
                this.store.dispatch(new LocalQueryInitAction(query, this.zoneId));
            }
        };
    /**
     * @param {?} queryId
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.refreshQuery = /**
     * @param {?} queryId
     * @return {?}
     */
        function (queryId) {
            this.store.dispatch(new ApiQueryRefreshAction(queryId, this.zoneId));
        };
    /**
     * @param {?} queryId
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.removeQuery = /**
     * @param {?} queryId
     * @return {?}
     */
        function (queryId) {
            this.store.dispatch(new RemoveQueryAction(queryId, this.zoneId));
        };
    /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
    NgrxJsonApiZoneService.prototype.selectManyResults = /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
        function (queryId, denormalize) {
            if (denormalize === void 0) {
                denormalize = false;
            }
            return this.store
                .let(selectNgrxJsonApiZone(this.zoneId))
                .let(selectManyQueryResult(queryId, denormalize));
        };
    /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
    NgrxJsonApiZoneService.prototype.selectOneResults = /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
        function (queryId, denormalize) {
            if (denormalize === void 0) {
                denormalize = false;
            }
            return this.store
                .let(selectNgrxJsonApiZone(this.zoneId))
                .let(selectOneQueryResult(queryId, denormalize));
        };
    /**
     * @param {?} identifier of the resource
     * @return {?} observable of the resource
     */
    NgrxJsonApiZoneService.prototype.selectStoreResource = /**
     * @param {?} identifier of the resource
     * @return {?} observable of the resource
     */
        function (identifier) {
            return this.store
                .let(selectNgrxJsonApiZone(this.zoneId))
                .let(selectStoreResource(identifier));
        };
    /**
     * @param {?} identifiers of the resources
     * @return {?} observable of the resources
     */
    NgrxJsonApiZoneService.prototype.selectStoreResources = /**
     * @param {?} identifiers of the resources
     * @return {?} observable of the resources
     */
        function (identifiers) {
            return this.store
                .let(selectNgrxJsonApiZone(this.zoneId))
                .let(selectStoreResources(identifiers));
        };
    /**
     * Updates the given resource in the store with the provided data.
     * Use commit() to send the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.patchResource = /**
     * Updates the given resource in the store with the provided data.
     * Use commit() to send the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
        function (options) {
            /** @type {?} */
            var resource = options.resource;
            /** @type {?} */
            var toRemote = lodash.isUndefined(options.toRemote) ? false : options.toRemote;
            if (toRemote) {
                this.store.dispatch(new ApiPatchInitAction(resource, this.zoneId));
            }
            else {
                this.store.dispatch(new PatchStoreResourceAction(resource, this.zoneId));
            }
        };
    /**
     * Creates a new resources that is hold locally in the store
     * and my later be posted.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.newResource = /**
     * Creates a new resources that is hold locally in the store
     * and my later be posted.
     *
     * @param {?} options
     * @return {?}
     */
        function (options) {
            /** @type {?} */
            var resource = options.resource;
            this.store.dispatch(new NewStoreResourceAction(resource, this.zoneId));
        };
    /**
     * Adds the given resource to the store. Any already existing
     * resource with the same id gets replaced. Use commit() to send
     * the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.postResource = /**
     * Adds the given resource to the store. Any already existing
     * resource with the same id gets replaced. Use commit() to send
     * the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
        function (options) {
            /** @type {?} */
            var resource = options.resource;
            /** @type {?} */
            var toRemote = lodash.isUndefined(options.toRemote) ? false : options.toRemote;
            if (toRemote) {
                this.store.dispatch(new ApiPostInitAction(resource, this.zoneId));
            }
            else {
                this.store.dispatch(new PostStoreResourceAction(resource, this.zoneId));
            }
        };
    /**
     * Marks the given resource for deletion.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.deleteResource = /**
     * Marks the given resource for deletion.
     *
     * @param {?} options
     * @return {?}
     */
        function (options) {
            /** @type {?} */
            var resourceId = options.resourceId;
            /** @type {?} */
            var toRemote = lodash.isUndefined(options.toRemote) ? false : options.toRemote;
            if (toRemote) {
                this.store.dispatch(new ApiDeleteInitAction(resourceId, this.zoneId));
            }
            else {
                this.store.dispatch(new DeleteStoreResourceAction(resourceId, this.zoneId));
            }
        };
    /**
     * Applies all pending changes to the remote JSON API endpoint.
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.apply = /**
     * Applies all pending changes to the remote JSON API endpoint.
     * @return {?}
     */
        function () {
            this.store.dispatch(new ApiApplyInitAction({}, this.zoneId));
        };
    /**
     * Clear all the contents from the store.
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.clear = /**
     * Clear all the contents from the store.
     * @return {?}
     */
        function () {
            this.store.dispatch(new ClearStoreAction(this.zoneId));
        };
    /**
     * Compacts the store by removing unreferences and unchanges resources.
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.compact = /**
     * Compacts the store by removing unreferences and unchanges resources.
     * @return {?}
     */
        function () {
            this.store.dispatch(new CompactStoreAction(this.zoneId));
        };
    /**
     * Adds the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.addResourceErrors = /**
     * Adds the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
        function (id, errors) {
            this.store.dispatch(new ModifyStoreResourceErrorsAction({
                resourceId: id,
                errors: errors,
                modificationType: 'ADD',
            }, this.zoneId));
        };
    /**
     * Removes the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.removeResourceErrors = /**
     * Removes the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
        function (id, errors) {
            this.store.dispatch(new ModifyStoreResourceErrorsAction({
                resourceId: id,
                errors: errors,
                modificationType: 'REMOVE',
            }, this.zoneId));
        };
    /**
     * Sets the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.setResourceErrors = /**
     * Sets the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
        function (id, errors) {
            this.store.dispatch(new ModifyStoreResourceErrorsAction({
                resourceId: id,
                errors: errors,
                modificationType: 'SET',
            }, this.zoneId));
        };
    return NgrxJsonApiZoneService;
}());
var NgrxJsonApiService = /** @class */ (function (_super) {
    __extends$1(NgrxJsonApiService, _super);
    function NgrxJsonApiService(store$$1, config) {
        var _this = _super.call(this, NGRX_JSON_API_DEFAULT_ZONE, store$$1) || this;
        _this.config = config;
        _this.test = true;
        return _this;
    }
    /**
     * @return {?}
     */
    NgrxJsonApiService.prototype.getDefaultZone = /**
     * @return {?}
     */
        function () {
            return this;
        };
    /**
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiService.prototype.getZone = /**
     * @param {?} zoneId
     * @return {?}
     */
        function (zoneId) {
            return new NgrxJsonApiZoneService(zoneId, this.store);
        };
    /**
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiService.prototype.findOne = /**
     * @param {?} options
     * @return {?}
     */
        function (options) {
            return /** @type {?} */ (this.findInternal(options, false));
        };
    /**
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiService.prototype.findMany = /**
     * @param {?} options
     * @return {?}
     */
        function (options) {
            return /** @type {?} */ (this.findInternal(options, true));
        };
    Object.defineProperty(NgrxJsonApiService.prototype, "storeSnapshot", {
        get: /**
         * @return {?}
         */ function () {
            var _this = this;
            if (!this._storeSnapshot) {
                this.store
                    .let(selectNgrxJsonApiDefaultZone())
                    .subscribe(function (it) { return (_this._storeSnapshot = /** @type {?} */ (it)); });
                if (!this._storeSnapshot) {
                    throw new Error('failed to initialize store snapshot');
                }
            }
            return this._storeSnapshot;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} options
     * @param {?} multi
     * @return {?}
     */
    NgrxJsonApiService.prototype.findInternal = /**
     * @param {?} options
     * @param {?} multi
     * @return {?}
     */
        function (options, multi) {
            var _this = this;
            /** @type {?} */
            var query = options.query;
            /** @type {?} */
            var fromServer = lodash.isUndefined(options.fromServer)
                ? true
                : options.fromServer;
            /** @type {?} */
            var denormalise = lodash.isUndefined(options.denormalise)
                ? false
                : options.denormalise;
            /** @type {?} */
            var newQuery;
            if (!query.queryId) {
                newQuery = __assign$2({}, query, { queryId: this.uuid() });
            }
            else {
                newQuery = query;
            }
            this.putQuery({ query: newQuery, fromServer: fromServer });
            /** @type {?} */
            var queryResult$;
            if (multi) {
                queryResult$ = this.selectManyResults(newQuery.queryId, denormalise);
            }
            else {
                queryResult$ = this.selectOneResults(newQuery.queryId, denormalise);
            }
            return /** @type {?} */ (queryResult$.finally(function () {
                return _this.removeQuery(newQuery.queryId);
            }));
        };
    /**
     * @return {?}
     */
    NgrxJsonApiService.prototype.uuid = /**
     * @return {?}
     */
        function () {
            return uuid();
        };
    /**
     * Gets the current persisted state of the given resources.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiService.prototype.getPersistedResourceSnapshot = /**
     * Gets the current persisted state of the given resources.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param {?} identifier
     * @return {?}
     */
        function (identifier) {
            /** @type {?} */
            var snapshot = this.storeSnapshot;
            if (snapshot.data[identifier.type] &&
                snapshot.data[identifier.type][identifier.id]) {
                return snapshot.data[identifier.type][identifier.id].persistedResource;
            }
            return null;
        };
    /**
     * Gets the current state of the given resources in the store.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiService.prototype.getResourceSnapshot = /**
     * Gets the current state of the given resources in the store.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param {?} identifier
     * @return {?}
     */
        function (identifier) {
            /** @type {?} */
            var snapshot = this.storeSnapshot;
            if (snapshot.data[identifier.type] &&
                snapshot.data[identifier.type][identifier.id]) {
                return snapshot.data[identifier.type][identifier.id];
            }
            return null;
        };
    /**
     * @param {?} storeResource$
     * @param {?=} zoneId
     * @return {?}
     */
    NgrxJsonApiService.prototype.denormaliseResource = /**
     * @param {?} storeResource$
     * @param {?=} zoneId
     * @return {?}
     */
        function (storeResource$, zoneId) {
            if (zoneId === void 0) {
                zoneId = this.zoneId;
            }
            return storeResource$.combineLatest(this.store.let(selectNgrxJsonApiZone(zoneId)).map(function (state) { return state.data; }), function (storeResource, storeData) {
                if (lodash.isArray(storeResource)) {
                    return denormaliseStoreResources(/** @type {?} */ (storeResource), storeData);
                }
                else {
                    /** @type {?} */
                    var resource = /** @type {?} */ (storeResource);
                    return /** @type {?} */ (denormaliseStoreResource(resource, storeData));
                }
            });
        };
    /**
     * @param {?} path
     * @param {?} resourceType
     * @return {?}
     */
    NgrxJsonApiService.prototype.getDenormalisedPath = /**
     * @param {?} path
     * @param {?} resourceType
     * @return {?}
     */
        function (path, resourceType) {
            /** @type {?} */
            var pathSeparator = /** @type {?} */ (lodash.get(this.config, 'filteringConfig.pathSeparator'));
            return getDenormalisedPath(path, resourceType, this.config.resourceDefinitions, pathSeparator);
        };
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    NgrxJsonApiService.prototype.getDenormalisedValue = /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
        function (path, storeResource) {
            /** @type {?} */
            var pathSeparator = /** @type {?} */ (lodash.get(this.config, 'filteringConfig.pathSeparator'));
            return getDenormalisedValue(path, storeResource, this.config.resourceDefinitions, pathSeparator);
        };
    return NgrxJsonApiService;
}(NgrxJsonApiZoneService));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
            if (zoneId === void 0) {
                zoneId = NGRX_JSON_API_DEFAULT_ZONE;
            }
            return this.service.getZone(zoneId).selectStoreResource(id);
        };
    SelectStoreResourcePipe.decorators = [
        { type: core.Pipe, args: [{ name: 'jaSelectStoreResource' },] },
    ];
    /** @nocollapse */
    SelectStoreResourcePipe.ctorParameters = function () {
        return [
            { type: NgrxJsonApiService }
        ];
    };
    return SelectStoreResourcePipe;
}());
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
            if (zoneId === void 0) {
                zoneId = NGRX_JSON_API_DEFAULT_ZONE;
            }
            return this.service.getZone(zoneId).selectStoreResources(ids);
        };
    SelectStoreResourcesPipe.decorators = [
        { type: core.Pipe, args: [{ name: 'jaSelectStoreResources' },] },
    ];
    /** @nocollapse */
    SelectStoreResourcesPipe.ctorParameters = function () {
        return [
            { type: NgrxJsonApiService }
        ];
    };
    return SelectStoreResourcesPipe;
}());
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
            if (zoneId === void 0) {
                zoneId = NGRX_JSON_API_DEFAULT_ZONE;
            }
            return this.service.denormaliseResource(obs, zoneId);
        };
    DenormaliseStoreResourcePipe.decorators = [
        { type: core.Pipe, args: [{ name: 'denormaliseStoreResource' },] },
    ];
    /** @nocollapse */
    DenormaliseStoreResourcePipe.ctorParameters = function () {
        return [
            { type: NgrxJsonApiService }
        ];
    };
    return DenormaliseStoreResourcePipe;
}());
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
        { type: core.Pipe, args: [{ name: 'getDenormalisedValue' },] },
    ];
    /** @nocollapse */
    GetDenormalisedValuePipe.ctorParameters = function () {
        return [
            { type: NgrxJsonApiService }
        ];
    };
    return GetDenormalisedValuePipe;
}());
var __assign$3 = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
            if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgrxJsonApi = /** @class */ (function () {
    function NgrxJsonApi(http$$1, config) {
        this.http = http$$1;
        this.config = config;
        this.headers = new http.HttpHeaders({
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json',
        });
        this.definitions = this.config.resourceDefinitions;
        if (this.config.requestHeaders) {
            for (var _i = 0, _a = lodash.keys(this.config.requestHeaders); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                /** @type {?} */
                var value = this.config.requestHeaders[name_1];
                this.headers = this.headers.set(name_1, value);
            }
        }
    }
    /**
     * @param {?} query
     * @param {?} operation
     * @return {?}
     */
    NgrxJsonApi.prototype.urlBuilder = /**
     * @param {?} query
     * @param {?} operation
     * @return {?}
     */
        function (query, operation) {
            switch (operation) {
                case 'GET': {
                    if (query.type && query.id) {
                        return this.resourceUrlFor(query.type, query.id);
                    }
                    else if (query.type) {
                        return this.collectionUrlFor(query.type);
                    }
                }
                case 'DELETE': {
                    if (query.type && query.id) {
                        return this.resourceUrlFor(query.type, query.id);
                    }
                }
                case 'PATCH': {
                    if (query.type && query.id) {
                        return this.resourceUrlFor(query.type, query.id);
                    }
                }
                case 'POST': {
                    return this.collectionUrlFor(query.type);
                }
            }
        };
    /**
     * @param {?} type
     * @return {?}
     */
    NgrxJsonApi.prototype.collectionPathFor = /**
     * @param {?} type
     * @return {?}
     */
        function (type) {
            /** @type {?} */
            var definition = lodash.find(this.definitions, { type: type });
            if (definition) {
                return "" + definition.collectionPath;
            }
            else {
                return type;
            }
        };
    /**
     * @param {?} type
     * @return {?}
     */
    NgrxJsonApi.prototype.collectionUrlFor = /**
     * @param {?} type
     * @return {?}
     */
        function (type) {
            /** @type {?} */
            var collectionPath = this.collectionPathFor(type);
            return this.config.apiUrl + "/" + collectionPath;
        };
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    NgrxJsonApi.prototype.resourcePathFor = /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
        function (type, id) {
            /** @type {?} */
            var collectionPath = this.collectionPathFor(type);
            return collectionPath + "/" + encodeURIComponent(id);
        };
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    NgrxJsonApi.prototype.resourceUrlFor = /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
        function (type, id) {
            /** @type {?} */
            var resourcePath = this.resourcePathFor(type, id);
            return this.config.apiUrl + "/" + resourcePath;
        };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApi.prototype.find = /**
     * @param {?} query
     * @return {?}
     */
        function (query) {
            /** @type {?} */
            var _generateIncludedQueryParams = generateIncludedQueryParams;
            /** @type {?} */
            var _generateFilteringQueryParams = generateFilteringQueryParams;
            /** @type {?} */
            var _generateFieldsQueryParams = generateFieldsQueryParams;
            /** @type {?} */
            var _generateSortingQueryParams = generateSortingQueryParams;
            /** @type {?} */
            var _generateQueryParams = generateQueryParams;
            if (this.config.hasOwnProperty('urlBuilder')) {
                /** @type {?} */
                var urlBuilder = this.config.urlBuilder;
                if (urlBuilder.generateIncludedQueryParams) {
                    _generateIncludedQueryParams = urlBuilder.generateIncludedQueryParams;
                }
                if (urlBuilder.generateFilteringQueryParams) {
                    _generateFilteringQueryParams = urlBuilder.generateFilteringQueryParams;
                }
                if (urlBuilder.generateFieldsQueryParams) {
                    _generateFieldsQueryParams = urlBuilder.generateFieldsQueryParams;
                }
                if (urlBuilder.generateSortingQueryParams) {
                    _generateSortingQueryParams = urlBuilder.generateSortingQueryParams;
                }
                if (urlBuilder.generateQueryParams) {
                    _generateQueryParams = urlBuilder.generateQueryParams;
                }
            }
            /** @type {?} */
            var queryParams = '';
            /** @type {?} */
            var includedParam = '';
            /** @type {?} */
            var filteringParams = '';
            /** @type {?} */
            var sortingParams = '';
            /** @type {?} */
            var fieldsParams = '';
            /** @type {?} */
            var offsetParams = '';
            /** @type {?} */
            var limitParams = '';
            /** @type {?} */
            var pageParams = '';
            if (typeof query === undefined) {
                return Observable.Observable.throw('Query not found');
            }
            if (query.hasOwnProperty('params') && !lodash.isEmpty(query.params)) {
                if (lodash.hasIn(query.params, 'include')) {
                    includedParam = _generateIncludedQueryParams(query.params.include);
                }
                if (lodash.hasIn(query.params, 'filtering')) {
                    filteringParams = _generateFilteringQueryParams(query.params.filtering);
                }
                if (lodash.hasIn(query.params, 'sorting')) {
                    sortingParams = _generateSortingQueryParams(query.params.sorting);
                }
                if (lodash.hasIn(query.params, 'fields')) {
                    fieldsParams = _generateFieldsQueryParams(query.params.fields);
                }
                if (lodash.hasIn(query.params, 'limit')) {
                    limitParams = 'page[limit]=' + query.params.limit;
                }
                if (lodash.hasIn(query.params, 'offset')) {
                    offsetParams = 'page[offset]=' + query.params.offset;
                }
                if (lodash.hasIn(query.params, 'page')) {
                    pageParams = lodash.keys(query.params.page)
                        .map(function (key) {
                        return "page[" + key + "]=" + query.params.page[key];
                    })
                        .join('&');
                }
            }
            queryParams = _generateQueryParams(includedParam, filteringParams, sortingParams, fieldsParams, offsetParams, limitParams, pageParams);
            /** @type {?} */
            var requestOptions = {
                method: 'GET',
                url: this.urlBuilder(query, 'GET') + queryParams,
            };
            return this.request(requestOptions);
        };
    /**
     * @param {?} query
     * @param {?} document
     * @return {?}
     */
    NgrxJsonApi.prototype.create = /**
     * @param {?} query
     * @param {?} document
     * @return {?}
     */
        function (query, document) {
            if (typeof query === undefined) {
                return Observable.Observable.throw('Query not found');
            }
            if (typeof document === undefined) {
                return Observable.Observable.throw('Data not found');
            }
            /** @type {?} */
            var requestOptions = {
                method: 'POST',
                url: this.urlBuilder(query, 'POST'),
                body: JSON.stringify(document),
            };
            return this.request(requestOptions);
        };
    /**
     * @param {?} query
     * @param {?} document
     * @return {?}
     */
    NgrxJsonApi.prototype.update = /**
     * @param {?} query
     * @param {?} document
     * @return {?}
     */
        function (query, document) {
            if (typeof query === undefined) {
                return Observable.Observable.throw('Query not found');
            }
            if (typeof document === undefined) {
                return Observable.Observable.throw('Data not found');
            }
            /** @type {?} */
            var requestOptions = {
                method: 'PATCH',
                url: this.urlBuilder(query, 'PATCH'),
                body: JSON.stringify(document),
            };
            return this.request(requestOptions);
        };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApi.prototype.delete = /**
     * @param {?} query
     * @return {?}
     */
        function (query) {
            if (typeof query === undefined) {
                return Observable.Observable.throw('Query not found');
            }
            /** @type {?} */
            var requestOptions = {
                method: 'DELETE',
                url: this.urlBuilder(query, 'DELETE'),
            };
            return this.request(requestOptions);
        };
    /**
     * @param {?} requestOptions
     * @return {?}
     */
    NgrxJsonApi.prototype.request = /**
     * @param {?} requestOptions
     * @return {?}
     */
        function (requestOptions) {
            /** @type {?} */
            var newRequestOptions = __assign$3({}, requestOptions, { headers: this.headers, observe: 'response', withCredentials: this.config.requestWithCredentials });
            if (requestOptions.method === 'GET') {
                var method = newRequestOptions.method, url = newRequestOptions.url, init = __rest(newRequestOptions, ["method", "url"]);
                return this.http.get(url, init);
            }
            else if (requestOptions.method === 'POST') {
                var method = newRequestOptions.method, url = newRequestOptions.url, body = newRequestOptions.body, init = __rest(newRequestOptions, ["method", "url", "body"]);
                return this.http.post(url, body, init);
            }
            else if (requestOptions.method === 'PATCH') {
                var method = newRequestOptions.method, url = newRequestOptions.url, body = newRequestOptions.body, init = __rest(newRequestOptions, ["method", "url", "body"]);
                return this.http.patch(url, body, init);
            }
            else if (requestOptions.method === 'DELETE') {
                var method = newRequestOptions.method, url = newRequestOptions.url, init = __rest(newRequestOptions, ["method", "url"]);
                return this.http.delete(url, init);
            }
        };
    return NgrxJsonApi;
}());
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgrxJsonApiEffects = /** @class */ (function () {
    function NgrxJsonApiEffects(actions$, jsonApi, store$$1) {
        var _this = this;
        this.actions$ = actions$;
        this.jsonApi = jsonApi;
        this.store = store$$1;
        this.createResource$ = this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.API_POST_INIT), operators.mergeMap(function (action) {
            /** @type {?} */
            var payload = _this.generatePayload(action.payload, 'POST');
            return _this.jsonApi.create(payload.query, payload.jsonApiData).pipe(operators.map(function (response) {
                return new ApiPostSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                }, action.zoneId);
            }), operators.catchError(function (error) {
                return of.of(new ApiPostFailAction(_this.toErrorPayload(payload.query, error), action.zoneId));
            }));
        }));
        this.updateResource$ = this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.API_PATCH_INIT), operators.mergeMap(function (action) {
            /** @type {?} */
            var payload = _this.generatePayload(action.payload, 'PATCH');
            return _this.jsonApi.update(payload.query, payload.jsonApiData).pipe(operators.map(function (response) {
                return new ApiPatchSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                }, action.zoneId);
            }), operators.catchError(function (error) {
                return of.of(new ApiPatchFailAction(_this.toErrorPayload(payload.query, error), action.zoneId));
            }));
        }));
        this.readResource$ = this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.API_GET_INIT), operators.mergeMap(function (action) {
            /** @type {?} */
            var query = action.payload;
            return _this.jsonApi.find(query).pipe(operators.map(function (response) { return response.body; }), operators.map(function (data) {
                return new ApiGetSuccessAction({
                    jsonApiData: data,
                    query: query,
                }, action.zoneId);
            }), operators.catchError(function (error) {
                return of.of(new ApiGetFailAction(_this.toErrorPayload(query, error), action.zoneId));
            }));
        }));
        this.queryStore$ = this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT), operators.mergeMap(function (action) {
            /** @type {?} */
            var query = action.payload;
            return _this.store
                .let(selectNgrxJsonApiZone(action.zoneId))
                .let(_this.executeLocalQuery(query))
                .pipe(operators.map(function (results) {
                return new LocalQuerySuccessAction({
                    jsonApiData: { data: results },
                    query: query,
                }, action.zoneId);
            }), operators.catchError(function (error) {
                return of.of(new LocalQueryFailAction(_this.toErrorPayload(query, error), action.zoneId));
            }), operators.takeUntil(_this.localQueryInitEventFor(query)), operators.takeUntil(_this.removeQueryEventFor(query)));
        }));
        this.deleteResource$ = this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.API_DELETE_INIT), operators.mergeMap(function (action) {
            /** @type {?} */
            var payload = _this.generatePayload(action.payload, 'DELETE');
            return _this.jsonApi.delete(payload.query).pipe(operators.map(function (response) { return response.body; }), operators.map(function (data) {
                return new ApiDeleteSuccessAction({
                    jsonApiData: data,
                    query: payload.query,
                }, action.zoneId);
            }), operators.catchError(function (error) {
                return of.of(new ApiDeleteFailAction(_this.toErrorPayload(payload.query, error), action.zoneId));
            }));
        }));
        this.triggerReadOnQueryRefresh$ = this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.API_QUERY_REFRESH), operators.withLatestFrom(this.store, function (action, store$$1) {
            /** @type {?} */
            var queryId = action.payload;
            /** @type {?} */
            var state = getNgrxJsonApiZone(store$$1, action.zoneId);
            /** @type {?} */
            var query = state.queries[queryId].query;
            return new ApiGetInitAction(query, action.zoneId);
        }));
        this.refreshQueriesOnDelete$ = this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.API_DELETE_SUCCESS), operators.withLatestFrom(this.store, function (action, store$$1) {
            /** @type {?} */
            var id = { id: action.payload.query.id, type: action.payload.query.type };
            if (!id.id || !id.type) {
                throw new Error('API_DELETE_SUCCESS did not carry resource id and type information');
            }
            /** @type {?} */
            var state = getNgrxJsonApiZone(store$$1, action.zoneId);
            /** @type {?} */
            var actions = [];
            for (var queryId in state.queries) {
                if (state.queries.hasOwnProperty(queryId)) {
                    /** @type {?} */
                    var query = state.queries[queryId];
                    if (query.resultIds) {
                        /** @type {?} */
                        var needsRefresh = lodash.findIndex(query.resultIds, function (o) {
                            return lodash.isEqual(id, o);
                        }) !== -1;
                        /** @type {?} */
                        var sameIdRequested = query.query.id === id.id && query.query.type === id.type;
                        if (sameIdRequested && (needsRefresh || lodash.isEmpty(query.errors))) {
                            throw new Error('store is in invalid state, queries for deleted' +
                                ' resource should have been emptied and marked with 404 error');
                        }
                        if (needsRefresh) {
                            actions.push(new ApiQueryRefreshAction(queryId, action.zoneId));
                        }
                    }
                }
            }
            return actions;
        }), operators.flatMap(function (actions) { return of.of.apply(void 0, actions); }));
        this.applyResources$ = this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.API_APPLY_INIT), operators.filter(function () { return _this.jsonApi.config.applyEnabled !== false; }), operators.withLatestFrom(this.store, function (action, storeState) {
            /** @type {?} */
            var ngrxstore = getNgrxJsonApiZone(storeState, action.zoneId);
            /** @type {?} */
            var payload = ( /** @type {?} */(action)).payload;
            /** @type {?} */
            var pending = getPendingChanges(ngrxstore.data, payload.ids, payload.include);
            if (pending.length === 0) {
                return of.of(new ApiApplySuccessAction([], action.zoneId));
            }
            /** @type {?} */
            var sortedPending = sortPendingChanges(pending);
            /** @type {?} */
            var actions = [];
            for (var _i = 0, sortedPending_1 = sortedPending; _i < sortedPending_1.length; _i++) {
                var pendingChange = sortedPending_1[_i];
                if (pendingChange.state === 'CREATED') {
                    actions.push(_this.handlePendingCreate(pendingChange, action.zoneId));
                }
                else if (pendingChange.state === 'UPDATED') {
                    actions.push(_this.handlePendingUpdate(pendingChange, action.zoneId));
                }
                else if (pendingChange.state === 'DELETED') {
                    actions.push(_this.handlePendingDelete(pendingChange, action.zoneId));
                }
                else {
                    throw new Error('unknown state ' + pendingChange.state);
                }
            }
            return of.of.apply(void 0, actions).concatAll()
                .pipe(operators.toArray(), operators.map(function (actions) { return _this.toApplyAction(actions, action.zoneId); }));
        }), operators.flatMap(function (actions) { return actions; }));
        this.config = this.jsonApi.config;
    }
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.localQueryInitEventFor = /**
     * @param {?} query
     * @return {?}
     */
        function (query) {
            return this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT), operators.map(function (action) { return (action); }), operators.filter(function (action) { return query.queryId == action.payload.queryId; }));
        };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.removeQueryEventFor = /**
     * @param {?} query
     * @return {?}
     */
        function (query) {
            return this.actions$.pipe(effects.ofType(NgrxJsonApiActionTypes.REMOVE_QUERY), operators.map(function (action) { return (action); }), operators.filter(function (action) { return query.queryId == action.payload; }));
        };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.executeLocalQuery = /**
     * @param {?} query
     * @return {?}
     */
        function (query) {
            var _this = this;
            return function (state$) {
                /** @type {?} */
                var selected$;
                if (!query.type) {
                    return state$.map(function () { return Observable.Observable.throw('Unknown query'); });
                }
                else if (query.type && query.id) {
                    selected$ = state$.let(selectStoreResource({ type: query.type, id: query.id }));
                }
                else {
                    selected$ = state$
                        .let(selectStoreResourcesOfType(query.type))
                        .pipe(operators.combineLatest(state$.map(function (it) { return it.data; }), function (resources, storeData) {
                        return filterResources(resources, storeData, query, _this.config.resourceDefinitions, _this.config.filteringConfig);
                    }));
                }
                return selected$.distinctUntilChanged();
            };
        };
    /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.handlePendingCreate = /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
        function (pendingChange, zoneId) {
            var _this = this;
            /** @type {?} */
            var payload = this.generatePayload(pendingChange, 'POST');
            return this.jsonApi.create(payload.query, payload.jsonApiData).pipe(operators.map(function (response) {
                return new ApiPostSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                }, zoneId);
            }), operators.catchError(function (error) {
                return of.of(new ApiPostFailAction(_this.toErrorPayload(payload.query, error), zoneId));
            }));
        };
    /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.handlePendingUpdate = /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
        function (pendingChange, zoneId) {
            var _this = this;
            /** @type {?} */
            var payload = this.generatePayload(pendingChange, 'PATCH');
            return this.jsonApi.update(payload.query, payload.jsonApiData).pipe(operators.map(function (response) {
                return new ApiPatchSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                }, zoneId);
            }), operators.catchError(function (error) {
                return of.of(new ApiPatchFailAction(_this.toErrorPayload(payload.query, error), zoneId));
            }));
        };
    /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.handlePendingDelete = /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
        function (pendingChange, zoneId) {
            var _this = this;
            /** @type {?} */
            var payload = this.generatePayload(pendingChange, 'DELETE');
            return this.jsonApi.delete(payload.query).pipe(operators.map(function (response) {
                return new ApiDeleteSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                }, zoneId);
            }), operators.catchError(function (error) {
                return of.of(new ApiDeleteFailAction(_this.toErrorPayload(payload.query, error), zoneId));
            }));
        };
    /**
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.ngOnDestroy = /**
     * @return {?}
     */
        function () { };
    /**
     * @param {?} actions
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.toApplyAction = /**
     * @param {?} actions
     * @param {?} zoneId
     * @return {?}
     */
        function (actions, zoneId) {
            for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                var action = actions_1[_i];
                if (action.type === NgrxJsonApiActionTypes.API_POST_FAIL ||
                    action.type === NgrxJsonApiActionTypes.API_PATCH_FAIL ||
                    action.type === NgrxJsonApiActionTypes.API_DELETE_FAIL) {
                    return new ApiApplyFailAction(actions, zoneId);
                }
            }
            return new ApiApplySuccessAction(actions, zoneId);
        };
    /**
     * @param {?} query
     * @param {?} response
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.toErrorPayload = /**
     * @param {?} query
     * @param {?} response
     * @return {?}
     */
        function (query, response) {
            /** @type {?} */
            var contentType = null;
            if (response && response.headers) {
                contentType = response.headers.get('Content-Type');
            }
            /** @type {?} */
            var document = null;
            if (contentType != null &&
                contentType.startsWith('application/vnd.api+json')) {
                document = response;
            }
            if (document &&
                document.error &&
                document.error.errors &&
                document.error.errors.length > 0) {
                return {
                    query: query,
                    jsonApiData: document.error,
                };
            }
            else {
                /** @type {?} */
                var errors = [];
                /** @type {?} */
                var error = {
                    status: String(response.status),
                    code: response.statusText,
                };
                errors.push(error);
                // got json api errors
                return {
                    query: query,
                    jsonApiData: {
                        errors: errors,
                    },
                };
            }
        };
    /**
     * @param {?} resource
     * @param {?} operation
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.generatePayload = /**
     * @param {?} resource
     * @param {?} operation
     * @return {?}
     */
        function (resource, operation) {
            return generatePayload(resource, operation);
        };
    NgrxJsonApiEffects.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    NgrxJsonApiEffects.ctorParameters = function () {
        return [
            { type: effects.Actions },
            { type: NgrxJsonApi },
            { type: store.Store }
        ];
    };
    __decorate([
        effects.Effect(),
        __metadata("design:type", Observable.Observable)
    ], NgrxJsonApiEffects.prototype, "createResource$", void 0);
    __decorate([
        effects.Effect(),
        __metadata("design:type", Observable.Observable)
    ], NgrxJsonApiEffects.prototype, "updateResource$", void 0);
    __decorate([
        effects.Effect(),
        __metadata("design:type", Observable.Observable)
    ], NgrxJsonApiEffects.prototype, "readResource$", void 0);
    __decorate([
        effects.Effect(),
        __metadata("design:type", Object)
    ], NgrxJsonApiEffects.prototype, "queryStore$", void 0);
    __decorate([
        effects.Effect(),
        __metadata("design:type", Object)
    ], NgrxJsonApiEffects.prototype, "deleteResource$", void 0);
    __decorate([
        effects.Effect(),
        __metadata("design:type", Object)
    ], NgrxJsonApiEffects.prototype, "triggerReadOnQueryRefresh$", void 0);
    __decorate([
        effects.Effect(),
        __metadata("design:type", Observable.Observable)
    ], NgrxJsonApiEffects.prototype, "refreshQueriesOnDelete$", void 0);
    __decorate([
        effects.Effect(),
        __metadata("design:type", Observable.Observable)
    ], NgrxJsonApiEffects.prototype, "applyResources$", void 0);
    return NgrxJsonApiEffects;
}());
var __assign$4 = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var initialNgrxJsonApiZone = {
    isCreating: 0,
    isReading: 0,
    isUpdating: 0,
    isDeleting: 0,
    isApplying: 0,
    data: {},
    queries: {},
};
/** @type {?} */
var initialNgrxJsonApiState = {
    zones: {},
};
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function NgrxJsonApiStoreReducer(state, action) {
    if (state === void 0) {
        state = initialNgrxJsonApiState;
    }
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
        return __assign$4({}, state, { zones: __assign$4({}, state.zones, (_a = {}, _a[zoneId] = newZone, _a)) });
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
function NgrxJsonApiZoneReducer(zone, action) {
    /** @type {?} */
    var newZone;
    switch (action.type) {
        case NgrxJsonApiActionTypes.API_POST_INIT: {
            /** @type {?} */
            var updatedData = updateStoreDataFromResource(zone.data, action.payload, false, true);
            newZone = __assign$4({}, zone, { data: updatedData, isCreating: zone.isCreating + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_GET_INIT: {
            /** @type {?} */
            var query = /** @type {?} */ (action.payload);
            newZone = __assign$4({}, zone, { queries: updateQueryParams(zone.queries, query), isReading: zone.isReading + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_PATCH_INIT: {
            /** @type {?} */
            var updatedData = updateStoreDataFromResource(zone.data, action.payload, false, false);
            newZone = __assign$4({}, zone, { data: updatedData, isUpdating: zone.isUpdating + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_DELETE_INIT: {
            newZone = __assign$4({}, zone, { data: updateResourceState(zone.data, action.payload, 'DELETED'), isDeleting: zone.isDeleting + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_POST_SUCCESS: {
            newZone = __assign$4({}, zone, { data: updateStoreDataFromPayload(zone.data, action.payload.jsonApiData), isCreating: zone.isCreating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_GET_SUCCESS: {
            newZone = __assign$4({}, zone, { data: updateStoreDataFromPayload(zone.data, action.payload.jsonApiData), queries: updateQueryResults(zone.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: zone.isReading - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_PATCH_SUCCESS: {
            newZone = __assign$4({}, zone, { data: updateStoreDataFromPayload(zone.data, action.payload.jsonApiData), isUpdating: zone.isUpdating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_DELETE_SUCCESS: {
            newZone = __assign$4({}, zone, { data: deleteStoreResources(zone.data, action.payload.query), queries: updateQueriesForDeletedResource(zone.queries, {
                    id: action.payload.query.id,
                    type: action.payload.query.type,
                }), isDeleting: zone.isDeleting - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_QUERY_REFRESH: {
            // clear result ids and wait until new data is fetched (triggered by effect)
            newZone = __assign$4({}, zone, { queries: clearQueryResult(zone.queries, action.payload) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_POST_FAIL: {
            newZone = __assign$4({}, zone, { data: updateResourceErrorsForQuery(zone.data, action.payload.query, action.payload.jsonApiData), isCreating: zone.isCreating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_GET_FAIL: {
            newZone = __assign$4({}, zone, { queries: updateQueryErrors(zone.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: zone.isReading - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_PATCH_FAIL: {
            newZone = __assign$4({}, zone, { data: updateResourceErrorsForQuery(zone.data, action.payload.query, action.payload.jsonApiData), isUpdating: zone.isUpdating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_DELETE_FAIL: {
            newZone = __assign$4({}, zone, { data: updateResourceErrorsForQuery(zone.data, action.payload.query, action.payload.jsonApiData), isDeleting: zone.isDeleting - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.REMOVE_QUERY: {
            /** @type {?} */
            var queryId = /** @type {?} */ (action.payload);
            newZone = __assign$4({}, zone, { queries: removeQuery(zone.queries, queryId) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_INIT: {
            /** @type {?} */
            var query = /** @type {?} */ (action.payload);
            newZone = __assign$4({}, zone, { queries: updateQueryParams(zone.queries, query) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS: {
            /** @type {?} */
            var payload = /** @type {?} */ (action.payload);
            newZone = __assign$4({}, zone, { data: updateResourceErrors(zone.data, payload.resourceId, payload.errors, payload.modificationType) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS: {
            return setIn(zone, 'queries', updateQueryResults(zone.queries, action.payload.query.queryId, action.payload.jsonApiData));
        }
        case NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE: {
            /** @type {?} */
            var updatedData = updateStoreDataFromResource(zone.data, action.payload, false, false);
            if (updatedData !== zone.data) {
                newZone = __assign$4({}, zone, { data: updatedData });
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
                newZone = __assign$4({}, zone, { data: updatedData });
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
                newZone = __assign$4({}, zone, { data: updatedData });
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
                    newZone = __assign$4({}, zone, { data: removeStoreResource(zone.data, resourceId) });
                    return newZone;
                }
                else {
                    // stored on server, mark for deletion
                    newZone = __assign$4({}, zone, { data: updateResourceState(zone.data, action.payload, 'DELETED') });
                    return newZone;
                }
            }
            return zone;
        }
        case NgrxJsonApiActionTypes.API_APPLY_INIT: {
            /** @type {?} */
            var payload = ( /** @type {?} */(action)).payload;
            /** @type {?} */
            var pending_2 = getPendingChanges(zone.data, payload.ids, payload.include);
            newZone = __assign$4({}, zone, { isApplying: zone.isApplying + 1 });
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
            newZone = __assign$4({}, newZone, { isApplying: zone['isApplying'] - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_ROLLBACK: {
            /** @type {?} */
            var payload = ( /** @type {?} */(action)).payload;
            newZone = __assign$4({}, zone, { data: rollbackStoreResources(zone.data, payload.ids, payload.include) });
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
var reducer = NgrxJsonApiStoreReducer;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var NGRX_JSON_API_CONFIG = new core.InjectionToken('NGRX_JSON_API_CONFIG');
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function apiFactory(http$$1, config) {
    return new NgrxJsonApi(http$$1, config);
}
/**
 * Deprecated, do not use any longer
 * @return {?}
 */
function selectorsFactory() {
    return new NgrxJsonApiSelectors();
}
/**
 * @param {?} store
 * @param {?} config
 * @return {?}
 */
function serviceFactory(store$$1, config) {
    return new NgrxJsonApiService(store$$1, config);
}
/**
 * @param {?} config
 * @return {?}
 */
function configure(config) {
    return [
        {
            provide: NgrxJsonApi,
            useFactory: apiFactory,
            deps: [http.HttpClient, NGRX_JSON_API_CONFIG],
        },
        {
            provide: NgrxJsonApiSelectors,
            useFactory: selectorsFactory,
        },
        {
            provide: NgrxJsonApiService,
            useFactory: serviceFactory,
            deps: [store.Store, NGRX_JSON_API_CONFIG],
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
        { type: core.NgModule, args: [{
                    declarations: [
                        DenormaliseStoreResourcePipe,
                        GetDenormalisedValuePipe,
                        SelectStoreResourcePipe,
                        SelectStoreResourcesPipe,
                    ],
                    imports: [
                        effects.EffectsModule.forFeature([NgrxJsonApiEffects]),
                        store.StoreModule.forFeature('NgrxJsonApi', reducer, {}),
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

exports.SelectStoreResourcePipe = SelectStoreResourcePipe;
exports.SelectStoreResourcesPipe = SelectStoreResourcesPipe;
exports.DenormaliseStoreResourcePipe = DenormaliseStoreResourcePipe;
exports.GetDenormalisedValuePipe = GetDenormalisedValuePipe;
exports.NgrxJsonApiService = NgrxJsonApiService;
exports.NgrxJsonApiZoneService = NgrxJsonApiZoneService;
exports.NgrxJsonApiModule = NgrxJsonApiModule;
exports.NGRX_JSON_API_CONFIG = NGRX_JSON_API_CONFIG;
exports.uuid = uuid;
exports.NGRX_JSON_API_DEFAULT_ZONE = NGRX_JSON_API_DEFAULT_ZONE;
exports.Direction = Direction;
exports.NgrxJsonApiActionTypes = NgrxJsonApiActionTypes;
exports.NgrxJsonApiAction = NgrxJsonApiAction;
exports.ApiApplyInitAction = ApiApplyInitAction;
exports.ApiApplySuccessAction = ApiApplySuccessAction;
exports.ApiApplyFailAction = ApiApplyFailAction;
exports.ApiPostInitAction = ApiPostInitAction;
exports.ApiPostSuccessAction = ApiPostSuccessAction;
exports.ApiPostFailAction = ApiPostFailAction;
exports.ApiDeleteInitAction = ApiDeleteInitAction;
exports.ApiDeleteSuccessAction = ApiDeleteSuccessAction;
exports.ApiDeleteFailAction = ApiDeleteFailAction;
exports.ApiGetInitAction = ApiGetInitAction;
exports.ApiGetSuccessAction = ApiGetSuccessAction;
exports.ApiGetFailAction = ApiGetFailAction;
exports.ApiRollbackAction = ApiRollbackAction;
exports.ApiPatchInitAction = ApiPatchInitAction;
exports.ApiPatchSuccessAction = ApiPatchSuccessAction;
exports.ApiPatchFailAction = ApiPatchFailAction;
exports.DeleteStoreResourceAction = DeleteStoreResourceAction;
exports.PatchStoreResourceAction = PatchStoreResourceAction;
exports.NewStoreResourceAction = NewStoreResourceAction;
exports.PostStoreResourceAction = PostStoreResourceAction;
exports.RemoveQueryAction = RemoveQueryAction;
exports.LocalQueryInitAction = LocalQueryInitAction;
exports.LocalQuerySuccessAction = LocalQuerySuccessAction;
exports.LocalQueryFailAction = LocalQueryFailAction;
exports.CompactStoreAction = CompactStoreAction;
exports.ClearStoreAction = ClearStoreAction;
exports.ApiQueryRefreshAction = ApiQueryRefreshAction;
exports.ModifyStoreResourceErrorsAction = ModifyStoreResourceErrorsAction;
exports.selectNgrxJson = selectNgrxJson;
exports.selectNgrxJsonApiDefaultZone = selectNgrxJsonApiDefaultZone;
exports.selectNgrxJsonApiZone = selectNgrxJsonApiZone;
exports.getNgrxJsonApiZone = getNgrxJsonApiZone;
exports.selectStoreQuery = selectStoreQuery;
exports.selectStoreResourcesOfType = selectStoreResourcesOfType;
exports.selectStoreResource = selectStoreResource;
exports.selectStoreResources = selectStoreResources;
exports.selectManyQueryResult = selectManyQueryResult;
exports.selectOneQueryResult = selectOneQueryResult;
exports.getNgrxJsonApiStore = getNgrxJsonApiStore;
exports.NgrxJsonApiSelectors = NgrxJsonApiSelectors;
exports.ɵf = NgrxJsonApi;
exports.ɵe = NgrxJsonApiEffects;
exports.ɵa = apiFactory;
exports.ɵd = configure;
exports.ɵb = selectorsFactory;
exports.ɵc = serviceFactory;
exports.ɵg = NgrxJsonApiStoreReducer;
exports.ɵh = reducer;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-json-api.umd.js.map
