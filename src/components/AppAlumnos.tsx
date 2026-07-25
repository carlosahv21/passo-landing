import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, History, Trophy, CreditCard, Bell, Flame } from 'lucide-react';
import Eyebrow from './Eyebrow';

const features = [
    { icon: QrCode, label: 'Marcar asistencia con QR' },
    { icon: History, label: 'Historial y progreso' },
    { icon: Trophy, label: 'Logros y rachas' },
    { icon: CreditCard, label: 'Pagos y planes' },
    { icon: Bell, label: 'Novedades y eventos' },
];

// Patrón decorativo tipo QR (7×7)
const qr = [
    1,1,1,0,1,1,1,
    1,0,1,0,1,0,1,
    1,1,1,0,1,1,1,
    0,0,0,1,0,0,0,
    1,1,0,1,1,0,1,
    1,0,1,0,0,1,0,
    1,1,1,0,1,0,1,
];

const PhoneMockup = () => (
    <div className="relative w-[270px] mx-auto" aria-hidden="true">
        <div className="absolute inset-0 bg-azul/20 blur-[80px] -z-10"></div>
        <div className="rounded-[2.6rem] border border-claro/15 bg-pista p-5 shadow-2xl">
            {/* header */}
            <div className="flex items-center justify-between mb-5">
                <p className="text-claro font-bold text-sm flex items-center gap-1.5">
                    ¡Hola, Valeria! <Flame size={14} className="text-oro" />
                </p>
                <span className="w-7 h-7 rounded-full bg-azul/15"></span>
            </div>
            {/* racha */}
            <div className="rounded-2xl bg-noche border border-claro/10 p-4 mb-4">
                <p className="font-mono text-[9px] uppercase tracking-widest text-claro/50 mb-1">Tu racha actual</p>
                <div className="flex items-end justify-between">
                    <p className="text-claro font-black text-3xl leading-none">12 <span className="text-xs font-normal text-claro/50">días</span></p>
                    <Flame size={22} className="text-oro" />
                </div>
            </div>
            {/* QR */}
            <div className="rounded-2xl bg-noche border border-claro/10 p-4 mb-4">
                <p className="font-mono text-[9px] uppercase tracking-widest text-claro/50 mb-3">Tu código para marcar asistencia</p>
                <div className="w-24 h-24 mx-auto rounded-lg bg-claro p-2 grid grid-cols-7 gap-[2px]">
                    {qr.map((v, i) => (
                        <span key={i} className={`rounded-[1px] ${v ? 'bg-noche' : 'bg-transparent'}`}></span>
                    ))}
                </div>
            </div>
            {/* progreso */}
            <div className="rounded-2xl bg-noche border border-claro/10 p-4 mb-5">
                <div className="flex justify-between mb-2">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-claro/50">Tu progreso</p>
                    <p className="font-mono text-[10px] text-azul font-bold">75%</p>
                </div>
                <div className="h-1.5 rounded-full bg-claro/10">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-azul to-cielo"></div>
                </div>
            </div>
            <div className="py-2.5 rounded-full bg-azul text-center text-claro text-xs font-bold">
                Escanear QR
            </div>
        </div>
    </div>
);

const AppAlumnos = () => {
    return (
        <section className="py-20 md:py-28" id="alumnos">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <PhoneMockup />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <Eyebrow className="mb-8">Experiencia para tus alumnos</Eyebrow>
                        <h2 className="font-display text-4xl md:text-5xl text-claro leading-tight mb-6">
                            Todo lo que tus alumnos necesitan, en su bolsillo.
                        </h2>
                        <p className="text-claro/60 text-lg leading-relaxed mb-10 max-w-md">
                            Cada alumno ve su recorrido: asistencia, logros y pagos.
                            Motivación que se traduce en permanencia para tu academia.
                        </p>
                        <ul className="space-y-4">
                            {features.map((f, i) => (
                                <motion.li
                                    key={f.label}
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-4 text-claro/80 font-medium"
                                >
                                    <span className="flex-shrink-0 w-11 h-11 rounded-2xl bg-azul/10 border border-azul/20 flex items-center justify-center">
                                        <f.icon size={19} className="text-azul" strokeWidth={1.6} />
                                    </span>
                                    {f.label}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AppAlumnos;
