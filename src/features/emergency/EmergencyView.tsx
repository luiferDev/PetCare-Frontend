// src/features/emergency/EmergencyView.tsx
import { AlertTriangle, Phone, MapPin, ChevronRight, Clock, Heart, Ambulance, Thermometer, Eye, Wind, Zap, Shield, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SYMPTOMS = [
    { icon: Wind, label: 'Dificultad para respirar', severity: 'critical', color: 'text-red-600 bg-red-100' },
    { icon: Zap, label: 'Convulsiones o desmayos', severity: 'critical', color: 'text-red-600 bg-red-100' },
    { icon: Heart, label: 'Pérdida de conocimiento', severity: 'critical', color: 'text-red-600 bg-red-100' },
    { icon: AlertTriangle, label: 'Sangrado intenso', severity: 'critical', color: 'text-red-600 bg-red-100' },
    { icon: Thermometer, label: 'Fiebre alta (> 40°C)', severity: 'urgent', color: 'text-orange-600 bg-orange-100' },
    { icon: Eye, label: 'Vómitos repetidos', severity: 'urgent', color: 'text-orange-600 bg-orange-100' },
    { icon: AlertTriangle, label: 'Abdomen muy hinchado', severity: 'urgent', color: 'text-orange-600 bg-orange-100' },
    { icon: Heart, label: 'Letargo extremo', severity: 'urgent', color: 'text-orange-600 bg-orange-100' },
];

const CLINICS = [
    { name: 'Clínica VetUrgencias Centro', address: 'Av. Principal 1245, Ciudad', phone: '800-VET-001', distance: '1.2 km', open: true, hours: '24 horas' },
    { name: 'Hospital Veterinario Norte', address: 'Calle Los Pinos 890, Norte', phone: '800-VET-002', distance: '2.8 km', open: true, hours: '24 horas' },
    { name: 'VetEmergencia Express', address: 'Blvd. Sur 445, Sur', phone: '800-VET-003', distance: '4.1 km', open: false, hours: '8am – 10pm' },
];

const FIRST_AID = [
    {
        title: 'Tu mascota no respira',
        steps: ['Abre la boca y retira obstrucciones visibles', 'Extiende el cuello suavemente', 'Sopla suavemente en los ollares cada 3 seg', 'Llama de inmediato a emergencias'],
        color: 'border-red-200 bg-red-50 dark:bg-red-950/20',
        icon: Wind,
        iconColor: 'text-red-600',
    },
    {
        title: 'Herida con sangrado',
        steps: ['Usa un paño limpio para hacer presión', 'NO retires el paño, agrega capas si es necesario', 'Mantén a tu mascota tranquila y quieta', 'Dirígete a urgencias de inmediato'],
        color: 'border-orange-200 bg-orange-50 dark:bg-orange-950/20',
        icon: Heart,
        iconColor: 'text-orange-600',
    },
    {
        title: 'Convulsion',
        steps: ['NO restrinjas a tu mascota', 'Aleja objetos peligrosos del área', 'Cronometra la duración de la convulsión', 'Llama al veterinario tras el episodio'],
        color: 'border-purple-200 bg-purple-50 dark:bg-purple-950/20',
        icon: Zap,
        iconColor: 'text-purple-600',
    },
];

export function EmergencyView() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* ── Hero urgente ─────────────────────────────────────────────── */}
            <div className="relative bg-gradient-to-br from-red-600 to-rose-700 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>
                <motion.div
                    className="relative container mx-auto px-4 sm:px-6 py-10 md:py-14"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-red-200 hover:text-white transition-colors mb-6 text-sm"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" /> Volver al Dashboard
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center animate-pulse">
                            <AlertTriangle className="w-7 h-7 text-white" />
                        </div>
                        <span className="font-bold text-red-200 uppercase tracking-widest text-sm">Línea de Emergencia</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                        Tu mascota<br />necesita ayuda ahora
                    </h1>
                    <p className="text-red-100 mb-8 text-base sm:text-lg max-w-xl leading-relaxed">
                        Nuestro equipo de veterinarios está disponible 24/7. No esperes, cada segundo cuenta en una emergencia.
                    </p>

                    {/* SOS Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="tel:800-PET-CARE"
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-red-700 rounded-2xl font-black text-lg hover:bg-red-50 transition-colors shadow-2xl shadow-red-900/30 animate-pulse"
                        >
                            <Phone className="w-6 h-6" />
                            EMERGENCIAS: 800-PET-SOS
                        </a>
                        <a
                            href="https://wa.me/5491100000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 border-2 border-white/30 text-white rounded-2xl font-bold text-base hover:bg-white/20 transition-colors backdrop-blur"
                        >
                            <Ambulance className="w-5 h-5" />
                            Pedir traslado urgente
                        </a>
                    </div>

                    {/* Status bar */}
                    <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-white/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm text-red-100">Veterinarios en línea ahora</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-red-200" />
                            <span className="text-sm text-red-100">Tiempo de respuesta promedio: <strong className="text-white">3 min</strong></span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-10 space-y-10">

                {/* ── Síntomas de alerta ───────────────────────────────────── */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">¿Cuándo es una emergencia?</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Si ves alguno de estos síntomas, actúa de inmediato</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {SYMPTOMS.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`bg-white dark:bg-gray-800 rounded-2xl p-4 border ${s.severity === 'critical' ? 'border-red-200 dark:border-red-800' : 'border-orange-200 dark:border-orange-800'} shadow-sm flex items-center gap-3`}
                                >
                                    <div className={`w-9 h-9 ${s.color} dark:bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                        <Icon className={`w-4 h-4 ${s.color.split(' ')[0]}`} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{s.label}</span>
                                    {s.severity === 'critical' && (
                                        <span className="ml-auto text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-900/30 px-1.5 py-0.5 rounded-md shrink-0">CRÍTICO</span>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2.5">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        Esta lista no es exhaustiva. Ante cualquier duda llama a nuestros veterinarios.
                    </div>
                </section>

                {/* ── Clínicas cercanas ─────────────────────────────────────── */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Clínicas de emergencia cercanas</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Basado en tu ubicación actual</p>
                        </div>
                        <button className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> Ver en mapa
                        </button>
                    </div>
                    <div className="space-y-3">
                        {CLINICS.map((clinic, i) => (
                            <motion.div
                                key={clinic.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${clinic.open ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                        <Ambulance className={`w-5 h-5 ${clinic.open ? 'text-emerald-600' : 'text-gray-400'}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">{clinic.name}</h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${clinic.open ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                                                {clinic.open ? '● ABIERTO' : '● CERRADO'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{clinic.address}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">{clinic.hours} · {clinic.distance}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <a
                                        href={`tel:${clinic.phone}`}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors"
                                    >
                                        <Phone className="w-3.5 h-3.5" /> Llamar
                                    </a>
                                    <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                        <MapPin className="w-3.5 h-3.5" /> Cómo llegar
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Primeros auxilios ─────────────────────────────────────── */}
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">Guía de primeros auxilios</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {FIRST_AID.map((guide, i) => {
                            const Icon = guide.icon;
                            return (
                                <motion.div
                                    key={guide.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`rounded-3xl p-6 border ${guide.color}`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm`}>
                                            <Icon className={`w-5 h-5 ${guide.iconColor}`} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{guide.title}</h3>
                                    </div>
                                    <ol className="space-y-2">
                                        {guide.steps.map((step, j) => (
                                            <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                                                <span className="w-5 h-5 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                                                    {j + 1}
                                                </span>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ── CTA fijo inferior (mobile) ────────────────────────────── */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-40">
                    <a
                        href="tel:800-PET-CARE"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-700 transition-colors"
                    >
                        <Phone className="w-6 h-6" /> LLAMAR EMERGENCIAS
                    </a>
                </div>
                <div className="h-24 sm:hidden" /> {/* Padding bottom for fixed button on mobile */}
            </div>
        </div>
    );
}
