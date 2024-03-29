import { Component } from '@angular/core';

// Components
import { DesktopMenuComponent } from '@layout/components/desktop-menu/desktop-menu.component';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [DesktopMenuComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {}
