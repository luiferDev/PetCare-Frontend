import { useState } from 'react';
import LeftSection from './sections/LeftSection';
import SearchBar from './sections/SearchBar';
import QuickActions from './sections/QuickActions';
import Notifications from './sections/Notifications';
import { ProfileDropDownButton } from './sections/ProfileDropDownButton';
import UserInfoHeader from './sections/UserInfoHeader';
import MenuItems from './sections/MenuItems';
import MobileSearch from './sections/MobileSearch';

interface DashboardHeaderProps {
	onMenuToggle?: () => void;
	isSidebarOpen?: boolean;
}

export function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {

	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
		if (onMenuToggle) onMenuToggle();
	};

	return (
		<header className="shrink-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 px-4 md:px-6 py-3 md:py-4 sticky top-0 z-50 transition-colors duration-300">
			<div className="flex items-center justify-between gap-4 w-full min-w-0">
				{/* Left Section */}
				<div className="min-w-0 flex-1">
					<LeftSection onMenuToggle={handleMenuToggle} />
				</div>

				{/* Right Section */}
				<div className="flex items-center gap-2 md:gap-3 shrink-0">
					<SearchBar />
					<QuickActions />
					<Notifications />
					{/* Profile Dropdown */}
					<div className="relative">
						<ProfileDropDownButton 
							onClick={() => setShowProfileMenu(!showProfileMenu)}
							showProfileMenu={showProfileMenu}
						/>
						{/* Dropdown Menu */}
						{showProfileMenu && (
							<div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-50 transition-colors duration-300">
								<UserInfoHeader />
								<MenuItems />
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Mobile Search - aparece solo en móviles */}
			<MobileSearch />

			{/* Click outside handler */}
			{showProfileMenu && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setShowProfileMenu(false)}
				></div>
			)}
		</header>
	);
}
