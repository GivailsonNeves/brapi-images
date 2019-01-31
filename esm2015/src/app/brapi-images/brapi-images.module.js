/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImagePipe } from './product-image.pipe';
import { BrapiConfig } from './models';
import { HttpClientModule } from '@angular/common/http';
export class BrapiImagesModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhcGktaW1hZ2VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2JyYXBpLWltYWdlcy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvYnJhcGktaW1hZ2VzL2JyYXBpLWltYWdlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVV4RCxNQUFNLE9BQU8saUJBQWlCOzs7OztJQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQW9CO1FBQ2pDLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxnQkFBZ0I7Z0JBQ2hCO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDOzs7WUFwQkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUNoQyxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO2lCQUNqQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQcm9kdWN0SW1hZ2VQaXBlIH0gZnJvbSAnLi9wcm9kdWN0LWltYWdlLnBpcGUnO1xuaW1wb3J0IHsgX0JyYXBpQ29uZmlnLCBCcmFwaUNvbmZpZyB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1Byb2R1Y3RJbWFnZVBpcGVdLFxuICBleHBvcnRzOiBbUHJvZHVjdEltYWdlUGlwZV0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJyYXBpSW1hZ2VzTW9kdWxlIHsgXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogX0JyYXBpQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyc3tcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJyYXBpSW1hZ2VzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFByb2R1Y3RJbWFnZVBpcGUsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBCcmFwaUNvbmZpZyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==