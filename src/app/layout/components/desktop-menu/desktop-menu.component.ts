import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

// Interfaces
import { Menus } from '@interfaces/menus.interfaces';

// Services
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-desktop-menu',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './desktop-menu.component.html',
	styleUrl: './desktop-menu.component.scss',
})
export class DesktopMenuComponent implements OnInit, OnDestroy {
	private _translateService = inject(TranslateService);
	private _platformId = inject(PLATFORM_ID);

	menu: Menus[] = [];
	subscriptions: Subscription[] = [];

	ngOnInit(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.getTranslations();
		}
	}
	ngOnDestroy(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.subscriptions.forEach((subscription) => {
				subscription.unsubscribe();
			});
		}
	}

	getTranslations() {
		this.subscriptions.push(
			this._translateService
				.stream('LAYOUT.menu')
				.subscribe({ next: (response) => (this.menu = response) })
		);
	}
}
