import { Component, Input } from '@angular/core';
import { EventData } from '../../interfaces/event.interface';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() event: EventData = {} as EventData;

  constructor(private router: Router) { }

  goToEvent(id: string): void {
    this.router.navigate([`/event/${id}`])
  }
}
