import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

// Services
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-privacy-policy-page',
	standalone: true,
	imports: [],
	templateUrl: './privacy-policy-page.component.html',
	styleUrl: './privacy-policy-page.component.scss',
})
export class PrivacyPolicyPageComponent implements OnInit, OnDestroy {
	private _document = inject(DOCUMENT);
	private _platformId = inject(PLATFORM_ID);
	private _translateService = inject(TranslateService);

	content: any = {};
	subscriptions: Subscription[] = [];

	ngOnInit(): void {
		if (isPlatformBrowser(this._platformId)) {
			this._document.documentElement.scrollTop = 0;
			this.getTranslations();
		}
	}

	ngOnDestroy(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.subscriptions.forEach((subscription) => subscription.unsubscribe());
		}
	}

	getTranslations() {
		this.subscriptions.push(
			this._translateService.stream('PRIVACYPOLICY.content').subscribe({
				next: (response) => {
					this.content = response;
				},
			})
		);
	}
}
