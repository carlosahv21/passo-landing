import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import Huella from './Huella';
import { useModalStore } from '../store/modalStore';

// Paso básico de salsa: conteo real 1-2-3, 5-6-7 (el 4 y el 8 son pausa)
const pasos = [
    { x: '16%', y: '66%', rot: -18, flip: true, count: '1', color: 'text-azul' },
    { x: '48%', y: '76%', rot: 10, flip: false, count: '2', color: 'text-oro' },
    { x: '30%', y: '48%', rot: -8, flip: true, count: '3', color: 'text-azul' },
    { x: '62%', y: '40%', rot: 14, flip: false, count: '5', color: 'text-oro' },
    { x: '42%', y: '20%', rot: -4, flip: true, count: '6', color: 'text-azul' },
    { x: '72%', y: '8%', rot: 18, flip: false, count: '7', color: 'text-oro' },
];

const generos = ['Salsa', 'Bachata', 'Kizomba', 'Merengue', 'Urbano', 'Folklore', 'Ballet', 'Tango'];

const StepDiagram = () => {
    const reduced = useReducedMotion();
    return (
        <div className="relative w-full h-[380px] lg:h-[460px]" aria-hidden="true">
            {pasos.map((p, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${p.color}`}
                    style={{ left: p.x, top: p.y }}
                    initial={reduced ? { opacity: 0.8 } : { opacity: 0, scale: 0.6 }}
                    animate={reduced
                        ? { opacity: 0.8 }
                        : { opacity: [0, 1, 1, 0.4], scale: [0.6, 1, 1, 1] }}
                    transition={reduced ? undefined : {
                        duration: 6.4,
                        times: [0, 0.07, 0.72, 1],
                        repeat: Infinity,
                        delay: i * 0.55,
                        ease: 'easeOut',
                    }}
                >
                    <Huella size={48} flip={p.flip} rotate={p.rot} />
                    <span className="absolute -right-6 top-0 font-mono text-base font-bold opacity-90">
                        {p.count}
                    </span>
                </motion.div>
            ))}
            {/* etiqueta de diagrama, como en las cartillas de baile de salón */}
            <div className="absolute bottom-0 left-0 font-mono text-[11px] uppercase tracking-[0.25em] text-claro/40">
                Fig. 1 — Paso básico
            </div>
        </div>
    );
};

const Hero = () => {
    return (
        <header className="relative pt-28 pb-0 overflow-hidden">
            <div className="absolute inset-0 stage-glow -z-10"></div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-center py-10">
                    {/* Texto */}
                    <div className="lg:col-span-7">
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-mono text-xs uppercase tracking-[0.3em] text-oro mb-8 flex items-center gap-3"
                        >
                            <Huella size={11} className="text-oro" rotate={16} />
                            Para academias de baile
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-display text-5xl md:text-7xl font-medium leading-[1.02] text-claro mb-8"
                        >
                            Toda transformación comienza con{' '}
                            <em className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-azul to-cielo">
                                un paso.
                            </em>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="text-lg md:text-xl text-claro/60 max-w-xl mb-10 leading-relaxed"
                        >
                            Passo organiza pagos, asistencia y progreso de tus alumnos,
                            para que tu academia dedique menos tiempo a administrar
                            y más tiempo a transformar vidas.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                        >
                            <button
                                onClick={() => useModalStore.getState().openModal('registro')}
                                className="bg-azul text-claro text-base font-bold px-9 py-4 rounded-full hover:brightness-110 hover:scale-[1.03] transition-all shadow-xl shadow-azul/25"
                            >
                                Da el primer paso — Gratis
                            </button>
                            <button className="flex items-center gap-2 text-claro/80 hover:text-claro font-semibold px-6 py-4 transition-colors">
                                <Play size={18} className="text-oro" />
                                Ver demo
                            </button>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-8 font-mono text-xs uppercase tracking-widest text-claro/40"
                        >
                            Web · iOS · Android
                        </motion.p>
                    </div>

                    {/* Diagrama de paso básico */}
                    <div className="lg:col-span-5 hidden sm:block">
                        <StepDiagram />
                    </div>
                </div>

                {/* Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 mb-24 relative -rotate-1"
                >
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-oro/10 blur-[100px] -z-10"></div>
                    <img
                        alt="Panel de control de Passo para academias de baile"
                        fetchPriority="high"
                        className="w-full object-cover aspect-[21/9] transition-transform duration-500 hover:scale-[1.03]"
                        src="/images/dashboard-laptop.png"
                    />
                </motion.div>
            </div>

            {/* Marquee de géneros */}
            <div className="relative -mx-4 -rotate-1 bg-oro py-3 overflow-hidden" aria-hidden="true">
                <div className="marquee-track flex w-max items-center">
                    {[0, 1].map((half) => (
                        <div key={half} className="flex items-center shrink-0">
                            {generos.map((g) => (
                                <span key={`${half}-${g}`} className="flex items-center gap-6 px-6 font-mono text-sm font-bold uppercase tracking-[0.3em] text-noche">
                                    {g}
                                    <Huella size={11} className="text-noche/60" rotate={20} />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Hero;
