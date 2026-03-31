// src/features/grooming/GroomingView.tsx
import { Scissors, Star, Clock, ChevronRight, MapPin, Phone, Sparkles, Droplets, ShieldCheck, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
    {
        icon: Scissors,
        name: 'Corte estándar',
        desc: 'Baño, secado y corte según el estándar de la raza.',
        duration: '60–90 min',
        price: '$25',
        color: 'bg-orange-50 text-orange-600',
        border: 'border-orange-100',
    },
    {
        icon: Sparkles,
        name: 'Corte premium',
        desc: 'Incluye perfumado, aromaterapia y lazo decorativo.',
        duration: '90–120 min',
        price: '$40',
        color: 'bg-purple-50 text-purple-600',
        border: 'border-purple-100',
        badge: 'Popular',
    },
    {
        icon: Droplets,
        name: 'Baño & spa',
        desc: 'Baño medicado, hidratación de pelo y masaje relajante.',
        duration: '45–60 min',
        price: '$20',
        color: 'bg-blue-50 text-blue-600',
        border: 'border-blue-100',
    },
    {
        icon: ShieldCheck,
        name: 'Paquete completo',
        desc: 'Corte, baño, uñas, limpieza de orejas y aromaterapia.',
        duration: '120–150 min',
        price: '$55',
        color: 'bg-emerald-50 text-emerald-600',
        border: 'border-emerald-100',
        badge: 'Mejor valor',
    },
];

const STEPS = [
    { num: '01', title: 'Elige tu servicio', desc: 'Selecciona el servicio ideal para tu mascota según su raza y necesidades.' },
    { num: '02', title: 'Agenda tu cita', desc: 'Escoge fecha y hora. Confirmaremos en menos de 30 minutos.' },
    { num: '03', title: 'Recogida a domicilio', desc: 'Nuestro equipo pasa a buscar a tu mascota y la lleva de regreso.' },
    { num: '04', title: 'Disfruta el resultado', desc: 'Foto del antes/después incluida. ¡Garantizamos tu satisfacción!' },
];

const REVIEWS = [
    { name: 'Laura M.', pet: 'Golden Retriever', rating: 5, text: '"Quedó hermosísimo, olía increíble y el equipo fue muy tierno con él."' },
    { name: 'Carlos R.', pet: 'Shih Tzu', rating: 5, text: '"Puntual, profesional y el resultado superó mis expectativas."' },
    { name: 'Ana V.', pet: 'Gato Persa', rating: 5, text: '"Mi gata odia el baño pero con ellos estuvo tranquila. Milagroso."' },
];

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];

export function GroomingView() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-pink-600 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full -translate-y-1/3 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-full translate-y-1/3 -translate-x-1/4" />
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 py-12 md:py-16">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-orange-200 hover:text-white transition-colors mb-6 text-sm"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" /> Volver al Dashboard
                    </button>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                                    <Scissors className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-orange-200 font-medium text-sm uppercase tracking-widest">Reserva rápida</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                Grooming profesional<br />
                                <span className="text-orange-200">a domicilio</span>
                            </h1>
                            <p className="text-orange-100 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
                                Estilistas certificados que harán a tu mascota sentir como una estrella. Servicio de recogida y entrega incluido.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-6 py-3.5 bg-white text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-colors shadow-lg">
                                    <Scissors className="w-5 h-5" /> Reservar ahora
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/30 text-white rounded-2xl font-medium hover:bg-white/20 transition-colors">
                                    Ver servicios <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Quick booking widget */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 sm:p-6">
                            <h3 className="font-bold text-white text-lg mb-4">Reserva rápida</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-orange-200 text-xs font-medium mb-1.5 uppercase tracking-wider">Servicio</label>
                                    <select className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-white placeholder-orange-200">
                                        <option className="text-gray-900">Baño & spa — $20</option>
                                        <option className="text-gray-900">Corte estándar — $25</option>
                                        <option className="text-gray-900">Corte premium — $40</option>
                                        <option className="text-gray-900">Paquete completo — $55</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-orange-200 text-xs font-medium mb-1.5 uppercase tracking-wider">Fecha</label>
                                    <input
                                        type="date"
                                        className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-orange-200 text-xs font-medium mb-2 uppercase tracking-wider">Horario</label>
                                    <div className="flex flex-wrap gap-2">
                                        {TIME_SLOTS.map(slot => (
                                            <button
                                                key={slot}
                                                className="px-3 py-1.5 text-xs bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/25 transition-colors"
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full mt-2 py-3 bg-white text-orange-600 rounded-xl font-bold text-sm hover:bg-orange-50 transition-colors shadow-md">
                                    Confirmar reserva
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-10 space-y-12">

                {/* ── Services ─────────────────────────────────────────────── */}
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Nuestros servicios</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Adaptados a cada raza y necesidad</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {SERVICES.map(s => {
                            const Icon = s.icon;
                            return (
                                <div
                                    key={s.name}
                                    className={`relative bg-white dark:bg-gray-800 rounded-2xl p-5 border ${s.border} dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group`}
                                >
                                    {s.badge && (
                                        <span className="absolute -top-2.5 right-4 text-[11px] font-bold bg-orange-500 text-white px-2.5 py-0.5 rounded-full shadow">
                                            {s.badge}
                                        </span>
                                    )}
                                    <div className={`w-11 h-11 ${s.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{s.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 leading-relaxed">{s.desc}</p>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Clock className="w-3.5 h-3.5" /> {s.duration}
                                        </span>
                                        <span className="font-bold text-orange-600 text-base">{s.price}</span>
                                    </div>
                                    <button className="mt-3 w-full py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl text-xs font-semibold hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors">
                                        Reservar este servicio
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── How it works ─────────────────────────────────────────── */}
                <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">¿Cómo funciona?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        {/* Connector line (desktop only) */}
                        <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200" />
                        {STEPS.map((step, i) => (
                            <div key={step.num} className="relative text-center">
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center font-black text-xl shadow-md ${
                                    i === 0 ? 'bg-orange-100 text-orange-600' :
                                    i === 1 ? 'bg-pink-100 text-pink-600' :
                                    i === 2 ? 'bg-purple-100 text-purple-600' :
                                    'bg-emerald-100 text-emerald-600'
                                }`}>
                                    {step.num}
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{step.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Reviews ──────────────────────────────────────────────── */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Lo que dicen nuestros clientes</h2>
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                            </div>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">4.9</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {REVIEWS.map(r => (
                            <div key={r.name} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex mb-2">
                                    {Array.from({ length: r.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3 leading-relaxed">{r.text}</p>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{r.name}</p>
                                    <p className="text-gray-400 text-xs">{r.pet}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ──────────────────────────────────────────────────── */}
                <section className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl p-6 sm:p-10 text-white text-center shadow-2xl shadow-orange-500/30">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">¿Listo para mimar a tu mascota?</h2>
                    <p className="text-orange-100 mb-6 text-sm sm:text-base">Primera sesión con 20% de descuento para nuevos clientes.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="px-8 py-3.5 bg-white text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                            <Scissors className="w-5 h-5" /> Reservar ahora
                        </button>
                        <button className="px-8 py-3.5 border border-white/40 text-white rounded-2xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                            <MapPin className="w-5 h-5" /> Ver ubicaciones
                        </button>
                        <button className="px-8 py-3.5 border border-white/40 text-white rounded-2xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                            <Phone className="w-5 h-5" /> Llamar
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
