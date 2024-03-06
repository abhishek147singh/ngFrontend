import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appEffects, appReducer } from './store';
import { CustomSerializer } from './store/router/custom-serializer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideStore(appReducer), provideEffects(appEffects), provideRouterStore({ serializer:  CustomSerializer}), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
