import { Injectable } from '@angular/core';
import { CartItem, SessionEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  constructor() { }

  addToCart(artist: string, session: any, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.session.date === session.date);
    if (itemIndex !== -1) {
      this.cartItems[itemIndex].quantity += quantity;
    } else {
      this.cartItems.push({ artist, session, quantity });
    }
  }

  removeFromCart(session: SessionEvent): void {
    const itemIndex = this.cartItems.findIndex(item => item.session.date === session.date);
    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
    }
  }

  getCartItems() {
    return this.cartItems;
  }


}
