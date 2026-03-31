import { create } from 'zustand';

// Estructura básica de una cita (Booking) para uso frontend
export interface Booking {
	id: string;
	petId: string;
	sitterId: string;
	date: string;
	status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

interface BookingState {
	bookings: Booking[];
	addBooking: (booking: Booking) => void;
}

// Store básico con datos de ejemplo para que no esté en cero
export const useBookingStore = create<BookingState>((set) => ({
	bookings: [
		{ id: '1', petId: 'p1', sitterId: 's1', date: '2026-04-01', status: 'CONFIRMED' },
		{ id: '2', petId: 'p2', sitterId: 's2', date: '2026-04-05', status: 'PENDING' }
	],
	addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] }))
}));
