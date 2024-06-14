import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { CartItem, SessionEvent, SingleEventData } from '../../interfaces/event.interface';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../store/cart.selectors';
import { addToCart, removeFromCart } from '../../store/cart.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sessions-list-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './sessions-list-card.component.html',
  styleUrl: './sessions-list-card.component.scss'
})
export class SessionsListCardComponent implements OnInit {
  event: SingleEventData = {} as SingleEventData;
  id: string | null = '';
  eventNotFound: boolean = false;
  cartItems: CartItem[] = [];
  originalSessions: SessionEvent[] = [];
  cartSubscription: Subscription = new Subscription();
  cartItems$: Observable<CartItem[]>;

  constructor(
    private route: ActivatedRoute,
    public eventsService: EventsService,
    private store: Store
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartSubscription = this.cartItems$.subscribe(res => {
      this.cartItems = res;
      this.updateSessionAvailability();
    });
  }

  ngOnInit(): void {
    this.getEventId();
    this.getEventInfo();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  getEventId(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  getEventInfo(): void {
    this.eventsService.getEventInfo(this.id).subscribe({
      next: (res: SingleEventData) => {
        this.event = res;
        this.originalSessions = res.sessions.map(session => ({ ...session }));
        this.event.sessions = this.event.sessions.map(session => ({ ...session, counter: 0 }));
        this.updateSessionAvailability();
      },
      error: () => {
        this.eventNotFound = true;
      }
    });
  }

  updateSessionAvailability(): void {
    if (!this.event.sessions) return;
    this.event.sessions = this.originalSessions.map(session => ({ ...session, counter: 0 }));
    this.cartItems.forEach(cartItem => {
      const session = this.event.sessions.find(session => session.date === cartItem.session.date);
      if (session) {
        session.counter = cartItem.quantity;
        session.availability = Number(session.availability) - cartItem.quantity;
      }
    });

    this.event.sessions.sort((a, b) => parseInt(a.date) - parseInt(b.date));
  }

  addToCart(session: SessionEvent): void {
    if (session.availability > 0) {
      const updatedSession = { ...session, availability: session.availability - 1, counter: session.counter + 1 };
      this.store.dispatch(addToCart({ artist: this.event.event.title, id: Number(this.event.event.id), session: updatedSession, quantity: updatedSession.counter }));
    }
  }

  removeFromCart(session: SessionEvent): void {
    if (session.counter > 0) {
      const updatedSession = { ...session, availability: session.availability + 1, counter: session.counter - 1 };
      this.store.dispatch(removeFromCart({ session: updatedSession }));
    }
  }
}
