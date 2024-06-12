import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventsService } from '../../services/events.service';
import { EventData } from '../../interfaces/event.interface';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events: EventData[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventsService.getEvents().subscribe({
      next: (res: EventData[]) => {
        this.events = res.sort((a, b) => parseInt(a.endDate) - parseInt(b.endDate));
      }
    })
  }
}
