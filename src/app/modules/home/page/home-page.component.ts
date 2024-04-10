import { Component } from '@angular/core';

// Components
import { Section1Component } from '@home/sections/section-1/section-1.component';
import { Section2Component } from '@home/sections/section-2/section-2.component';
import { Section3Component } from '@home/sections/section-3/section-3.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [Section1Component, Section2Component, Section3Component],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
