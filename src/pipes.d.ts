import { PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import { NgrxJsonApiService } from './services';
import { ResourceIdentifier, StoreResource } from './interfaces';
export declare class SelectStoreResourcePipe implements PipeTransform {
    private service;
    constructor(service: NgrxJsonApiService);
    transform(id: ResourceIdentifier, zoneId?: string): Observable<StoreResource>;
}
export declare class SelectStoreResourcesPipe implements PipeTransform {
    private service;
    constructor(service: NgrxJsonApiService);
    transform(ids: ResourceIdentifier[], zoneId?: string): Observable<StoreResource[]>;
}
export declare class DenormaliseStoreResourcePipe implements PipeTransform {
    private service;
    constructor(service: NgrxJsonApiService);
    transform(obs: Observable<StoreResource | StoreResource[]>, zoneId?: string): Observable<StoreResource | StoreResource[]>;
}
export declare class GetDenormalisedValuePipe implements PipeTransform {
    private service;
    constructor(service: NgrxJsonApiService);
    transform(path: string, storeResource: StoreResource): any;
}
