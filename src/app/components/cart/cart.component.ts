import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DatePipe } from '@angular/common';
import { SessionEvent } from '../../interfaces/event.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(public cartService: CartService) { }

  get uniqueArtists(): string[] {
    return Array.from(new Set(this.cartService.cartItems.map(item => item.artist)));
  }

  getSessionsByArtist(artist: string): SessionEvent[] {
    return this.cartService.cartItems.filter(item => item.artist === artist).map(item => item.session);
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
