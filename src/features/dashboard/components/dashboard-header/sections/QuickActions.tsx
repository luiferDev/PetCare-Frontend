import { useNavigate } from 'react-router-dom';
import { Zap, AlertTriangle } from 'lucide-react';

export default function QuickActions() {
	const navigate = useNavigate();

	return (
		<div className="hidden lg:flex items-center gap-2">
			<button
				onClick={() => navigate('/dashboard/new-service')}
				className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 dark:text-orange-400 dark:hover:text-orange-300 rounded-xl transition-all duration-200"
			>
				<Zap className="w-4 h-4" />
				Nuevo Servicio
			</button>
			<button
				onClick={() => navigate('/dashboard/emergency')}
				className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300 rounded-xl transition-all duration-200 animate-pulse"
			>
				<AlertTriangle className="w-4 h-4" />
				Emergencia
			</button>
		</div>
	);
}
