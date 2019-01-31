import { PipeTransform } from '@angular/core';
import { _BrapiConfig } from './models';
import { HttpClient } from '@angular/common/http';
export declare class ProductImagePipe implements PipeTransform {
    private config;
    private _http;
    private static auth;
    constructor(config: _BrapiConfig, _http: HttpClient);
    transform(value: any, args?: any): Promise<string>;
    private _requestImage;
    private _logInApi;
    private _loginRefresh;
}
