import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventData, SingleEventData } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventData[]> {
    const jsonURL = 'events.json';
    return this.http.get<EventData[]>(jsonURL);
  }

  getEventInfo(id: string | null): Observable<SingleEventData> {
    const jsonURL = `event-info-${id}.json`;
    return this.http.get<SingleEventData>(jsonURL);
  }
}
