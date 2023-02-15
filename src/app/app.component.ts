import { Component } from '@angular/core';
import { CheckboxInputComponent } from 'src/components/checkbox.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CheckboxInputComponent],
})
export class AppComponent {
  title = 'base-15-app';
}
