import { CommonModule } from '@angular/common';
import { InjectionToken, Pipe, Inject, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var BrapiConfig = new InjectionToken("BrapiConfig");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ProductImagePipe = /** @class */ (function () {
    function ProductImagePipe(config, _http) {
        this.config = config;
        this._http = _http;
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    ProductImagePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        var _this = this;
        console.log(value, args);
        return new Promise(function (resolve, reject) {
            /** @type {?} */
            var storagePath = window.localStorage.getItem(args + value);
            if (storagePath) {
                resolve(storagePath);
            }
            else {
                /** @type {?} */
                var _requestToken = null;
                if (!ProductImagePipe.auth)
                    _requestToken = _this._logInApi();
                else if (ProductImagePipe.auth.isExpired())
                    _requestToken = _this._loginRefresh();
                if (_requestToken) {
                    _requestToken.subscribe(function (data) {
                        _this._requestImage(value, args)
                            .subscribe(function (res) { return resolve(res); }, function (error) { return resolve(''); });
                    }, function (error) {
                        resolve('');
                    });
                }
                else {
                    _this._requestImage(value, args)
                        .subscribe(function (data) { return resolve(data); }, function (error) { return resolve(''); });
                }
            }
        });
    };
    /**
     * @private
     * @param {?} paramn
     * @param {?} type
     * @return {?}
     */
    ProductImagePipe.prototype._requestImage = /**
     * @private
     * @param {?} paramn
     * @param {?} type
     * @return {?}
     */
    function (paramn, type) {
        var _this = this;
        return Observable.create(function (observer) {
            /** @type {?} */
            var type = 'pesquisarPorSku';
            /** @type {?} */
            var _data = {
                medida: _this.config.defaultSize,
                proposito: _this.config.proposito
            };
            if (type == 'ean') {
                type = 'pesquisarPorEan';
                _data.eans = [paramn];
            }
            else {
                _data.skus = [paramn];
            }
            _this._http.post(_this.config.pathApi + "api/" + type, _data, { headers: {
                    "Authorization": ProductImagePipe.auth.token_type + " " + ProductImagePipe.auth.access_token
                } }).subscribe(function (data) {
                if (data && data.length) {
                    window.localStorage.setItem(type + paramn, data[0].url);
                    observer.next(data[0].url);
                }
                else
                    observer.next('');
            }, function (error) { return observer.next(''); });
        });
    };
    /**
     * @private
     * @return {?}
     */
    ProductImagePipe.prototype._logInApi = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this._http.post(_this.config.pathApi + "api/login", {
                username: _this.config.userName,
                password: _this.config.password
            }).subscribe(function (data) { ProductImagePipe.auth = BrapiAuth.fromData(data); observer.next(); }, function (error) { console.error(error); observer.error(error); });
        });
    };
    /**
     * @private
     * @return {?}
     */
    ProductImagePipe.prototype._loginRefresh = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this._http.post(_this.config.pathApi + "/oauth/refresh_token", {
                grant_type: "refresh_token",
                refresh_token: ProductImagePipe.auth.refresh_token
            }).subscribe(function (data) { ProductImagePipe.auth = BrapiAuth.fromData(data); observer.next(); }, function (error) { console.error(error); observer.error(error); });
        });
    };
    ProductImagePipe.auth = null;
    ProductImagePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'productImage'
                },] }
    ];
    /** @nocollapse */
    ProductImagePipe.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [BrapiConfig,] }] },
        { type: HttpClient }
    ]; };
    return ProductImagePipe;
}());
var BrapiAuth = /** @class */ (function () {
    function BrapiAuth() {
    }
    /**
     * @param {?} data
     * @return {?}
     */
    BrapiAuth.fromData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var object = (/** @type {?} */ (data));
        object.expireIn = object.expireIn * 1000 + new Date().getTime();
        return object;
    };
    /**
     * @return {?}
     */
    BrapiAuth.prototype.isExpired = /**
     * @return {?}
     */
    function () {
        return new Date().getTime() >= (this.expireIn - 30000);
    };
    return BrapiAuth;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BrapiImagesModule = /** @class */ (function () {
    function BrapiImagesModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    BrapiImagesModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
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
    };
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
    return BrapiImagesModule;
}());

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