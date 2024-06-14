export interface EventData {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    place: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface SingleEvent {
    id: string;
    title: string;
    subtitle: string;
    image: string;
}

export interface SessionEvent {
    date: string;
    availability: number;
    counter: number;
}

export interface SingleEventData {
    event: SingleEvent;
    sessions: SessionEvent[];
}

export interface CartItem {
    artist: string;
    session: {
        date: string;
        availability: number;
        counter: number;
    };
    quantity: number;
}

export interface CartState {
    cartItems: CartItem[];
}

export const initialState: CartState = {
    cartItems: []
};