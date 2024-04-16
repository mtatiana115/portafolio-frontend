import { Injectable } from '@angular/core';
import { init, send } from '@emailjs/browser';
import { environment } from '@environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface EmailData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

@Injectable({
	providedIn: 'root',
})
export class SendFormService {
	private _emailResponse$ = new BehaviorSubject<string>('');

	get emailResponse$() {
		return this._emailResponse$.asObservable();
	}

	async sendEmail(data: EmailData) {
		init(environment.EMAIL_JS_KEY);
		try {
			await send(environment.EMAIL_JS_SERVICE, environment.EMAIL_JS_TEMPLATE, data as any);
			this._emailResponse$.next('success');
		} catch (error) {
			this._emailResponse$.next('error');
		}
	}
}
