/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, Inject } from '@angular/core';
import { BrapiConfig } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export class ProductImagePipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYnJhcGktaW1hZ2VzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9icmFwaS1pbWFnZXMvcHJvZHVjdC1pbWFnZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBZ0IsTUFBTSxVQUFVLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLbEMsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFJM0IsWUFDK0IsTUFBb0IsRUFDekMsS0FBaUI7UUFESSxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQVk7SUFDekIsQ0FBQzs7Ozs7O0lBQ0gsU0FBUyxDQUFDLEtBQVUsRUFBRSxJQUFVO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O2dCQUNqQyxXQUFXLEdBQVcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQztZQUNqRSxJQUFJLFdBQVcsRUFBRTtnQkFDZixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEI7aUJBQU07O29CQUNELGFBQWEsR0FBcUIsSUFBSTtnQkFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUk7b0JBQ3hCLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7cUJBQzlCLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDeEMsYUFBYSxHQUFHLElBQUksQ0FB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QXlCOztBQXFHN0IsTUFBTSxTQUFTOzs7OztJQVVOLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBUzs7WUFDMUIsTUFBTSxHQUFJLG1CQUFBLElBQUksRUFBYTtRQUMvQixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVNLFNBQVM7UUFDZCxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FFRjs7O0lBbEJDLDZCQUF3Qjs7SUFDeEIsMEJBQXVCOztJQUN2QiwrQkFBMEI7O0lBQzFCLGlDQUE0Qjs7SUFDNUIsK0JBQTBCOztJQUMxQixrQ0FBNkI7O0lBQzdCLDZCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJhcGlDb25maWcsIF9CcmFwaUNvbmZpZyB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3Byb2R1Y3RJbWFnZSdcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdEltYWdlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHByaXZhdGUgc3RhdGljIGF1dGg6IEJyYXBpQXV0aCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChCcmFwaUNvbmZpZykgcHJpdmF0ZSBjb25maWc6IF9CcmFwaUNvbmZpZyxcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50XG4gICl7fVxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc29sZS5sb2codmFsdWUsIGFyZ3MpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBzdG9yYWdlUGF0aDogc3RyaW5nID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGFyZ3MrdmFsdWUpO1xuICAgICAgaWYgKHN0b3JhZ2VQYXRoKSB7XG4gICAgICAgIHJlc29sdmUoc3RvcmFnZVBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IF9yZXF1ZXN0VG9rZW46IE9ic2VydmFibGU8dm9pZD4gPSBudWxsO1xuICAgICAgICBpZiAoIVByb2R1Y3RJbWFnZVBpcGUuYXV0aClcbiAgICAgICAgICBfcmVxdWVzdFRva2VuID0gdGhpcy5fbG9nSW5BcGkoKTtcbiAgICAgICAgZWxzZSBpZiAoUHJvZHVjdEltYWdlUGlwZS5hdXRoLmlzRXhwaXJlZCgpKVxuICAgICAgICAgIF9yZXF1ZXN0VG9rZW4gPSB0aGlzLl9sb2dpblJlZnJlc2goKTtcblxuICAgICAgICBpZiAoX3JlcXVlc3RUb2tlbikge1xuICAgICAgICAgIF9yZXF1ZXN0VG9rZW4uc3Vic2NyaWJlKFxuICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RJbWFnZSh2YWx1ZSwgYXJncylcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgcmVzID0+IHJlc29sdmUocmVzKSxcbiAgICAgICAgICAgICAgICAgIGVycm9yID0+IHJlc29sdmUoJycpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVxdWVzdEltYWdlKHZhbHVlLCBhcmdzKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBkYXRhID0+IHJlc29sdmUoZGF0YSksXG4gICAgICAgICAgICBlcnJvciA9PiByZXNvbHZlKCcnKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZXF1ZXN0SW1hZ2UocGFyYW1uOiBzdHJpbmcsIHR5cGU6IHN0cmluZyk6T2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoXG4gICAgICBvYnNlcnZlciA9PiB7XG4gICAgICAgIGxldCB0eXBlID0gJ3Blc3F1aXNhclBvclNrdSc7XG4gICAgICAgIGxldCBfZGF0YSA6IGFueSA9IHtcbiAgICAgICAgICBtZWRpZGEgOiB0aGlzLmNvbmZpZy5kZWZhdWx0U2l6ZSwgXG4gICAgICAgICAgcHJvcG9zaXRvIDogdGhpcy5jb25maWcucHJvcG9zaXRvXG4gICAgICAgIH1cbiAgICAgICAgaWYodHlwZSA9PSAnZWFuJykgeyBcbiAgICAgICAgICB0eXBlID0gJ3Blc3F1aXNhclBvckVhbic7IFxuICAgICAgICAgIF9kYXRhLmVhbnMgPSBbcGFyYW1uXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfZGF0YS5za3VzID0gW3BhcmFtbl07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9odHRwLnBvc3QoYCR7dGhpcy5jb25maWcucGF0aEFwaX1hcGkvJHt0eXBlfWAsIF9kYXRhLHsgaGVhZGVycyA6IHtcbiAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogYCR7UHJvZHVjdEltYWdlUGlwZS5hdXRoLnRva2VuX3R5cGV9ICR7UHJvZHVjdEltYWdlUGlwZS5hdXRoLmFjY2Vzc190b2tlbn1gXG4gICAgICAgIH19KS5zdWJzY3JpYmUoXG4gICAgICAgICAgKGRhdGE6IGFueSkgPT4geyBpZihkYXRhICYmIGRhdGEubGVuZ3RoKXsgXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odHlwZStwYXJhbW4sIGRhdGFbMF0udXJsKTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZGF0YVswXS51cmwpOyBcbiAgICAgICAgICB9IGVsc2Ugb2JzZXJ2ZXIubmV4dCgnJyk7IH0sXG4gICAgICAgICAgZXJyb3IgPT4gb2JzZXJ2ZXIubmV4dCgnJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9sb2dJbkFwaSgpOk9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShcbiAgICAgIG9ic2VydmVyID0+IHtcbiAgICAgICAgdGhpcy5faHR0cC5wb3N0KGAke3RoaXMuY29uZmlnLnBhdGhBcGl9YXBpL2xvZ2luYCwgXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMuY29uZmlnLnVzZXJOYW1lLCBcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLmNvbmZpZy5wYXNzd29yZFxuICAgICAgICAgIH1cbiAgICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgICAgZGF0YSA9PiB7IFByb2R1Y3RJbWFnZVBpcGUuYXV0aCA9IEJyYXBpQXV0aC5mcm9tRGF0YShkYXRhKTsgb2JzZXJ2ZXIubmV4dCgpIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge2NvbnNvbGUuZXJyb3IoZXJyb3IpOyBvYnNlcnZlci5lcnJvcihlcnJvcil9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvZ2luUmVmcmVzaCgpOk9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShcbiAgICAgIG9ic2VydmVyID0+IHtcbiAgICAgICAgdGhpcy5faHR0cC5wb3N0KGAke3RoaXMuY29uZmlnLnBhdGhBcGl9L29hdXRoL3JlZnJlc2hfdG9rZW5gLCBcbiAgICAgICAgICB7XG4gICAgICAgICAgICBncmFudF90eXBlOiBcInJlZnJlc2hfdG9rZW5cIixcbiAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IFByb2R1Y3RJbWFnZVBpcGUuYXV0aC5yZWZyZXNoX3Rva2VuXG4gICAgICAgICAgfVxuICAgICAgICApLnN1YnNjcmliZShcbiAgICAgICAgICBkYXRhID0+IHsgUHJvZHVjdEltYWdlUGlwZS5hdXRoID0gQnJhcGlBdXRoLmZyb21EYXRhKGRhdGEpOyBvYnNlcnZlci5uZXh0KCkgfSxcbiAgICAgICAgICBlcnJvciA9PiB7Y29uc29sZS5lcnJvcihlcnJvcik7IG9ic2VydmVyLmVycm9yKGVycm9yKX1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbn1cblxuY2xhc3MgQnJhcGlBdXRoIHtcblxuICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZzsgXG4gIHB1YmxpYyByb2xlczogc3RyaW5nW107IFxuICBwdWJsaWMgdG9rZW5fdHlwZTogc3RyaW5nO1xuICBwdWJsaWMgYWNjZXNzX3Rva2VuOiBzdHJpbmc7XG4gIHB1YmxpYyBleHBpcmVzX2luOiBudW1iZXI7XG4gIHB1YmxpYyByZWZyZXNoX3Rva2VuOiBzdHJpbmc7XG4gIHB1YmxpYyBleHBpcmVJbjogbnVtYmVyO1xuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbURhdGEoZGF0YTogYW55KTogQnJhcGlBdXRoIHtcbiAgICBsZXQgb2JqZWN0ID0gIGRhdGEgYXMgQnJhcGlBdXRoO1xuICAgIG9iamVjdC5leHBpcmVJbiA9IG9iamVjdC5leHBpcmVJbiAqIDEwMDAgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgcHVibGljIGlzRXhwaXJlZCgpOiBib29sZWFue1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSA+PSAodGhpcy5leHBpcmVJbiAtIDMwMDAwKTtcbiAgfVxuXG59Il19