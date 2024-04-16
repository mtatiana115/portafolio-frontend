import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section4Component } from './section-4.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('Section4Component', () => {
	let component: Section4Component;
	let fixture: ComponentFixture<Section4Component>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Section4Component, ReactiveFormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(Section4Component);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
