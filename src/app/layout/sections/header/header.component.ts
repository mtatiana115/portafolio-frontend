import { Component } from '@angular/core';

// Components
import { DesktopMenuComponent } from '@layout/components/desktop-menu/desktop-menu.component';
import { SwitchLanguageComponent } from '@layout/components/switch-language/switch-language.component';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [DesktopMenuComponent, SwitchLanguageComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {}
