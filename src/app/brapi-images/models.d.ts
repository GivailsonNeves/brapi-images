import { InjectionToken } from '@angular/core';
export interface _BrapiConfig {
    pathApi: string;
    userName: string;
    password: string;
    proposito: string;
    defaultSize: number;
}
export declare const BrapiConfig: InjectionToken<_BrapiConfig>;
