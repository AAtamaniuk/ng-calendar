import { Component, OnInit } from '@angular/core';
import { DateTime, Info } from 'luxon';
import { NgIconComponent, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { ionChevronBack, ionChevronForward } from '@ng-icons/ionicons';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [
    provideIcons({ ionChevronBack, ionChevronForward }),
    provideNgIconsConfig({
      size: '1.5em',
      color: 'black',
    }),
  ],
})
export class CalendarComponent implements OnInit {
  now = DateTime.now().setLocale('ua');
  weekdays = Info.weekdays('short', {locale: 'ua'});
  datePicker: string[] = [];

  selectedDate: DateTime = this.now;
  selectedMonth: DateTime = this.now;

  formattedMonth: string = this.selectedMonth.toLocaleString({month: 'long', year: 'numeric'});
  formattedDate: string = this.selectedDate.toLocaleString(DateTime.DATE_SHORT)

  ngOnInit(): void {
    this.generateDayPicker();
  }

  generateDayPicker() {
    const offsetLength = this.selectedMonth.startOf('month').localWeekday - 1;
    const daysInMonth = this.selectedMonth.daysInMonth;

    const offset = this.createOffset(offsetLength);
    // @ts-ignore
    const daysArray = this.createDaysArray(daysInMonth);
    
    const ww = Array.from({length: 31}, (_, index) => index + 1).map(item => item.toString());
    // @ts-ignore
    this.datePicker = [...this.weekdays, ...offset,  ...daysArray]    
  }

  nextMonth() {
    this.selectedMonth = this.selectedMonth.plus({month: 1})
    this.formattedMonth = this.formatMonth(this.selectedMonth);
    this.generateDayPicker();
  }

  prevMonth () {
    this.selectedMonth = this.selectedMonth.minus({month: 1})
    this.formattedMonth = this.formatMonth(this.selectedMonth);
    this.generateDayPicker();
  }

  private formatMonth(month: DateTime):string {
    return month.toLocaleString({month: 'long', year: 'numeric'}) 
  } 

  private formatDate(date: DateTime):string {
    return date.toLocaleString(DateTime.DATE_SHORT)
  }

  private createOffset(length: number):string[] {
    return Array.from({ length }, () => '');
  }

  private createDaysArray(daysInMonth: number) {
    return Array.from({length: daysInMonth}, (_, index) => index + 1);
  }

  selectDate(item:string) {
    const dayNumber = parseInt(item);
    if (Number.isNaN(dayNumber)) return;
    const day = dayNumber;
    const month = this.selectedMonth.month;
    const year = this.selectedMonth.year;
    const newDate = DateTime.fromObject({day, month, year}) 
    this.selectedDate = newDate;
    this.formattedDate = this.formatDate(this.selectedDate)
  }
}
