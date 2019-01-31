(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('rxjs'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('brapi-images', ['exports', '@angular/common', '@angular/core', 'rxjs', '@angular/common/http'], factory) :
    (factory((global['brapi-images'] = {}),global.ng.common,global.ng.core,global.rxjs,global.ng.common.http));
}(this, (function (exports,common,core,rxjs,http) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var BrapiConfig = new core.InjectionToken("BrapiConfig");

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
                return rxjs.Observable.create(function (observer) {
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
                return rxjs.Observable.create(function (observer) {
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
                return rxjs.Observable.create(function (observer) {
                    _this._http.post(_this.config.pathApi + "/oauth/refresh_token", {
                        grant_type: "refresh_token",
                        refresh_token: ProductImagePipe.auth.refresh_token
                    }).subscribe(function (data) { ProductImagePipe.auth = BrapiAuth.fromData(data); observer.next(); }, function (error) { console.error(error); observer.error(error); });
                });
            };
        ProductImagePipe.auth = null;
        ProductImagePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'productImage'
                    },] }
        ];
        /** @nocollapse */
        ProductImagePipe.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [BrapiConfig,] }] },
                { type: http.HttpClient }
            ];
        };
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
                var object = ( /** @type {?} */(data));
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
            { type: core.NgModule, args: [{
                        declarations: [ProductImagePipe],
                        exports: [ProductImagePipe],
                        imports: [
                            common.CommonModule,
                            http.HttpClientModule
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

    exports.BrapiImagesModule = BrapiImagesModule;
    exports.ɵc = BrapiConfig;
    exports.ɵa = ProductImagePipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=brapi-images.umd.js.map