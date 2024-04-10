import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

// Routes
import { routes } from './app.routes';

// Services
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
		provideClientHydration(),
		provideHttpClient(withFetch()),
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
