// src/features/care/CareView.tsx
import { Shield, Clock, Phone, Heart, Star, ChevronRight, CheckCircle2, AlertTriangle, Stethoscope, Ambulance, Video, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FEATURES = [
    {
        icon: Clock,
        title: 'Disponible las 24 horas',
        description: 'Veterinarios de guardia disponibles todos los días del año, incluyendo festivos.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: Shield,
        title: 'Seguro incluido',
        description: 'Cada servicio incluye cobertura de seguro para gastos veterinarios de emergencia.',
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        icon: Stethoscope,
        title: 'Veterinarios certificados',
        description: 'Equipo de profesionales con más de 10 años de experiencia en medicina veterinaria.',
        color: 'bg-purple-50 text-purple-600',
    },
    {
        icon: Video,
        title: 'Consulta por videollamada',
        description: 'Habla con un veterinario en menos de 5 minutos desde la comodidad de tu hogar.',
        color: 'bg-orange-50 text-orange-600',
    },
];

const PLANS = [
    {
        id: 'basic',
        name: 'Básico',
        price: '$9.99',
        period: '/mes',
        highlight: false,
        features: ['Consulta chat 24/7', '2 videollamadas/mes', 'Recordatorios automáticos', 'Historial digital'],
        cta: 'Comenzar gratis',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '$19.99',
        period: '/mes',
        highlight: true,
        badge: 'Más popular',
        features: ['Todo lo de Básico', 'Videollamadas ilimitadas', 'Seguro de emergencias', 'Atención domiciliaria', 'Línea de emergencia directa'],
        cta: 'Elegir Pro',
    },
    {
        id: 'family',
        name: 'Familia',
        price: '$29.99',
        period: '/mes',
        highlight: false,
        features: ['Todo lo de Pro', 'Hasta 5 mascotas', 'Descuentos en clínicas asociadas', 'Traslados de emergencia'],
        cta: 'Elegir Familia',
    },
];

const EMERGENCY_STEPS = [
    { step: '1', text: 'Llama a la línea de emergencia', icon: Phone },
    { step: '2', text: 'Describe los síntomas al veterinario', icon: Stethoscope },
    { step: '3', text: 'Recibe guía inmediata o traslado', icon: Ambulance },
];

export function CareView() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 text-sm"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" /> Volver al Dashboard
                    </button>
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-blue-200 font-medium text-sm uppercase tracking-widest">Cuidado Premium</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                            Cuidado 24/7 con <br className="hidden sm:block" />
                            <span className="text-blue-200">Seguro incluido</span>
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
                            Veterinarios disponibles en todo momento. Tu mascota merece atención inmediata cuando más la necesita.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-blue-700 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                                <Phone className="w-5 h-5" /> Llamar ahora (gratis)
                            </button>
                            <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 border border-white/30 text-white rounded-2xl font-medium hover:bg-white/20 transition-colors backdrop-blur">
                                Ver planes <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 sm:px-6 py-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                                { value: '< 5 min', label: 'Tiempo de respuesta' },
                                { value: '98%', label: 'Satisfacción' },
                                { value: '24/7', label: 'Disponibilidad' },
                            ].map(stat => (
                                <div key={stat.label}>
                                    <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                                    <p className="text-blue-200 text-xs sm:text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-10 space-y-12">

                {/* ── Features ─────────────────────────────────────────────── */}
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">¿Qué incluye el servicio?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {FEATURES.map(f => {
                            const Icon = f.icon;
                            return (
                                <div key={f.title} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                    <div className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{f.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{f.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── Emergency Protocol ───────────────────────────────────── */}
                <section className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-3xl p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-red-900 dark:text-red-300">Protocolo de Emergencia</h2>
                            <p className="text-red-700 dark:text-red-400 text-sm">¿Tu mascota muestra señales de peligro? Actúa de inmediato.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {EMERGENCY_STEPS.map(step => {
                            const Icon = step.icon;
                            return (
                                <div key={step.step} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {step.step}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{step.text}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-md">
                        <Phone className="w-5 h-5" /> Línea de Emergencia: 800-PET-CARE
                    </button>
                </section>

                {/* ── Plans ────────────────────────────────────────────────── */}
                <section>
                    <div className="text-center mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Elige tu plan</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Sin contratos. Cancela cuando quieras.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {PLANS.map(plan => (
                            <div
                                key={plan.id}
                                className={`relative rounded-3xl p-6 flex flex-col ${
                                    plan.highlight
                                        ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/30 ring-2 ring-blue-400 scale-[1.02]'
                                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-sm'
                                }`}
                            >
                                {plan.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}
                                <div className="mb-4">
                                    <h3 className={`font-bold text-sm uppercase tracking-wider mb-1 ${plan.highlight ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold">{plan.price}</span>
                                        <span className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>{plan.period}</span>
                                    </div>
                                </div>
                                <ul className="flex-1 space-y-2.5 mb-6">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-200' : 'text-emerald-500'}`} />
                                            <span className={plan.highlight ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                                    plan.highlight
                                        ? 'bg-white text-blue-700 hover:bg-blue-50'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}>
                                    {plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" /> Pago seguro con cifrado SSL
                    </p>
                </section>

                {/* ── Trust ────────────────────────────────────────────────── */}
                <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map(s => <Star key={s} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white text-lg">4.9 / 5 — Más de 2,400 reseñas</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">"Increíble servicio. Mi perro tuvo una crisis a las 2am y en minutos tenía un veterinario en videocall." — María G.</p>
                        </div>
                        <div className="sm:ml-auto flex-shrink-0">
                            <div className="flex items-center gap-2 text-emerald-600">
                                <Heart className="w-5 h-5 fill-emerald-600" />
                                <span className="font-bold text-sm">12,000+ mascotas atendidas</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
