import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// Services
import { TranslateModule } from '@ngx-translate/core';
import { UiManagerService } from '@services/ui-manager/ui-manager.service';

// Components
import { DesktopMenuComponent } from '@layout/components/desktop-menu/desktop-menu.component';
import { SwitchLanguageComponent } from '@layout/components/switch-language/switch-language.component';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, TranslateModule, DesktopMenuComponent, SwitchLanguageComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	private _uiManagerService = inject(UiManagerService);

	toggleMenu() {
		this._uiManagerService.toggleMobileMenu();
	}
}
