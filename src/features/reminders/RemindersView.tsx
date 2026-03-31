// src/features/reminders/RemindersView.tsx
import { useState } from 'react';
import { Bell, BellRing, Plus, Calendar, ChevronRight, Syringe, Pill, Scissors, Stethoscope, Clock, CheckCircle2, AlertCircle, Trash2, ToggleLeft, ToggleRight, X, PawPrint, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ReminderCategory = 'all' | 'vaccine' | 'medication' | 'grooming' | 'checkup';
type ReminderStatus = 'upcoming' | 'today' | 'overdue' | 'done';

interface Reminder {
    id: string;
    petName: string;
    petSpecies: string;
    title: string;
    category: Exclude<ReminderCategory, 'all'>;
    date: string;
    time: string;
    status: ReminderStatus;
    active: boolean;
    notes?: string;
}

const MOCK_REMINDERS: Reminder[] = [
    { id: 'r1', petName: 'Sky', petSpecies: 'Perro', title: 'Vacuna antirrábica anual', category: 'vaccine', date: 'Hoy, 15 Nov', time: '10:00 AM', status: 'today', active: true },
    { id: 'r2', petName: 'Matilda', petSpecies: 'Perro', title: 'Desparasitación interna', category: 'medication', date: '18 Nov 2025', time: '8:00 AM', status: 'upcoming', active: true, notes: 'Usar Milbemax 1 comprimido' },
    { id: 'r3', petName: 'Sky', petSpecies: 'Perro', title: 'Baño y corte de pelo', category: 'grooming', date: '20 Nov 2025', time: '2:00 PM', status: 'upcoming', active: true },
    { id: 'r4', petName: 'Matilda', petSpecies: 'Perro', title: 'Chequeo veterinario anual', category: 'checkup', date: '25 Nov 2025', time: '11:30 AM', status: 'upcoming', active: false },
    { id: 'r5', petName: 'Sky', petSpecies: 'Perro', title: 'Vitaminas y suplementos', category: 'medication', date: '1 Oct 2025', time: '8:00 AM', status: 'overdue', active: true },
    { id: 'r6', petName: 'Matilda', petSpecies: 'Perro', title: 'Vacuna Parvovirus (DHPP)', category: 'vaccine', date: '15 Oct 2025', time: '9:00 AM', status: 'done', active: true },
];

const CATEGORY_CONFIG = {
    vaccine: { icon: Syringe, label: 'Vacuna', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', dot: 'bg-emerald-500', selected: 'bg-emerald-500 text-white' },
    medication: { icon: Pill, label: 'Medicamento', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', dot: 'bg-blue-500', selected: 'bg-blue-500 text-white' },
    grooming: { icon: Scissors, label: 'Grooming', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', dot: 'bg-purple-500', selected: 'bg-purple-500 text-white' },
    checkup: { icon: Stethoscope, label: 'Consulta médica', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', dot: 'bg-orange-500', selected: 'bg-orange-500 text-white' },
};

const STATUS_CONFIG = {
    today: { label: 'Hoy', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300', border: 'border-l-4 border-l-orange-500' },
    upcoming: { label: 'Próximo', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', border: 'border-l-4 border-l-blue-500' },
    overdue: { label: 'Vencido', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', border: 'border-l-4 border-l-red-500' },
    done: { label: 'Completado', badge: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400', border: 'border-l-4 border-l-gray-300' },
};

const FILTER_TABS: { key: ReminderCategory; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'vaccine', label: 'Vacunas' },
    { key: 'medication', label: 'Medicamentos' },
    { key: 'grooming', label: 'Grooming' },
    { key: 'checkup', label: 'Consultas' },
];

// ── New Reminder Modal ────────────────────────────────────────────────────────
interface NewReminderModalProps {
    onClose: () => void;
    onSave: (r: Reminder) => void;
}

function NewReminderModal({ onClose, onSave }: NewReminderModalProps) {
    const [title, setTitle] = useState('');
    const [petName, setPetName] = useState('');
    const [category, setCategory] = useState<Exclude<ReminderCategory, 'all'>>('vaccine');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('09:00');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!title.trim()) { setError('El título es obligatorio.'); return; }
        if (!petName.trim()) { setError('El nombre de la mascota es obligatorio.'); return; }
        if (!date) { setError('La fecha es obligatoria.'); return; }

        const [year, month, day] = date.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        const newReminder: Reminder = {
            id: `r${Date.now()}`,
            title: title.trim(),
            petName: petName.trim(),
            petSpecies: 'Mascota',
            category,
            date: formattedDate,
            time: time,
            status: 'upcoming',
            active: true,
            notes: notes.trim() || undefined,
        };
        onSave(newReminder);
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal panel */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 60 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="relative w-full sm:max-w-lg bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                                <Bell className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Nuevo Recordatorio</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Mantén al día el cuidado de tu mascota</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-2.5">
                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Categoría */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Tipo de recordatorio</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(Object.entries(CATEGORY_CONFIG) as [Exclude<ReminderCategory, 'all'>, typeof CATEGORY_CONFIG['vaccine']][]).map(([key, cfg]) => {
                                    const Icon = cfg.icon;
                                    const isSelected = category === key;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setCategory(key)}
                                            className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 transition-all text-left ${
                                                isSelected
                                                    ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                                                    : 'border-transparent bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? cfg.color : 'bg-white dark:bg-gray-700'}`}>
                                                <Icon className={`w-4 h-4 ${isSelected ? cfg.color.split(' ')[1] : 'text-gray-400'}`} />
                                            </div>
                                            <span className="text-sm font-semibold">{cfg.label}</span>
                                            {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-500 ml-auto" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Título */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                Título <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Ej: Vacuna antirrábica anual"
                                    value={title}
                                    onChange={e => { setTitle(e.target.value); setError(''); }}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-400 dark:border-gray-700 dark:focus:border-orange-400 text-gray-900 dark:text-white rounded-xl text-sm focus:outline-none transition-colors placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Mascota */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                Mascota <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <PawPrint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    value={petName}
                                    onChange={e => { setPetName(e.target.value); setError(''); }}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-400 dark:border-gray-700 dark:focus:border-orange-400 text-gray-900 dark:text-white rounded-xl text-sm focus:outline-none transition-colors appearance-none"
                                >
                                    <option value="">Selecciona una mascota...</option>
                                    <option value="Sky">Sky (Perro)</option>
                                    <option value="Matilda">Matilda (Perro)</option>
                                </select>
                            </div>
                        </div>

                        {/* Fecha y Hora */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                    Fecha <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={e => { setDate(e.target.value); setError(''); }}
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-400 dark:border-gray-700 dark:focus:border-orange-400 text-gray-900 dark:text-white rounded-xl text-sm focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Hora</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-400 dark:border-gray-700 dark:focus:border-orange-400 text-gray-900 dark:text-white rounded-xl text-sm focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notas */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Notas (opcional)</label>
                            <textarea
                                rows={3}
                                placeholder="Ej: Recordar llevar carnet de vacunación..."
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-400 dark:border-gray-700 dark:focus:border-orange-400 text-gray-900 dark:text-white rounded-xl text-sm focus:outline-none transition-colors resize-none placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
                        >
                            <Bell className="w-4 h-4" />
                            Crear recordatorio
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

// ── Reminder card ─────────────────────────────────────────────────────────────
function ReminderCard({ reminder, onToggle, onDelete, onMarkDone }: {
    reminder: Reminder;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onMarkDone: (id: string) => void;
}) {
    const cat = CATEGORY_CONFIG[reminder.category];
    const status = STATUS_CONFIG[reminder.status];
    const CatIcon = cat.icon;
    const isDone = reminder.status === 'done';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isDone ? 0.6 : 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm ${status.border}`}
        >
            <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <CatIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div className="min-w-0">
                            <h3 className={`font-bold text-sm ${isDone ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                                {reminder.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {reminder.petName} · {reminder.petSpecies}
                            </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${status.badge}`}>
                            {status.label}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3.5 h-3.5" /> {reminder.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3.5 h-3.5" /> {reminder.time}
                        </span>
                    </div>
                    {reminder.notes && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 italic">{reminder.notes}</p>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 dark:border-gray-700 gap-2 flex-wrap">
                <button
                    onClick={() => onToggle(reminder.id)}
                    className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                    {reminder.active
                        ? <><ToggleRight className="w-5 h-5 text-orange-500" /> Notif. activa</>
                        : <><ToggleLeft className="w-5 h-5 text-gray-400" /> Notif. pausada</>
                    }
                </button>
                <div className="flex gap-2">
                    {!isDone && (
                        <button
                            onClick={() => onMarkDone(reminder.id)}
                            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                        >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Marcar listo
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(reminder.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

// ── Main view ─────────────────────────────────────────────────────────────────
export function RemindersView() {
    const navigate = useNavigate();
    const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS);
    const [activeFilter, setActiveFilter] = useState<ReminderCategory>('all');
    const [showModal, setShowModal] = useState(false);

    const filtered = activeFilter === 'all'
        ? reminders
        : reminders.filter(r => r.category === activeFilter);

    const counts = {
        today: reminders.filter(r => r.status === 'today').length,
        overdue: reminders.filter(r => r.status === 'overdue').length,
        upcoming: reminders.filter(r => r.status === 'upcoming').length,
    };

    const handleToggle = (id: string) => setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
    const handleDelete = (id: string) => setReminders(prev => prev.filter(r => r.id !== id));
    const handleMarkDone = (id: string) => setReminders(prev => prev.map(r => r.id === id ? { ...r, status: 'done' as ReminderStatus } : r));
    const handleSave = (r: Reminder) => setReminders(prev => [r, ...prev]);

    const renderGroup = (statusFilter: ReminderStatus, label: string, Icon: React.ElementType, labelColor: string) => {
        const group = filtered.filter(r => r.status === statusFilter);
        if (group.length === 0) return null;
        return (
            <div>
                <h2 className={`text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 mt-4 ${labelColor}`}>
                    <Icon className="w-3.5 h-3.5" /> {label}
                </h2>
                <AnimatePresence>
                    <div className="space-y-3">
                        {group.map(r => (
                            <ReminderCard key={r.id} reminder={r} onToggle={handleToggle} onDelete={handleDelete} onMarkDone={handleMarkDone} />
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Modal */}
            {showModal && <NewReminderModal onClose={() => setShowModal(false)} onSave={handleSave} />}

            {/* ── Sticky header ──────────────────────────────────────────── */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 rotate-180" />
                            </button>
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-orange-500" />
                                    Mis Recordatorios
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{reminders.length} recordatorios en total</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-sm font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Nuevo</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">

                {/* ── Summary cards ──────────────────────────────────────── */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/50 rounded-2xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                            <BellRing className="w-4 h-4 text-orange-600" />
                            <span className="text-2xl font-black text-orange-700 dark:text-orange-400">{counts.today}</span>
                        </div>
                        <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Hoy</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-2xl font-black text-red-700 dark:text-red-400">{counts.overdue}</span>
                        </div>
                        <p className="text-xs text-red-600 dark:text-red-400 font-medium">Vencidos</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="text-2xl font-black text-blue-700 dark:text-blue-400">{counts.upcoming}</span>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Próximos</p>
                    </div>
                </div>

                {/* ── Overdue alert ──────────────────────────────────────── */}
                {counts.overdue > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl px-4 py-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-sm text-red-700 dark:text-red-300">
                            Tienes <strong>{counts.overdue} recordatorio{counts.overdue > 1 ? 's' : ''} vencido{counts.overdue > 1 ? 's' : ''}</strong>. Reagéndalos o márcalos como completados.
                        </p>
                    </motion.div>
                )}

                {/* ── Filter tabs ────────────────────────────────────────── */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {FILTER_TABS.map(tab => {
                        const count = tab.key === 'all' ? reminders.length : reminders.filter(r => r.category === tab.key).length;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveFilter(tab.key)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                                    activeFilter === tab.key
                                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-gray-600'
                                }`}
                            >
                                {tab.label}
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeFilter === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* ── List ──────────────────────────────────────────────── */}
                {filtered.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                            <Bell className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Sin recordatorios</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-4">No tienes recordatorios en esta categoría.</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl font-medium text-sm hover:bg-orange-600 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Crear recordatorio
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-2">
                        {renderGroup('today', 'Hoy', BellRing, 'text-orange-600 dark:text-orange-400')}
                        {renderGroup('overdue', 'Vencidos', AlertCircle, 'text-red-600 dark:text-red-400')}
                        {renderGroup('upcoming', 'Próximos', Calendar, 'text-blue-600 dark:text-blue-400')}
                        {renderGroup('done', 'Completados', CheckCircle2, 'text-gray-400')}
                    </div>
                )}
            </div>
        </div>
    );
}
