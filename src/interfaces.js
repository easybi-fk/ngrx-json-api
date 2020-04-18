/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
export var NGRX_JSON_API_DEFAULT_ZONE = 'default';
/** @enum {number} */
var Direction = {
    ASC: 0,
    DESC: 1,
};
export { Direction };
Direction[Direction.ASC] = 'ASC';
Direction[Direction.DESC] = 'DESC';
/**
 * @record
 */
export function Document() { }
/** @type {?|undefined} */
Document.prototype.data;
/** @type {?|undefined} */
Document.prototype.included;
/** @type {?|undefined} */
Document.prototype.meta;
/** @type {?|undefined} */
Document.prototype.links;
/** @type {?|undefined} */
Document.prototype.errors;
/**
 * @record
 */
export function FilteringParam() { }
/** @type {?|undefined} */
FilteringParam.prototype.path;
/** @type {?|undefined} */
FilteringParam.prototype.operator;
/** @type {?|undefined} */
FilteringParam.prototype.value;
/**
 * @record
 */
export function FilteringOperator() { }
/** @type {?} */
FilteringOperator.prototype.name;
/** @type {?|undefined} */
FilteringOperator.prototype.apiName;
/** @type {?} */
FilteringOperator.prototype.comparison;
/**
 * @record
 */
export function ManyResourceRelationship() { }
/** @type {?|undefined} */
ManyResourceRelationship.prototype.data;
/** @type {?|undefined} */
ManyResourceRelationship.prototype.reference;
// unsupported: template constraints.
/**
 * Used by code generators to navigate relationships in a type-safe manner.
 * See crnk.io for a first such generator.
 * @record
 * @template T
 */
export function TypedManyResourceRelationship() { }
/** @type {?|undefined} */
TypedManyResourceRelationship.prototype.reference;
// unsupported: template constraints.
/**
 * Used by code generators to navigate relationships in a type-safe manner.
 * See crnk.io for a first such generator.
 * @record
 * @template T
 */
export function TypedOneResourceRelationship() { }
/** @type {?|undefined} */
TypedOneResourceRelationship.prototype.reference;
/**
 * @record
 */
export function NgrxJsonApiConfig() { }
/** @type {?} */
NgrxJsonApiConfig.prototype.apiUrl;
/** @type {?|undefined} */
NgrxJsonApiConfig.prototype.initialState;
/** @type {?|undefined} */
NgrxJsonApiConfig.prototype.resourceDefinitions;
/** @type {?|undefined} */
NgrxJsonApiConfig.prototype.urlBuilder;
/** @type {?|undefined} */
NgrxJsonApiConfig.prototype.filteringConfig;
/**
 * Custom request headers.
 * @type {?|undefined}
 */
NgrxJsonApiConfig.prototype.requestHeaders;
/**
 * Allows to disable the apply action and replace it with a custom one. For example
 * have a look at www.crnk.io that makes use of JSON PATCH to perform bulk updates.
 * @type {?|undefined}
 */
NgrxJsonApiConfig.prototype.applyEnabled;
/**
 * Allows to send/receive cookies, authorization headers with cross-site request.
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
 *
 * default is false
 * @type {?|undefined}
 */
NgrxJsonApiConfig.prototype.requestWithCredentials;
/**
 * @record
 */
export function NgrxJsonApiState() { }
/** @type {?} */
NgrxJsonApiState.prototype.zones;
/**
 * @record
 */
export function NgrxJsonApiZones() { }
/**
 * deprecated, mae use of NgrxJsonApiZone instead
 * @record
 */
export function NgrxJsonApiStore() { }
/** @type {?} */
NgrxJsonApiStore.prototype.data;
/** @type {?} */
NgrxJsonApiStore.prototype.queries;
/** @type {?} */
NgrxJsonApiStore.prototype.isCreating;
/** @type {?} */
NgrxJsonApiStore.prototype.isReading;
/** @type {?} */
NgrxJsonApiStore.prototype.isUpdating;
/** @type {?} */
NgrxJsonApiStore.prototype.isDeleting;
/** @type {?} */
NgrxJsonApiStore.prototype.isApplying;
/**
 * @record
 */
export function NgrxJsonApiZone() { }
/**
 * @record
 */
export function NgrxJsonApiStoreData() { }
/**
 * @record
 */
