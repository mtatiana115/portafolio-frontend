import { HttpClient } from '@angular/common/http';

//* Services
import {
	IModuleTranslationOptions,
	ModuleTranslateLoader,
} from '@larscom/ngx-translate-module-loader';

export function ModuleHttpLoaderFactory(http: HttpClient) {
	const baseTranslateUrl = './assets/i18n';

	const options: IModuleTranslationOptions = {
		version: Date.now(),
		translateError: (error, path) => {
			console.error('Ups! an error occurred loading languages: ', { error, path });
		},
		modules: [
			{ baseTranslateUrl },
			//#region --------------------------------- Layout ---------------------------------
			{
				baseTranslateUrl,
				moduleName: 'layout',
				pathTemplate: '{baseTranslateUrl}/layout/{language}',
			},
			//#endregion
			//#region --------------------------------- Layout Home ---------------------------------
			{
				baseTranslateUrl,
				moduleName: 'homeSection1',
				pathTemplate: '{baseTranslateUrl}/modules/home/section-1/{language}',
			},
			{
				baseTranslateUrl,
				moduleName: 'homeSection2',
				pathTemplate: '{baseTranslateUrl}/modules/home/section-2/{language}',
			},
			{
				baseTranslateUrl,
				moduleName: 'homeSection3',
				pathTemplate: '{baseTranslateUrl}/modules/home/section-3/{language}',
			},
			{
				baseTranslateUrl,
				moduleName: 'homeSection4',
				pathTemplate: '{baseTranslateUrl}/modules/home/section-4/{language}',
			},
			//#endregion
			//#region --------------------------------- Layout Privacy Policy ---------------------------------
			{
				baseTranslateUrl,
				moduleName: 'privacyPolicy',
				pathTemplate: '{baseTranslateUrl}/modules/privacy-policy/{language}',
			},
			//#endregion
		],
	};
	return new ModuleTranslateLoader(http, options);
}
