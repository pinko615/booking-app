import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
    selectCartState,
    (state: CartState) => state.cartItems
);

export const selectTotalItems = createSelector(
    selectCartState,
    (state: CartState) => state.cartItems.length
);
