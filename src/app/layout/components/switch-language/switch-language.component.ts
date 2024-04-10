import { NgClass, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-switch-language',
	standalone: true,
	imports: [NgClass],
	templateUrl: './switch-language.component.html',
	styleUrl: './switch-language.component.scss',
})
export class SwitchLanguageComponent implements OnInit, OnDestroy {
	private _translateService = inject(TranslateService);
	private _platformId = inject(PLATFORM_ID);

	languages: any[] = [];
	choosenLanguage!: any;
	isOpen: boolean = false;
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
				.stream('languages')
				.subscribe({ next: (response) => (this.languages = response) })
		);

		this.switchLanguage('es');
	}

	switchLanguage(keyword: string) {
		this.choosenLanguage = this.languages.find((option) => {
			return option.keyword === keyword;
		});

		this._translateService.use(keyword);
	}

	toggleOptions() {
		this.isOpen = !this.isOpen;
	}
}