export function NgrxJsonApiStoreQueries() { }
/**
 * @record
 */
export function NgrxJsonApiStoreResources() { }
/**
 * @record
 */
export function NgrxJsonApiFilteringConfig() { }
/** @type {?|undefined} */
NgrxJsonApiFilteringConfig.prototype.pathSeparator;
/** @type {?|undefined} */
NgrxJsonApiFilteringConfig.prototype.filteringOperators;
/**
 * @record
 */
export function NgrxJsonApiUrlBuilder() { }
/** @type {?|undefined} */
NgrxJsonApiUrlBuilder.prototype.generateFilteringQueryParams;
/** @type {?|undefined} */
NgrxJsonApiUrlBuilder.prototype.generateFieldsQueryParams;
/** @type {?|undefined} */
NgrxJsonApiUrlBuilder.prototype.generateIncludedQueryParams;
/** @type {?|undefined} */
NgrxJsonApiUrlBuilder.prototype.generateSortingQueryParams;
/** @type {?|undefined} */
NgrxJsonApiUrlBuilder.prototype.generateQueryParams;
/** @typedef {?} */
var OperationType;
export { OperationType };
/**
 * @record
 */
export function OneResourceRelationship() { }
/** @type {?|undefined} */
OneResourceRelationship.prototype.data;
/** @type {?|undefined} */
OneResourceRelationship.prototype.reference;
/** @typedef {?} */
var ErrorModificationType;
export { ErrorModificationType };
/**
 * @record
 */
export function ModifyStoreResourceErrorsPayload() { }
/** @type {?} */
ModifyStoreResourceErrorsPayload.prototype.resourceId;
/** @type {?} */
ModifyStoreResourceErrorsPayload.prototype.errors;
/** @type {?} */
ModifyStoreResourceErrorsPayload.prototype.modificationType;
/**
 * @record
 */
export function Payload() { }
/** @type {?|undefined} */
Payload.prototype.jsonApiData;
/** @type {?|undefined} */
Payload.prototype.query;
/**
 * Specifies a GET query with parameters.
 * @record
 */
export function Query() { }
/**
 * Uniquely identifies the query in the store
 * @type {?|undefined}
 */
Query.prototype.queryId;
/**
 * resource type to query.
 * @type {?|undefined}
 */
Query.prototype.type;
/**
 * resource id to query.
 * @type {?|undefined}
 */
Query.prototype.id;
/**
 * sorting, filtering, etc. parameters.
 * @type {?|undefined}
 */
Query.prototype.params;
/**
 * @record
 */
export function QueryParams() { }
/** @type {?|undefined} */
QueryParams.prototype.filtering;
/** @type {?|undefined} */
QueryParams.prototype.sorting;
/** @type {?|undefined} */
QueryParams.prototype.include;
/** @type {?|undefined} */
QueryParams.prototype.fields;
/** @type {?|undefined} */
QueryParams.prototype.offset;
/** @type {?|undefined} */
QueryParams.prototype.limit;
/** @type {?|undefined} */
QueryParams.prototype.page;
/**
 * @record
 */
export function QueryPageParams() { }
/* TODO: handle strange member:
[id: string]: string | number;
*/
/** @type {?|undefined} */
QueryPageParams.prototype.offset;
/** @type {?|undefined} */
QueryPageParams.prototype.limit;
/** @type {?|undefined} */
QueryPageParams.prototype.number;
/** @type {?|undefined} */
QueryPageParams.prototype.size;
/**
 * Represents a resource obtained from the server.
 * @record
 */
export function Resource() { }
/** @type {?|undefined} */
Resource.prototype.attributes;
/** @type {?|undefined} */
Resource.prototype.relationships;
/** @type {?|undefined} */
Resource.prototype.meta;
/** @type {?|undefined} */
Resource.prototype.isMetaOnly;
/** @type {?|undefined} */
Resource.prototype.links;
/**
 * @record
 */
export function ResourceAttributeDefinition() { }
/** @type {?|undefined} */
ResourceAttributeDefinition.prototype.apiName;
/**
 * @record
 */
export function ResourceDefinition() { }
/** @type {?} */
ResourceDefinition.prototype.type;
/** @type {?} */
ResourceDefinition.prototype.collectionPath;
/** @type {?|undefined} */
ResourceDefinition.prototype.attributes;
/** @type {?|undefined} */
ResourceDefinition.prototype.relationships;
/**
 * @record
 */
