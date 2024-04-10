import { Component } from '@angular/core';

// Services
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from 'src/app/shared/ui/molecules/button/button.component';

@Component({
	selector: 'app-section-1',
	standalone: true,
	imports: [TranslateModule, ButtonComponent],
	templateUrl: './section-1.component.html',
	styleUrl: './section-1.component.scss',
})
export class Section1Component {}
