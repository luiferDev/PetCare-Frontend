// features/booking/components/BookingsOverview.tsx - VERSIÓN CORREGIDA

import { BookingsEmptyState } from '@/features/booking/components/states/BookingEmptyState';
import { BookingsErrorState } from '@/features/booking/components/states/BookingErrorState';
import { BookingsList } from './BookingList';
import { BookingsLoadingState } from '@/features/booking/components/states/BookingsLoadingState';
import { useBookingStore, type BookingState } from '@/store/BookingStore';
import type { BookingSummary } from '@/features/booking/types';

export function BookingsOverview() {
    // SEPARACIÓN CORRECTA: El estado y las acciones vienen de la store de Zustand.
	const isLoading = useBookingStore((state: BookingState) => state.isLoading)
	const error = useBookingStore((state: BookingState) => state.error)
	const bookings = useBookingStore((state: BookingState) => state.bookings) as unknown as BookingSummary[]
    const refreshBookings = useBookingStore((state: BookingState) => state.refreshBookings);

    // EL useEffect PARA CARGAR DATOS SE HA ELIMINADO DE AQUÍ.
    
    const handleRetry = () => {
        refreshBookings();
    };

    const renderContent = () => {
        if (isLoading && bookings.length === 0) {
            return <BookingsLoadingState />;
        }
        if (error) {
            return <BookingsErrorState error={error} onRetry={handleRetry} />;
        }
        if (bookings.length === 0) {
            return <BookingsEmptyState />;
        }
        return <BookingsList bookings={bookings} />;
    };

    return <div className="space-y-6">{renderContent()}</div>;
}
