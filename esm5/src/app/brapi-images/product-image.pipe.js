/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, Inject } from '@angular/core';
import { BrapiConfig } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
export { ProductImagePipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ProductImagePipe.auth;
    /**
     * @type {?}
     * @private
     */
    ProductImagePipe.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ProductImagePipe.prototype._http;
}
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
if (false) {
    /** @type {?} */
    BrapiAuth.prototype.username;
    /** @type {?} */
    BrapiAuth.prototype.roles;
    /** @type {?} */
    BrapiAuth.prototype.token_type;
    /** @type {?} */
    BrapiAuth.prototype.access_token;
    /** @type {?} */
    BrapiAuth.prototype.expires_in;
    /** @type {?} */
    BrapiAuth.prototype.refresh_token;
    /** @type {?} */
    BrapiAuth.prototype.expireIn;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYnJhcGktaW1hZ2VzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9icmFwaS1pbWFnZXMvcHJvZHVjdC1pbWFnZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBZ0IsTUFBTSxVQUFVLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbEM7SUFPRSwwQkFDK0IsTUFBb0IsRUFDekMsS0FBaUI7UUFESSxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQVk7SUFDekIsQ0FBQzs7Ozs7O0lBQ0gsb0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFVLEVBQUUsSUFBVTtRQUFoQyxpQkFtQ0M7UUFsQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNOztnQkFDN0IsV0FBVyxHQUFXLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksR0FBQyxLQUFLLENBQUM7WUFDakUsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNOztvQkFDRCxhQUFhLEdBQXFCLElBQUk7Z0JBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJO29CQUN4QixhQUFhLEdBQUcsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3FCQUM5QixJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ3hDLGFBQWEsR0FBRyxLQUFJLENBQUMsYUFBYSxF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NUdELElBNEdDO1NBekdZLGdCQUFnQjs7Ozs7O0lBRTNCLHNCQUFzQzs7Ozs7SUFHcEMsa0NBQWlEOzs7OztJQUNqRCxpQ0FBeUI7O0FBcUc3QjtJQUFBO0lBb0JBLENBQUM7Ozs7O0lBVmUsa0JBQVE7Ozs7SUFBdEIsVUFBdUIsSUFBUzs7WUFDMUIsTUFBTSxHQUFJLG1CQUFBLElBQUksRUFBYTtRQUMvQixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVNLDZCQUFTOzs7SUFBaEI7UUFDRSxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFSCxnQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7OztJQWxCQyw2QkFBd0I7O0lBQ3hCLDBCQUF1Qjs7SUFDdkIsK0JBQTBCOztJQUMxQixpQ0FBNEI7O0lBQzVCLCtCQUEwQjs7SUFDMUIsa0NBQTZCOztJQUM3Qiw2QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyYXBpQ29uZmlnLCBfQnJhcGlDb25maWcgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdwcm9kdWN0SW1hZ2UnXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RJbWFnZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwcml2YXRlIHN0YXRpYyBhdXRoOiBCcmFwaUF1dGggPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQnJhcGlDb25maWcpIHByaXZhdGUgY29uZmlnOiBfQnJhcGlDb25maWcsXG4gICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudFxuICApe31cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnNvbGUubG9nKHZhbHVlLCBhcmdzKVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgc3RvcmFnZVBhdGg6IHN0cmluZyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcmdzK3ZhbHVlKTtcbiAgICAgIGlmIChzdG9yYWdlUGF0aCkge1xuICAgICAgICByZXNvbHZlKHN0b3JhZ2VQYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBfcmVxdWVzdFRva2VuOiBPYnNlcnZhYmxlPHZvaWQ+ID0gbnVsbDtcbiAgICAgICAgaWYgKCFQcm9kdWN0SW1hZ2VQaXBlLmF1dGgpXG4gICAgICAgICAgX3JlcXVlc3RUb2tlbiA9IHRoaXMuX2xvZ0luQXBpKCk7XG4gICAgICAgIGVsc2UgaWYgKFByb2R1Y3RJbWFnZVBpcGUuYXV0aC5pc0V4cGlyZWQoKSlcbiAgICAgICAgICBfcmVxdWVzdFRva2VuID0gdGhpcy5fbG9naW5SZWZyZXNoKCk7XG5cbiAgICAgICAgaWYgKF9yZXF1ZXN0VG9rZW4pIHtcbiAgICAgICAgICBfcmVxdWVzdFRva2VuLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9yZXF1ZXN0SW1hZ2UodmFsdWUsIGFyZ3MpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgIHJlcyA9PiByZXNvbHZlKHJlcyksXG4gICAgICAgICAgICAgICAgICBlcnJvciA9PiByZXNvbHZlKCcnKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlcXVlc3RJbWFnZSh2YWx1ZSwgYXJncylcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZGF0YSA9PiByZXNvbHZlKGRhdGEpLFxuICAgICAgICAgICAgZXJyb3IgPT4gcmVzb2x2ZSgnJylcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVxdWVzdEltYWdlKHBhcmFtbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcpOk9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKFxuICAgICAgb2JzZXJ2ZXIgPT4ge1xuICAgICAgICBsZXQgdHlwZSA9ICdwZXNxdWlzYXJQb3JTa3UnO1xuICAgICAgICBsZXQgX2RhdGEgOiBhbnkgPSB7XG4gICAgICAgICAgbWVkaWRhIDogdGhpcy5jb25maWcuZGVmYXVsdFNpemUsIFxuICAgICAgICAgIHByb3Bvc2l0byA6IHRoaXMuY29uZmlnLnByb3Bvc2l0b1xuICAgICAgICB9XG4gICAgICAgIGlmKHR5cGUgPT0gJ2VhbicpIHsgXG4gICAgICAgICAgdHlwZSA9ICdwZXNxdWlzYXJQb3JFYW4nOyBcbiAgICAgICAgICBfZGF0YS5lYW5zID0gW3BhcmFtbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2RhdGEuc2t1cyA9IFtwYXJhbW5dO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faHR0cC5wb3N0KGAke3RoaXMuY29uZmlnLnBhdGhBcGl9YXBpLyR7dHlwZX1gLCBfZGF0YSx7IGhlYWRlcnMgOiB7XG4gICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGAke1Byb2R1Y3RJbWFnZVBpcGUuYXV0aC50b2tlbl90eXBlfSAke1Byb2R1Y3RJbWFnZVBpcGUuYXV0aC5hY2Nlc3NfdG9rZW59YFxuICAgICAgICB9fSkuc3Vic2NyaWJlKFxuICAgICAgICAgIChkYXRhOiBhbnkpID0+IHsgaWYoZGF0YSAmJiBkYXRhLmxlbmd0aCl7IFxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHR5cGUrcGFyYW1uLCBkYXRhWzBdLnVybCk7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGFbMF0udXJsKTsgXG4gICAgICAgICAgfSBlbHNlIG9ic2VydmVyLm5leHQoJycpOyB9LFxuICAgICAgICAgIGVycm9yID0+IG9ic2VydmVyLm5leHQoJycpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9nSW5BcGkoKTpPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoXG4gICAgICBvYnNlcnZlciA9PiB7XG4gICAgICAgIHRoaXMuX2h0dHAucG9zdChgJHt0aGlzLmNvbmZpZy5wYXRoQXBpfWFwaS9sb2dpbmAsIFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLmNvbmZpZy51c2VyTmFtZSwgXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5jb25maWcucGFzc3dvcmRcbiAgICAgICAgICB9XG4gICAgICAgICkuc3Vic2NyaWJlKFxuICAgICAgICAgIGRhdGEgPT4geyBQcm9kdWN0SW1hZ2VQaXBlLmF1dGggPSBCcmFwaUF1dGguZnJvbURhdGEoZGF0YSk7IG9ic2VydmVyLm5leHQoKSB9LFxuICAgICAgICAgIGVycm9yID0+IHtjb25zb2xlLmVycm9yKGVycm9yKTsgb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9sb2dpblJlZnJlc2goKTpPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoXG4gICAgICBvYnNlcnZlciA9PiB7XG4gICAgICAgIHRoaXMuX2h0dHAucG9zdChgJHt0aGlzLmNvbmZpZy5wYXRoQXBpfS9vYXV0aC9yZWZyZXNoX3Rva2VuYCwgXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCIsXG4gICAgICAgICAgICByZWZyZXNoX3Rva2VuOiBQcm9kdWN0SW1hZ2VQaXBlLmF1dGgucmVmcmVzaF90b2tlblxuICAgICAgICAgIH1cbiAgICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgICAgZGF0YSA9PiB7IFByb2R1Y3RJbWFnZVBpcGUuYXV0aCA9IEJyYXBpQXV0aC5mcm9tRGF0YShkYXRhKTsgb2JzZXJ2ZXIubmV4dCgpIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge2NvbnNvbGUuZXJyb3IoZXJyb3IpOyBvYnNlcnZlci5lcnJvcihlcnJvcil9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG59XG5cbmNsYXNzIEJyYXBpQXV0aCB7XG5cbiAgcHVibGljIHVzZXJuYW1lOiBzdHJpbmc7IFxuICBwdWJsaWMgcm9sZXM6IHN0cmluZ1tdOyBcbiAgcHVibGljIHRva2VuX3R5cGU6IHN0cmluZztcbiAgcHVibGljIGFjY2Vzc190b2tlbjogc3RyaW5nO1xuICBwdWJsaWMgZXhwaXJlc19pbjogbnVtYmVyO1xuICBwdWJsaWMgcmVmcmVzaF90b2tlbjogc3RyaW5nO1xuICBwdWJsaWMgZXhwaXJlSW46IG51bWJlcjtcblxuICBwdWJsaWMgc3RhdGljIGZyb21EYXRhKGRhdGE6IGFueSk6IEJyYXBpQXV0aCB7XG4gICAgbGV0IG9iamVjdCA9ICBkYXRhIGFzIEJyYXBpQXV0aDtcbiAgICBvYmplY3QuZXhwaXJlSW4gPSBvYmplY3QuZXhwaXJlSW4gKiAxMDAwICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIHB1YmxpYyBpc0V4cGlyZWQoKTogYm9vbGVhbntcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCkgPj0gKHRoaXMuZXhwaXJlSW4gLSAzMDAwMCk7XG4gIH1cblxufSJdfQ==