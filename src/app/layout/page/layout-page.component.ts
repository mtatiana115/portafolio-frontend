import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Components
import { HeaderComponent } from '@layout/sections/header/header.component';
import { FooterComponent } from '@layout/sections/footer/footer.component';

@Component({
	selector: 'app-layout-page',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, FooterComponent],
	templateUrl: './layout-page.component.html',
	styleUrl: './layout-page.component.scss',
})
export class LayoutPageComponent {}
