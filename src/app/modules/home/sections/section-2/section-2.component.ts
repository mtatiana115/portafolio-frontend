import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { TranslateService } from '@ngx-translate/core';

// Components
import { ProjectCardComponent } from '@shared/ui/organisms/project-card/project-card.component';

@Component({
	selector: 'app-section-2',
	standalone: true,
	imports: [ProjectCardComponent],
	templateUrl: './section-2.component.html',
	styleUrl: './section-2.component.scss',
})
export class Section2Component implements OnInit, OnDestroy {
	private _translateService = inject(TranslateService);
	private _platformId = inject(PLATFORM_ID);

	projects: any[] = [];
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
				.stream('HOMESECTION2.projects')
				.subscribe({ next: (response) => (this.projects = response) })
		);
	}
}
