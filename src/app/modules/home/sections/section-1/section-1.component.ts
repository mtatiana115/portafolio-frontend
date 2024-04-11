import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ButtonComponent } from 'src/app/shared/ui/molecules/button/button.component';

@Component({
	selector: 'app-section-1',
	standalone: true,
	imports: [TranslateModule, ButtonComponent],
	templateUrl: './section-1.component.html',
	styleUrl: './section-1.component.scss',
})
export class Section1Component implements OnInit, OnDestroy {
	private _router = inject(Router);
	private _translateService = inject(TranslateService);
	private _platformId = inject(PLATFORM_ID);

	socialMedia: any[] = [];
	section2fragmentLink!: string;
	subscriptions: Subscription[] = [];

	ngOnInit(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.getTranslations('socialMedia', (response) => {
				this.socialMedia = response;
			});
			this.getTranslations('HOMESECTION2.sectionUrl', (response) => {
				this.section2fragmentLink = response;
			});
		}
	}
	ngOnDestroy(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.subscriptions.forEach((subscription) => {
				subscription.unsubscribe();
			});
		}
	}

	getTranslations(path: string, callback: (response: any) => void) {
		this.subscriptions.push(
			this._translateService.stream(path).subscribe({ next: (response) => callback(response) })
		);
	}

	goTo(path: string, fragment: string) {
		this._router.navigate([path], { fragment });
	}
}
