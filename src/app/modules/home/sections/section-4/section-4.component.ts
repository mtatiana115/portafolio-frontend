import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// Services
import { TranslateModule } from '@ngx-translate/core';

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

	form!: FormGroup;
	subscriptions: Subscription[] = [];

	ngOnInit(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.buildForm();
		}
	}
	ngOnDestroy(): void {
		if (isPlatformBrowser(this._platformId)) {
			this.subscriptions.forEach((subscription) => {
				subscription.unsubscribe();
			});
		}
	}

	buildForm() {
		this.form = this._formBuilder.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required]],
			subject: ['', [Validators.required]],
			message: ['', [Validators.required]],
			privacyPolicy: [false, [Validators.requiredTrue]],
		});
	}

	onSubmit() {
		if (this.form.valid) {
			console.log(this.form.value);
		} else {
			this.form.markAllAsTouched();
			console.log(this.form.value);
		}
	}
}
