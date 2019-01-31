import { CommonModule } from '@angular/common';
import { InjectionToken, Pipe, Inject, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const BrapiConfig = new InjectionToken("BrapiConfig");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ProductImagePipe {
    /**
     * @param {?} config
     * @param {?} _http
     */
    constructor(config, _http) {
        this.config = config;
        this._http = _http;
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        console.log(value, args);
        return new Promise((resolve, reject) => {
            /** @type {?} */
            let storagePath = window.localStorage.getItem(args + value);
            if (storagePath) {
                resolve(storagePath);
            }
            else {
                /** @type {?} */
                let _requestToken = null;
                if (!ProductImagePipe.auth)
                    _requestToken = this._logInApi();
                else if (ProductImagePipe.auth.isExpired())
                    _requestToken = this._loginRefresh();
                if (_requestToken) {
                    _requestToken.subscribe(data => {
                        this._requestImage(value, args)
                            .subscribe(res => resolve(res), error => resolve(''));
                    }, error => {
                        resolve('');
                    });
                }
                else {
                    this._requestImage(value, args)
                        .subscribe(data => resolve(data), error => resolve(''));
                }
            }
        });
    }
    /**
     * @private
     * @param {?} paramn
     * @param {?} type
     * @return {?}
     */
    _requestImage(paramn, type) {
        return Observable.create(observer => {
            /** @type {?} */
            let type = 'pesquisarPorSku';
            /** @type {?} */
            let _data = {
                medida: this.config.defaultSize,
                proposito: this.config.proposito
            };
            if (type == 'ean') {
                type = 'pesquisarPorEan';
                _data.eans = [paramn];
            }
            else {
                _data.skus = [paramn];
            }
            this._http.post(`${this.config.pathApi}api/${type}`, _data, { headers: {
                    "Authorization": `${ProductImagePipe.auth.token_type} ${ProductImagePipe.auth.access_token}`
                } }).subscribe((data) => {
                if (data && data.length) {
                    window.localStorage.setItem(type + paramn, data[0].url);
                    observer.next(data[0].url);
                }
                else
                    observer.next('');
            }, error => observer.next(''));
        });
    }
    /**
     * @private
     * @return {?}
     */
    _logInApi() {
        return Observable.create(observer => {
            this._http.post(`${this.config.pathApi}api/login`, {
                username: this.config.userName,
                password: this.config.password
            }).subscribe(data => { ProductImagePipe.auth = BrapiAuth.fromData(data); observer.next(); }, error => { console.error(error); observer.error(error); });
        });
    }
    /**
     * @private
     * @return {?}
     */
    _loginRefresh() {
        return Observable.create(observer => {
            this._http.post(`${this.config.pathApi}/oauth/refresh_token`, {
                grant_type: "refresh_token",
                refresh_token: ProductImagePipe.auth.refresh_token
            }).subscribe(data => { ProductImagePipe.auth = BrapiAuth.fromData(data); observer.next(); }, error => { console.error(error); observer.error(error); });
        });
    }
}
ProductImagePipe.auth = null;
ProductImagePipe.decorators = [
    { type: Pipe, args: [{
                name: 'productImage'
            },] }
];
/** @nocollapse */
ProductImagePipe.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [BrapiConfig,] }] },
    { type: HttpClient }
];
class BrapiAuth {
    /**
     * @param {?} data
     * @return {?}
     */
    static fromData(data) {
        /** @type {?} */
        let object = (/** @type {?} */ (data));
        object.expireIn = object.expireIn * 1000 + new Date().getTime();
        return object;
    }
    /**
     * @return {?}
     */
    isExpired() {
        return new Date().getTime() >= (this.expireIn - 30000);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BrapiImagesModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: BrapiImagesModule,
            providers: [
                ProductImagePipe,
                {
                    provide: BrapiConfig,
                    useValue: config
                }
            ]
        };
    }
}
BrapiImagesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ProductImagePipe],
                exports: [ProductImagePipe],
                imports: [
                    CommonModule,
                    HttpClientModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { BrapiImagesModule, BrapiConfig as ɵc, ProductImagePipe as ɵa };

//# sourceMappingURL=brapi-images.js.map