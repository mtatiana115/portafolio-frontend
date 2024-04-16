import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// Services
import { TranslateModule } from '@ngx-translate/core';
import { EmailData, SendFormService } from '@services/send-form/send-form.service';

// Components
import { ButtonComponent } from '@shared/ui/molecules/button/button.component';

@Component({
	selector: 'app-section-4',
	standalone: true,
	imports: [ReactiveFormsModule, TranslateModule, ButtonComponent],
	templateUrl: './section-4.component.html',
	styleUrl: './section-4.component.scss',
})
export class Section4Component implements OnInit, OnDestroy {
	private _platformId = inject(PLATFORM_ID);
	private _formBuilder = inject(FormBuilder);
	private _sendFormService = inject(SendFormService);

	form!: FormGroup;
	subscriptions: Subscription[] = [];

	ngOnInit(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.buildForm();
			this.listenToEmailResponse();
		}
	}
	ngOnDestroy(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.subscriptions.forEach((subscription) => {
				subscription.unsubscribe();
			});
		}
	}

	get formName() {
		return this.form.get('name');
	}

	get formEmail() {
		return this.form.get('email');
	}

	get formSubject() {
		return this.form.get('subject');
	}

	get formMessage() {
		return this.form.get('message');
	}

	buildForm() {
		this.form = this._formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
			email: ['', [Validators.required, Validators.email]],
			subject: ['', [Validators.required]],
			message: ['', [Validators.required]],
			privacyPolicy: [true, [Validators.requiredTrue]],
		});
	}

	onSubmit() {
		if (this.form.valid) {
			const emailData: EmailData = {
				name: this.formName?.value,
				email: this.formEmail?.value,
				subject: this.formSubject?.value,
				message: this.formMessage?.value,
			};
			this._sendFormService.sendEmail(emailData);
		} else {
			this.form.markAllAsTouched();
		}
	}

	listenToEmailResponse() {
		this.subscriptions.push(
			this._sendFormService.emailResponse$.subscribe({
				next: (response: string) => {
					if (response === 'success') {
						alert('Message has been sent successfully');
						this.form.reset();
					} else if (response === 'error') {
						alert('An error has ocurred');
					}
				},
			})
		);
	}
}
