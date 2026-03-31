import { Outlet, useLocation } from 'react-router';
import { useMemo, useState } from 'react';

import { ClientSidebar } from '@/features/dashboard/components/DashboardSidebar';
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header/DashboardHeader';

const ROUTE_MAP: Record<string, string> = {
	'pets': 'pets',
	'find-sitters': 'findSitters',
	'bookings': 'appointments',
	'favorites': 'favorites',
	'notifications': 'notifications',
	'billing': 'billing',
	'profile': 'profile',
	'settings': 'settings'
};

export function DashboardLayout() {
	const location = useLocation();
	const path = location.pathname;

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const activeItem = useMemo(() => {
		const activeView = path.split('/')[2] || 'dashboard';
		return ROUTE_MAP[activeView] || 'dashboard';
	}, [path]);

	return (
		<div className="flex h-[100dvh] bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
			{/* Backdrop para móviles */}
			{isSidebarOpen && (
				<div 
					className="fixed inset-0 bg-black/50 dark:bg-black/70 z-[50] xl:hidden transition-opacity cursor-pointer"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Sidebar animada (Off-canvas en móvil, fija en XL) */}
			<div 
				className={`fixed xl:relative inset-y-0 left-0 z-[60] xl:z-40 transition-transform duration-300 ease-in-out flex-shrink-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
				}`}
			>
				<ClientSidebar activeItem={activeItem} onClose={() => setIsSidebarOpen(false)} />
			</div>

			<div className={`flex-1 flex flex-col w-full h-full min-w-0 transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-900 ${
				isSidebarOpen ? 'md:pl-64 xl:pl-0' : ''
			}`}>
				<DashboardHeader 
					onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
					isSidebarOpen={isSidebarOpen}
				/>
				<main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
					<div className="max-w-screen-2xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
