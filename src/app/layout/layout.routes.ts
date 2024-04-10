import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		loadComponent: () => import('@home/page/home-page.component').then((c) => c.HomePageComponent),
	},
	{
		path: 'privacy-policy',
		loadComponent: () =>
			import('@privacy-policy/page/privacy-policy-page.component').then(
				(c) => c.PrivacyPolicyPageComponent
			),
	},
];
