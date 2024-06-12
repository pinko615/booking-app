import { Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { EventComponent } from './pages/event/event.component';

export const routes: Routes = [
    { path: '', component: EventsComponent },
    { path: 'event/:id', component: EventComponent },
];
