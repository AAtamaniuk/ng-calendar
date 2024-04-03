import { Component } from '@angular/core';
import { DateTime, Info } from 'luxon';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  weekdays = Info.weekdays;
  now = DateTime.now().setLocale('ua');

  onClick() {
    console.log('Clic');
  }
}
