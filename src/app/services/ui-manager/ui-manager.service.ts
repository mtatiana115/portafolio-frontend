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
	private _windowSize$ = new BehaviorSubject<number>(0);
	private _onMobileMenu$ = new BehaviorSubject<boolean>(false);
	private _onChangeLanguages$ = new BehaviorSubject<boolean>(false);

	get scrollNumber$() {
		return this._scrollNumber$.asObservable();
	}
	get windowSize$() {
		return this._windowSize$.asObservable();
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
			this.listenToWidth();
		}
	}

	onNavigationChange() {
		this._router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this._viewportScroller.setOffset([0, 100]);
			}
		});
	}

	getScrollPosition() {
		fromEvent(this._document, 'scroll').subscribe(() => {
			this._scrollNumber$.next(this._document.documentElement.scrollTop);
		});
	}

	listenToWidth() {
		this._windowSize$.next(this._document.documentElement.clientWidth);
		fromEvent(window, 'resize').subscribe(() => {
			this._windowSize$.next(this._document.documentElement.clientWidth);
		});
	}

	toggleMobileMenu() {
		this._onMobileMenu$.next(!this._onMobileMenu$.value);
	}
}
