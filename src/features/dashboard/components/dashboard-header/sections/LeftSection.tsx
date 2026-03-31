import { Menu, PawPrint } from 'lucide-react';
import {
	displayName,
	getRoleColor,
} from '../../../../../utils/dashboardHeader';
import { useAuthStore } from '../../../../../store/AuthStore';

interface LeftSectionProps {
	onMenuToggle: () => void;
}

export default function LeftSection({ onMenuToggle }: LeftSectionProps) {
	const user = useAuthStore((state) => state.profile);
	const isLoading = useAuthStore(
		(state) => state.isAuth === false && state.profile === null
	);

	return (
		<div className="flex items-center gap-4 xl:gap-6 min-w-0 w-full">
			<button
				onClick={onMenuToggle}
				className="xl:hidden p-2 shrink-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
			>
				<Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
			</button>

			<div className="flex items-center gap-3 lg:gap-4 min-w-0 flex-1">
				{/* Logo pequeño para contexto */}
				<div
					className={`w-10 h-10 bg-gradient-to-br ${getRoleColor(
						user?.role
					)} rounded-xl flex items-center justify-center shadow-lg shrink-0`}
				>
					<PawPrint className="w-5 h-5 text-white" />
				</div>

				<div className="hidden lg:block min-w-0 flex-1">
					<h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300 truncate">
						{isLoading ? (
							<div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						) : (
							displayName(user?.role)
						)}
					</h1>
					<div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 truncate">
						{isLoading ? (
							<div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-1"></div>
						) : user ? (
							`Hola, ${user.firstName}! Que tengas un gran día`
						) : (
							'Bienvenido al sistema'
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
