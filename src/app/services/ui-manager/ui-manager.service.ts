import { DOCUMENT, ViewportScroller, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UiManagerService {
	private _router = inject(Router);
	private _viewportScroller = inject(ViewportScroller);
	private _document = inject(DOCUMENT);
	private _platformId = inject(PLATFORM_ID);

	private _scrollNumber$ = new BehaviorSubject<number>(0);
	private _onMobileMenu$ = new BehaviorSubject<boolean>(false);
	private _onChangeLanguages$ = new BehaviorSubject<boolean>(false);

	get scrollNumber$() {
		return this._scrollNumber$.asObservable();
	}
	get onMobileMenu$() {
		return this._onMobileMenu$.asObservable();
	}
	get onChangeLanguages$() {
		return this._onChangeLanguages$.asObservable();
	}

	constructor() {
		if (isPlatformBrowser(this._platformId)) {
			this.onNavigationChange();
			this.getScrollPosition();
		}
	}

	onNavigationChange() {
		this._router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this._viewportScroller.setOffset([0, 96]);
			}
		});
	}

	getScrollPosition() {
		fromEvent(this._document, 'scroll').subscribe(() => {
			this._scrollNumber$.next(this._document.documentElement.scrollTop);
		});
	}

	toggleMobileMenu() {
		this._onMobileMenu$.next(!this._onMobileMenu$.value);
	}
}
