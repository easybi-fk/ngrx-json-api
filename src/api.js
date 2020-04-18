var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import { HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { generateIncludedQueryParams, generateFieldsQueryParams, generateFilteringQueryParams, generateSortingQueryParams, generateQueryParams, } from './utils';
var NgrxJsonApi = /** @class */ (function () {
    function NgrxJsonApi(http, config) {
        this.http = http;
        this.config = config;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json',
        });
        this.definitions = this.config.resourceDefinitions;
        if (this.config.requestHeaders) {
            for (var _i = 0, _a = _.keys(this.config.requestHeaders); _i < _a.length; _i++) {
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
        var definition = _.find(this.definitions, { type: type });
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
            return Observable.throw('Query not found');
        }
        if (query.hasOwnProperty('params') && !_.isEmpty(query.params)) {
            if (_.hasIn(query.params, 'include')) {
                includedParam = _generateIncludedQueryParams(query.params.include);
            }
            if (_.hasIn(query.params, 'filtering')) {
                filteringParams = _generateFilteringQueryParams(query.params.filtering);
            }
            if (_.hasIn(query.params, 'sorting')) {
                sortingParams = _generateSortingQueryParams(query.params.sorting);
            }
            if (_.hasIn(query.params, 'fields')) {
                fieldsParams = _generateFieldsQueryParams(query.params.fields);
            }
            if (_.hasIn(query.params, 'limit')) {
                limitParams = 'page[limit]=' + query.params.limit;
            }
            if (_.hasIn(query.params, 'offset')) {
                offsetParams = 'page[offset]=' + query.params.offset;
            }
            if (_.hasIn(query.params, 'page')) {
                pageParams = _.keys(query.params.page)
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
            return Observable.throw('Query not found');
        }
        if (typeof document === undefined) {
            return Observable.throw('Data not found');
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
            return Observable.throw('Query not found');
        }
        if (typeof document === undefined) {
            return Observable.throw('Data not found');
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
            return Observable.throw('Query not found');
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
        var request;
        /** @type {?} */
        var newRequestOptions = __assign({}, requestOptions, { headers: this.headers, observe: 'response', withCredentials: this.config.requestWithCredentials });
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
export { NgrxJsonApi };
if (false) {
    /** @type {?} */
    NgrxJsonApi.prototype.headers;
    /** @type {?} */
    NgrxJsonApi.prototype.requestUrl;
    /** @type {?} */
    NgrxJsonApi.prototype.definitions;
    /** @type {?} */
    NgrxJsonApi.prototype.http;
    /** @type {?} */
    NgrxJsonApi.prototype.config;
}
//# sourceMappingURL=api.js.map