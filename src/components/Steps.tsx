import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Huella from './Huella';

interface Step {
    num: string;
    id?: string;
    eyebrow: string;
    title: React.ReactNode;
    description: string;
    items: string[];
    img: string;
    alt: string;
    accent: string;
}

const steps: Step[] = [
    {
        num: '01',
        eyebrow: 'Cobranza sin fricción',
        title: <>Cobra sin <em className="italic text-azul">perseguir</em> a nadie</>,
        description: 'Digitaliza tu cobranza y genera recibos automáticos. Historial de pagos organizado, sin cuadernos ni capturas de WhatsApp.',
        items: [
            'Recibos automáticos con tu marca',
            'Historial de pagos por alumno',
            'Notificaciones de cobro',
            'App nativa para iOS y Android',
        ],
        img: '/images/mobile-app-iso.png',
        alt: 'App móvil de Passo',
        accent: 'text-azul',
    },
    {
        num: '02',
        eyebrow: 'Programación inteligente',
        title: <>Tu agenda, <em className="italic text-oro">bajo control</em></>,
        description: 'Visualiza clases, horarios y profesores en un solo lugar. Detecta conflictos automáticamente y optimiza la ocupación de tus salones.',
        items: [
            'Vista semanal y mensual intuitiva',
            'Asignación rápida de profesores',
            'Control de aforo por salón',
            'Reprogramación con drag & drop',
        ],
        img: '/images/calendar.png',
        alt: 'Calendario de clases de Passo',
        accent: 'text-oro',
    },
    {
        num: '03',
        id: 'students',
        eyebrow: 'El recorrido de cada alumno',
        title: <>Cada alumno deja <em className="italic text-cielo">su huella</em></>,
        description: 'Pagos, asistencia, rachas y logros en un solo perfil. Cada alumno ve su progreso real y se mantiene motivado para volver a la pista.',
        items: [
            'Perfiles con historial completo',
            'Asistencia en tiempo real',
            'Rachas, logros y estadísticas personales',
            'Alertas de pagos pendientes',
        ],
        img: '/images/students.png',
        alt: 'Directorio de estudiantes de Passo',
        accent: 'text-cielo',
    },
];

const Steps = () => {
    return (
        <section id="features" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-oro mb-5">La plataforma</p>
                    <h2 className="font-display text-4xl md:text-5xl text-claro">El camino, paso a paso</h2>
                </motion.div>

                <div className="space-y-32">
                    {steps.map((step, i) => {
                        const flip = i % 2 === 1;
                        return (
                            <div key={step.num} id={step.id} className="grid lg:grid-cols-2 gap-14 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: flip ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className={flip ? 'lg:order-2' : ''}
                                >
                                    <div className={`flex items-center gap-4 mb-6 ${step.accent}`}>
                                        <div className="flex gap-1.5">
                                            <Huella size={13} flip rotate={-12} />
                                            <Huella size={13} rotate={12} className="mt-2" />
                                        </div>
                                        <span className="font-mono text-sm font-bold uppercase tracking-[0.3em]">
                                            Paso {step.num}
                                        </span>
                                        <span className="font-mono text-xs uppercase tracking-widest text-claro/40">
                                            {step.eyebrow}
                                        </span>
                                    </div>
                                    <h3 className="font-display text-4xl md:text-5xl text-claro leading-tight mb-6">
                                        {step.title}
                                    </h3>
                                    <p className="text-claro/60 text-lg leading-relaxed mb-8">
                                        {step.description}
                                    </p>
                                    <ul className="space-y-4">
                                        {step.items.map((item, j) => (
                                            <motion.li
                                                key={j}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: j * 0.1 }}
                                                viewport={{ once: true }}
                                                className="flex items-center gap-3 text-claro/80"
                                            >
                                                <Check size={16} className={`flex-shrink-0 ${step.accent}`} />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: flip ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className={`relative ${flip ? 'lg:order-1' : ''}`}
                                >
                                    <img
                                        src={step.img}
                                        alt={step.alt}
                                        loading="lazy"
                                        decoding="async"
                                        className={`w-full h-auto block transition-transform duration-500 hover:scale-105 ${flip ? 'rotate-1' : '-rotate-1'}`}
                                    />
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Steps;
