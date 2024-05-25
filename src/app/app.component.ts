import { Component } from '@angular/core';
import Modules from 'app/shared/modules';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [Modules],
})
export class AppComponent { }
