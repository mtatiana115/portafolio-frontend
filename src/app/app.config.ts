import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ModuleHttpLoaderFactory } from '@utils/i18n';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			routes,
			withViewTransitions(),
			withInMemoryScrolling({ anchorScrolling: 'enabled' })
		),
		provideAnimations(),
		provideHttpClient(withFetch()),
		provideClientHydration(),
		importProvidersFrom(
			TranslateModule.forRoot({
				loader: {
					provide: TranslateLoader,
					useFactory: ModuleHttpLoaderFactory,
					deps: [HttpClient],
				},
			})
		),
	],
};
