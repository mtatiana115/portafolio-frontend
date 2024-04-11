import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

// Interfaces
import { Menus } from '@interfaces/menus.interfaces';

// Services
import { TranslateService } from '@ngx-translate/core';
import { UiManagerService } from '@services/ui-manager/ui-manager.service';

@Component({
	selector: 'app-mobile-menu',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './mobile-menu.component.html',
	styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent implements OnInit, OnDestroy {
	private _translateService = inject(TranslateService);
	private _platformId = inject(PLATFORM_ID);
	private _uiManagerService = inject(UiManagerService);

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
	toggleMenu() {
		this._uiManagerService.toggleMobileMenu();
	}
}
