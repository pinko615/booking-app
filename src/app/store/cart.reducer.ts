import { Action, createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart } from './cart.actions';
import { CartItem } from '../interfaces/event.interface';

export interface CartState {
    cartItems: CartItem[];
}

export const initialState: CartState = {
    cartItems: []
};

const _cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { artist, session, id }) => {
        const existingItem = state.cartItems.find(item => item.session.date === session.date);
        if (existingItem) {
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.session.date === session.date
                        ? { ...item, session, quantity: session.counter }
                        : item
                )
            };
        } else {
            return {
                ...state,
                cartItems: [...state.cartItems, { artist, id, session, quantity: session.counter }]
            };
        }
    }),
    on(removeFromCart, (state, { session }) => {
        return {
            ...state,
            cartItems: state.cartItems.map(item =>
                item.session.date === session.date
                    ? {
                        ...item,
                        session: {
                            ...item.session,
                            availability: session.availability,
                            counter: session.counter
                        },
                        quantity: session.counter
                    }
                    : item
            ).filter(item => item.quantity > 0)
        };
    }),
);

export function cartReducer(state: CartState | undefined, action: Action): CartState {
    return _cartReducer(state, action);
}
