import { createAction, props } from '@ngrx/store';
import { SessionEvent } from '../interfaces/event.interface';

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{ artist: string, id: number, session: SessionEvent, quantity: number }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove From Cart',
    props<{ session: SessionEvent }>()
);