export function ResourceError() { }
/** @type {?|undefined} */
ResourceError.prototype.id;
/** @type {?|undefined} */
ResourceError.prototype.links;
/** @type {?|undefined} */
ResourceError.prototype.status;
/** @type {?|undefined} */
ResourceError.prototype.code;
/** @type {?|undefined} */
ResourceError.prototype.title;
/** @type {?|undefined} */
ResourceError.prototype.detail;
/** @type {?|undefined} */
ResourceError.prototype.source;
/** @type {?|undefined} */
ResourceError.prototype.meta;
/**
 * @record
 */
export function ResourceErrorSource() { }
/** @type {?|undefined} */
ResourceErrorSource.prototype.pointer;
/** @type {?|undefined} */
ResourceErrorSource.prototype.parameter;
/**
 * @record
 */
export function ResourceIdentifier() { }
/** @type {?} */
ResourceIdentifier.prototype.type;
/** @type {?} */
ResourceIdentifier.prototype.id;
/**
 * @record
 */
export function ResourceRelationship() { }
/** @type {?|undefined} */
ResourceRelationship.prototype.data;
/** @type {?|undefined} */
ResourceRelationship.prototype.links;
/** @type {?|undefined} */
ResourceRelationship.prototype.reference;
/**
 * @record
 */
export function ResourceRelationDefinition() { }
/** @type {?} */
ResourceRelationDefinition.prototype.type;
/** @type {?} */
ResourceRelationDefinition.prototype.relationType;
/** @typedef {?} */
var ResourceRelationType;
export { ResourceRelationType };
/** @typedef {?} */
var ResourceState;
export { ResourceState };
/**
 * @record
 */
export function SortingParam() { }
/** @type {?} */
SortingParam.prototype.api;
/** @type {?} */
SortingParam.prototype.direction;
/**
 * @record
 */
export function QueryResult() { }
/**
 * Holds the resources from the query results. The field is dynamically populated by denormalizing
 * StoreQuery.queryResults with the corresponding resources from the store.
 * @type {?|undefined}
 */
QueryResult.prototype.data;
/**
 * @record
 */
export function ManyQueryResult() { }
/** @type {?|undefined} */
ManyQueryResult.prototype.data;
/**
 * @record
 */
export function OneQueryResult() { }
/** @type {?|undefined} */
OneQueryResult.prototype.data;
/**
 * @record
 */
export function StoreQuery() { }
/**
 * query parameter
 * @type {?}
 */
StoreQuery.prototype.query;
/**
 * Whether data is fetched from the server.
 * @type {?}
 */
StoreQuery.prototype.loading;
/**
 * Ordered list of result identifiers that can be used to fetch the actual resources from the store.
 * @type {?|undefined}
 */
StoreQuery.prototype.resultIds;
/**
 * Meta information obtained along with the results
 * @type {?|undefined}
 */
StoreQuery.prototype.meta;
/**
 * Links information obtained along with the results.
 * @type {?|undefined}
 */
StoreQuery.prototype.links;
/**
 * Errors received from the server after attempting to perform a GET request. Errors related to POST, PATCH and
 * DELETE are added to StoreResource.
 * @type {?}
 */
StoreQuery.prototype.errors;
/**
 * Container to hold a Resource in the store with state information.
 * @record
 */
export function StoreResource() { }
/**
 * State of the resource to track local changes not yet
 * published to the json api endpoint.
 * @type {?|undefined}
 */
StoreResource.prototype.state;
/**
 * The original resource obtained from the server.
 * @type {?|undefined}
 */
StoreResource.prototype.persistedResource;
/**
 * One of the operation types: reading, creating, updating or deleting.
 * @type {?|undefined}
 */
StoreResource.prototype.loading;
/**
 * Errors received from the server after attempting to store the resource.
 * @type {?|undefined}
 */
StoreResource.prototype.errors;
/**
 * new resources may only obtain an id when posted to the server. Till that point
 * a StoreResource can assign make use of a temporary id and signal this by setting
 * this flag to true. The id will not be transmitted to the server and the resource
 * is removed from its temporary location (given by its id) as soon as it is posted
 * to the server.
 * @type {?|undefined}
 */
StoreResource.prototype.hasTemporaryId;
//# sourceMappingURL=interfaces.js.map