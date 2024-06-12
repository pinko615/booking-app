import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { SessionEvent, SingleEventData } from '../../interfaces/event.interface';
import { DatePipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

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

  constructor(private route: ActivatedRoute, public eventsService: EventsService, public cartService: CartService) { }

  ngOnInit(): void {
    this.getEventId();
    this.getEventInfo();
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
        this.event.sessions = this.event.sessions.map(session => ({ ...session, counter: 0 }));

        if (this.cartService.cartItems.length) {
          this.event.sessions.forEach(session => {
            const cartItem = this.cartService.cartItems.find(item => item.session.date === session.date);
            if (cartItem) {
              session.counter = cartItem.quantity;
              if (typeof session.availability === 'string') {
                session.availability = parseInt(session.availability as string) - cartItem.quantity;
              } else {
                session.availability -= cartItem.quantity as number;
              }
            }
          });
        }

        this.event.sessions = this.event.sessions.sort((a, b) => parseInt(a.date) - parseInt(b.date));
      },
      error: () => {
        this.eventNotFound = true;
      }
    })
  }

  addToCart(session: SessionEvent): void {
    const availability = typeof session.availability === 'string' ? parseInt(session.availability, 10) : session.availability;

    if (availability > 0) {
      this.cartService.addToCart(this.event.event.title, session, 1);
      session.availability = availability - 1;
      session.counter++;
    }
  }

  removeFromCart(session: SessionEvent): void {
    const cartItemIndex = this.cartService.getCartItems().findIndex(item => item.session.date === session.date);
    if (cartItemIndex !== -1) {
      const cartItem = this.cartService.getCartItems()[cartItemIndex];
      const availability = typeof session.availability === 'string' ? parseInt(session.availability, 10) : session.availability;
      session.availability = availability + 1;

      if (cartItem.quantity > 1) {
        cartItem.quantity--;

        if (session.counter > 0) {
          session.counter--;
        }
      } else {
        this.cartService.removeFromCart(session);
        session.counter = 0;
      }
    }
  }





}
