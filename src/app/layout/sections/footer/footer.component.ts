import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Services
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [DatePipe, RouterLink, TranslateModule],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
})
export class FooterComponent {
	currentDate: Date = new Date();
}
