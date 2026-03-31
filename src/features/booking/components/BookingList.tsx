// features/booking/components/BookingsList.tsx

import { BookingCard } from './BookingCard';
import type { BookingSummary } from '@/features/booking/types';

interface BookingsListProps {
	bookings: BookingSummary[];
}

export function BookingsList({ bookings }: BookingsListProps) {
	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-6">
			{bookings.map((booking) => (
				<BookingCard key={booking.id} booking={booking} />
			))}
		</div>
	);
}
