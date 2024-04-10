import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { NgClass, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { UiManagerService } from '@services/ui-manager/ui-manager.service';

// Components
import { HeaderComponent } from '@layout/sections/header/header.component';
import { FooterComponent } from '@layout/sections/footer/footer.component';

@Component({
	selector: 'app-layout-page',
	standalone: true,
	imports: [RouterOutlet, NgClass, HeaderComponent, FooterComponent],
	templateUrl: './layout-page.component.html',
	styleUrl: './layout-page.component.scss',
})
export class LayoutPageComponent implements OnInit, OnDestroy {
	private _uiManagerService = inject(UiManagerService);
	private _platformId = inject(PLATFORM_ID);

	onScrollDown!: boolean;
	onMobileMenu!: boolean;
	subscriptions: Subscription[] = [];

	ngOnInit(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.getScrollTop();
			this.getMobileMenu();
		}
	}
	ngOnDestroy(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.subscriptions.forEach((subscription) => subscription.unsubscribe());
		}
	}

	private getScrollTop() {
		this.subscriptions.push(
			this._uiManagerService.scrollNumber$.subscribe((value) => {
				if (value > 10) {
					this.onScrollDown = true;
				} else {
					this.onScrollDown = false;
				}
			})
		);
	}

	private getMobileMenu() {
		this.subscriptions.push(
			this._uiManagerService.onMobileMenu$.subscribe((value) => {
				this.onMobileMenu = value;
			})
		);
	}

	toggleOnMobileMenu() {
		this._uiManagerService.toggleMobileMenu();
	}
}
