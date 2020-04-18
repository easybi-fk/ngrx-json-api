import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Document, NgrxJsonApiConfig, ResourceDefinition, Query } from './interfaces';
export declare class NgrxJsonApi {
    private http;
    config: NgrxJsonApiConfig;
    headers: HttpHeaders;
    requestUrl: string;
    definitions: ResourceDefinition[];
    constructor(http: HttpClient, config: NgrxJsonApiConfig);
    private urlBuilder;
    private collectionPathFor;
    private collectionUrlFor;
    private resourcePathFor;
    private resourceUrlFor;
    find(query: Query): Observable<any>;
    create(query: Query, document: Document): Observable<any>;
    update(query: Query, document: Document): Observable<any>;
    delete(query: Query): Observable<any>;
    private request;
}
