import { Routes } from '@angular/router';

// Routes
import { layoutRoutes } from '@layout/layout.routes';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('@layout/page/layout-page.component').then((c) => c.LayoutPageComponent),
		children: layoutRoutes,
	},
];
