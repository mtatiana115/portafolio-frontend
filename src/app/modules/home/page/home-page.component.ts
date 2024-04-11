import { Component } from '@angular/core';

//* Services
import { TranslateModule } from '@ngx-translate/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';

// Components
import { Section1Component } from '@home/sections/section-1/section-1.component';
import { Section2Component } from '@home/sections/section-2/section-2.component';
import { Section3Component } from '@home/sections/section-3/section-3.component';
import { Section4Component } from '@home/sections/section-4/section-4.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [
		TranslateModule,
		NgxScrollAnimationsModule,
		Section1Component,
		Section2Component,
		Section3Component,
		Section4Component,
	],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
