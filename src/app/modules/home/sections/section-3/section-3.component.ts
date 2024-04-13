import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

// Services
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-section-3',
	standalone: true,
	imports: [TranslateModule],
	templateUrl: './section-3.component.html',
	styleUrl: './section-3.component.scss',
})
export class Section3Component implements OnInit, OnDestroy {
	private _translateService = inject(TranslateService);
	private _platformId = inject(PLATFORM_ID);

	articles: any[] = [];
	images: any[] = [];
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
			this._translateService.stream('HOMESECTION3').subscribe({
				next: (response) => {
					this.articles = response.articles;
					this.images = response.images;
				},
			})
		);
	}
}
