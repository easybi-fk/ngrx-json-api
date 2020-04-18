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
import { Direction, } from './interfaces';
/**
 * @param {?} state
 * @param {?} path
 * @param {?} value
 * @return {?}
 */
export function setIn(state, path, value) {
    /** @type {?} */
    var currentValue = _.get(state, path);
    if (value === currentValue) {
        return state;
    }
    return _.setWith(_.clone(state), path, value, function (nsValue, key, nsObject) {
        /** @type {?} */
        var newObject = _.clone(nsObject);
        newObject[key] = nsValue;
        return newObject;
    });
}
/** @type {?} */
export var denormaliseObject = function (resource, storeData, bag, denormalizePersisted) {
    if (denormalizePersisted === void 0) { denormalizePersisted = false; }
    // this function MUST MUTATE resource
    if (resource.hasOwnProperty('relationships')) {
        Object.keys(resource.relationships).forEach(function (relationshipName) {
            /** @type {?} */
            var orginalRelationship = resource.relationships[relationshipName];
            /** @type {?} */
            var data = orginalRelationship.data;
            if (!_.isUndefined(data)) {
                /** @type {?} */
                var denormalizedRelation = void 0;
                if (data === null) {
                    denormalizedRelation = data;
                }
                else if (!_.isArray(data)) {
                    /** @type {?} */
                    var relatedRS = getSingleStoreResource(/** @type {?} */ (data), storeData);
                    denormalizedRelation = denormaliseStoreResource(relatedRS, storeData, bag, denormalizePersisted);
                }
                else if ((/** @type {?} */ (data)).length == 0) {
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
export var denormaliseStoreResources = function (items, storeData, bag, denormalizePersisted) {
    if (bag === void 0) { bag = {}; }
    if (denormalizePersisted === void 0) { denormalizePersisted = false; }
    /** @type {?} */
    var results = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        results.push(denormaliseStoreResource(item, storeData, bag, denormalizePersisted));
    }
    return results;
};
/** @type {?} */
export var denormaliseStoreResource = function (item, storeData, bag, denormalizePersisted) {
    if (bag === void 0) { bag = {}; }
    if (denormalizePersisted === void 0) { denormalizePersisted = false; }
    if (!item) {
        return null;
    }
    if (_.isUndefined(bag[item.type])) {
        bag[item.type] = {};
    }
    if (_.isUndefined(bag[item.type][item.id])) {
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
export var getSingleStoreResource = function (resourceId, storeData) {
    return _.get(storeData, [resourceId.type, resourceId.id], null);
};
/** @type {?} */
export var getMultipleStoreResource = function (resourceIds, resources) {
    return resourceIds.map(function (id) { return getSingleStoreResource(id, resources); });
};
/** @type {?} */
export var getDenormalisedPath = function (path, baseResourceType, resourceDefinitions, pathSeparator) {
    /** @type {?} */
    var denormPath = [];
    if (_.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    /** @type {?} */
    var fields = path.split(pathSeparator);
    /** @type {?} */
    var currentResourceType = baseResourceType;
    for (var i = 0; i < fields.length; i++) {
        /** @type {?} */
        var definition = _.find(resourceDefinitions, { type: currentResourceType });
        if (_.isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (_.isUndefined(definition.attributes) &&
            _.isUndefined(definition.relationships)) {
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
export var getDenormalisedValue = function (path, storeResource, resourceDefinitions, pathSeparator) {
    /** @type {?} */
    var denormalisedPath = getDenormalisedPath(path, storeResource.type, resourceDefinitions, pathSeparator);
    return _.get(storeResource, denormalisedPath);
};
/** *
 * Given two objects, it will merge the second in the first.
 *
  @type {?} */
export var updateResourceObject = function (original, source) {
    /**
     * @param {?} objValue
     * @param {?} srcValue
     * @return {?}
     */
    function customizer(objValue, srcValue) {
        if (_.isArray(objValue)) {
            return srcValue;
        }
    }
    return _.mergeWith({}, original, source, customizer);
};
/** *
 * Insert a StoreResource given the Resource and the StoreResources
 *
  @type {?} */
export var insertStoreResource = function (storeResources, resource, fromServer) {
    /** @type {?} */
    var newStoreResources = __assign({}, storeResources);
    if (fromServer) {
        newStoreResources[resource.id] = /** @type {?} */ (__assign({}, resource, { persistedResource: resource, state: 'IN_SYNC', errors: [], loading: false }));
    }
    else {
        newStoreResources[resource.id] = /** @type {?} */ (__assign({}, resource, { persistedResource: null, state: 'CREATED', errors: [], loading: false }));
    }
    return _.isEqual(storeResources, newStoreResources)
        ? storeResources
        : newStoreResources;
};
/** *
 * Removes a StoreResource given the Resource and the StoreResources
 *
  @type {?} */
export var removeStoreResource = function (storeData, resourceId) {
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
export var updateResourceState = function (storeData, resourceId, resourceState, loading) {
    if (_.isUndefined(storeData[resourceId.type]) ||
        _.isUndefined(storeData[resourceId.type][resourceId.id])) {
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
export var isEqualResource = function (resource0, resource1) {
    if (resource0 === resource1) {
        return true;
    }
    if ((resource0 !== null) !== (resource1 !== null)) {
        return false;
    }
    return (_.isEqual(resource0.id, resource1.id) &&
        _.isEqual(resource0.type, resource1.type) &&
        _.isEqual(resource0.attributes, resource1.attributes) &&
        _.isEqual(resource0.meta, resource1.meta) &&
        _.isEqual(resource0.links, resource1.links) &&
        _.isEqual(resource0.relationships, resource1.relationships));
};
/** @type {?} */
export var updateStoreResource = function (state, resource, fromServer) {
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
    return _.isEqual(newState[resource.id], state[resource.id])
        ? state
        : newState;
};
/** @type {?} */
export var updateQueriesForDeletedResource = function (state, deletedId) {
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
export var updateResourceErrorsForQuery = function (storeData, query, document) {
    if (!query.type || !query.id || document.data instanceof Array) {
        throw new Error('invalid parameters');
    }
    return updateResourceErrors(storeData, { id: query.id, type: query.type }, document.errors, 'SET');
};
/** @type {?} */
export var updateResourceErrors = function (storeData, id, errors, modificationType) {
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
                var remove = errors && errors.filter(function (it) { return _.isEqual(it, currentError); }).length > 0;
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
export var rollbackStoreResources = function (storeData, ids, include) {
    /** @type {?} */
    var newState = __assign({}, storeData);
    if (_.isUndefined(ids)) {
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
export var deleteStoreResources = function (storeData, query) {
    /** @type {?} */
    var newState = __assign({}, storeData);
    // if an id is not provided, all resources of the provided type will be deleted
    if (typeof query.id === 'undefined') {
        newState[query.type] = {};
    }
    else {
        newState[query.type] = /** @type {?} */ (_.omit(newState[query.type], [
            query.id,
        ]));
    }
    return newState;
};
/** @type {?} */
export var clearQueryResult = function (storeData, queryId) {
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
export var updateStoreDataFromResource = function (storeData, resource, fromServer, override) {
    if (_.isUndefined(storeData[resource.type])) {
        /** @type {?} */
        var newStoreData = __assign({}, storeData);
        newStoreData[resource.type] = {};
        newStoreData[resource.type] = insertStoreResource(newStoreData[resource.type], resource, fromServer);
        return newStoreData;
    }
    else if (_.isUndefined(storeData[resource.type][resource.id]) || override) {
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
export var updateStoreDataFromPayload = function (storeData, payload) {
    /** @type {?} */
    var data = /** @type {?} */ (_.get(payload, 'data'));
    if (_.isUndefined(data)) {
        return storeData;
    }
    /** @type {?} */
    var resources = _.isArray(data)
        ? /** @type {?} */ (data) : /** @type {?} */ ([data]);
    /** @type {?} */
    var included = /** @type {?} */ (_.get(payload, 'included'));
    if (!_.isUndefined(included)) {
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
        if (!_.isEqual(storeResource, resource)) {
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
export var updateQueryParams = function (storeQueries, query) {
    if (!query.queryId) {
        return storeQueries;
    }
    /** @type {?} */
    var newStoreQuery = __assign({}, storeQueries[query.queryId]);
    newStoreQuery.loading = true;
    newStoreQuery.query = _.cloneDeep(query);
    if (_.isUndefined(newStoreQuery.errors)) {
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
export var updateQueryResults = function (storeQueries, queryId, document) {
    /** @type {?} */
    var storeQuery = storeQueries[queryId];
    if (storeQuery) {
        /** @type {?} */
        var data = _.isArray(document.data) ? document.data : [document.data];
        /** @type {?} */
        var newQueryStore = __assign({}, storeQuery, { resultIds: data.map(function (it) { return (it ? toResourceIdentifier(it) : []); }), meta: document.meta, links: document.links, loading: false });
        if (!_.isEqual(newQueryStore, storeQuery)) {
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
export var updateQueryErrors = function (storeQueries, queryId, document) {
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
export var removeQuery = function (storeQueries, queryId) {
    /** @type {?} */
    var newState = __assign({}, storeQueries);
    delete newState[queryId];
    return newState;
};
/** *
 * Given a resource, it will return an object containing the resource id and type.
  @type {?} */
export var toResourceIdentifier = function (resource) {
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
export var getResourceFieldValueFromPath = function (path, baseStoreResource, storeData, resourceDefinitions, pathSeparator) {
    if (_.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    /** @type {?} */
    var fields = path.split(pathSeparator);
    /** @type {?} */
    var currentStoreResource = baseStoreResource;
    for (var i = 0; i < fields.length; i++) {
        /** @type {?} */
        var definition = _.find(resourceDefinitions, {
            type: currentStoreResource.type,
        });
        if (_.isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (_.isUndefined(definition.attributes) &&
            _.isUndefined(definition.relationships)) {
            throw new Error('Attributes or Relationships must be provided');
        }
        if (fields[i] === 'id') {
            return _.get(currentStoreResource, 'id', null);
        }
        else if (definition.attributes.hasOwnProperty(fields[i])) {
            return _.get(currentStoreResource, 'attributes.' + fields[i], null);
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
                var relation = _.get(currentStoreResource, 'relationships.' + fields[i], null);
                if (!relation || !relation.data) {
                    return null;
                }
                else {
                    /** @type {?} */
                    var relatedPath = [resourceRelation.type, relation.data.id];
                    currentStoreResource = _.get(storeData, relatedPath);
                }
            }
        }
        else {
            throw new Error('Cannot find field in attributes or relationships');
        }
        if (_.isUndefined(currentStoreResource)) {
            return null;
        }
    }
};
/** @type {?} */
export var filterResources = function (resources, storeData, query, resourceDefinitions, filteringConfig) {
    return _.filter(resources, function (resource) {
        if (query.hasOwnProperty('params') &&
            query.params.hasOwnProperty('filtering')) {
            return query.params.filtering.every(function (element) {
                /** @type {?} */
                var pathSeparator;
                /** @type {?} */
                var filteringOperators;
                if (!_.isUndefined(filteringConfig)) {
                    pathSeparator = /** @type {?} */ (_.get(filteringConfig, 'pathSeparator'));
                    filteringOperators = /** @type {?} */ (_.get(filteringConfig, 'filteringOperators'));
                }
                /** @type {?} */
                var resourceFieldValue = getResourceFieldValueFromPath(element.path, resource, storeData, resourceDefinitions, pathSeparator);
                if (!resourceFieldValue) {
                    return false;
                }
                /** @type {?} */
                var operator = /** @type {?} */ (_.find(filteringOperators, {
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
                        if (_.isString(element.value) && _.isString(resourceFieldValue)) {
                            return (element.value.toLowerCase() === resourceFieldValue.toLowerCase());
                        }
                        else {
                            return element.value === resourceFieldValue;
                        }
                    case 'exact':
                        return element.value === resourceFieldValue;
                    case 'contains':
                        return _.includes(resourceFieldValue, element.value);
                    case 'icontains':
                        return _.includes(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'in':
                        if (_.isArray(element.value)) {
                            return _.includes(element.value, resourceFieldValue);
                        }
                        else {
                            return _.includes([element.value], resourceFieldValue);
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
                        return _.startsWith(resourceFieldValue, element.value);
                    case 'istartswith':
                        return _.startsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'endswith':
                        return _.endsWith(resourceFieldValue, element.value);
                    case 'iendswith':
                        return _.endsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
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
export var generateIncludedQueryParams = function (included) {
    if (_.isEmpty(included)) {
        return '';
    }
    return 'include=' + included.join();
};
/** @type {?} */
export var generateFieldsQueryParams = function (fields) {
    if (_.isEmpty(fields)) {
        return '';
    }
    return 'fields=' + fields.join();
};
/** @type {?} */
export var generateFilteringQueryParams = function (filtering) {
    if (_.isEmpty(filtering)) {
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
export var generateSortingQueryParams = function (sorting) {
    if (_.isEmpty(sorting)) {
        return '';
    }
    return ('sort=' +
        sorting
            .map(function (f) { return (f.direction === Direction.ASC ? '' : '-') + f.api; })
            .join(','));
};
/** @type {?} */
export var generateQueryParams = function () {
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
export var generatePayload = function (resource, operation) {
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
export var uuid = function () {
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
var ɵ0 = toKey;
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
var ɵ1 = collectQueryResults;
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
var ɵ2 = collectPendingChanges;
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
var ɵ3 = collectReferencesForResource;
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
var ɵ4 = collectReferences;
/** @type {?} */
var sweepUnusedResources = function (state, usedResources) {
    /** @type {?} */
    var hasDeletions = false;
    /** @type {?} */
    var newState = _.cloneDeep(state);
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
            if (_.isEmpty(resources)) {
                delete newState.data[type];
            }
        }
    }
    return hasDeletions ? newState : state;
};
var ɵ5 = sweepUnusedResources;
/** @type {?} */
export var compactStore = function (state) {
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
/**
 * @record
 */
function TopologySortContext() { }
/** @type {?} */
TopologySortContext.prototype.pendingResources;
/** @type {?} */
TopologySortContext.prototype.cursor;
/** @type {?} */
TopologySortContext.prototype.sorted;
/** @type {?} */
TopologySortContext.prototype.visited;
/** @type {?} */
TopologySortContext.prototype.dependencies;
/** @type {?} */
export var sortPendingChanges = function (pendingResources) {
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
var ɵ6 = visitPending;
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
                    if (_.isArray(data)) {
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
export function getPendingChanges(state, ids, include, includeNew) {
    /** @type {?} */
    var pending = [];
    if (_.isUndefined(ids)) {
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
        pending = _.uniqBy(pending, function (e) {
            return e.type + '####' + e.id;
        });
    }
    return pending;
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6 };
//# sourceMappingURL=utils.js.map