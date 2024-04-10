import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	private _translateService = inject(TranslateService);
	private _platformId = inject(PLATFORM_ID);

	title = 'portafolio-frontend';

	ngOnInit(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.translationsConfig();
		}
	}
	translationsConfig() {
		const supportedLanguages = ['es', 'en'];
		const savedLanguage = localStorage.getItem('language');
		const defaultLanguage = this._translateService.getBrowserLang() || '';

		this._translateService.addLangs(supportedLanguages);

		if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
			this._translateService.setDefaultLang(savedLanguage);
		} else if (!savedLanguage && supportedLanguages.includes(defaultLanguage)) {
			this._translateService.setDefaultLang(defaultLanguage);
			localStorage.setItem('language', defaultLanguage);
		} else {
			this._translateService.setDefaultLang('en');
			localStorage.setItem('language', 'en');
		}
	}
}
