import { Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CartItem, SessionEvent } from '../../interfaces/event.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../store/cart.selectors';
import { removeFromCart } from '../../store/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>;
  constructor(private store: Store) {
    this.cartItems$ = this.store.select(selectCartItems);
  }

  get uniqueArtists(): string[] {
    let artists: string[] = [];
    this.cartItems$.subscribe(items => {
      artists = Array.from(new Set(items.map(item => item.artist)));
    });
    return artists;
  }

  getSessionsByArtist(artist: string): SessionEvent[] {
    let sessions: SessionEvent[] = [];
    this.cartItems$.subscribe(items => {
      sessions = items.filter(item => item.artist === artist).map(item => item.session);
    });
    return sessions;
  }

  removeFromCart(session: SessionEvent): void {
    const updatedSession = { ...session, counter: session.counter - 1, availability: session.availability + 1 };
    this.store.dispatch(removeFromCart({ session: updatedSession }));
  }
}
