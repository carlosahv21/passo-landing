import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import { useModalStore } from '../store/modalStore';
import Eyebrow from './Eyebrow';

const Hero = () => {
    // el botón de bajar se desvanece con el scroll
    const { scrollY } = useScroll();
    const opacidadBajar = useTransform(scrollY, [0, 250], [1, 0]);
    const clicsBajar = useTransform(scrollY, (v) => (v > 250 ? 'none' : 'auto'));

    return (
        <header className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
            <div className="absolute inset-0 stage-glow -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    {/* Texto */}
                    <div className="lg:col-span-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-10"
                        >
                            <Eyebrow>Software para academias de baile</Eyebrow>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-display text-5xl md:text-6xl font-medium leading-[1.08] text-claro mb-8"
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
                            className="text-lg md:text-xl text-claro/60 max-w-md mb-12 leading-relaxed"
                        >
                            Passo organiza tu academia para que puedas enfocarte
                            en lo más importante: transformar vidas a través del baile.
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
                                Prueba 30 días gratis
                            </button>
                            <button
                                onClick={() => document.getElementById('producto')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-3 text-claro/80 hover:text-claro font-semibold px-4 py-4 transition-colors"
                            >
                                Ver cómo funciona
                                <span className="w-9 h-9 rounded-full border border-claro/20 flex items-center justify-center">
                                    <Play size={14} className="text-azul ml-0.5" />
                                </span>
                            </button>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-10 font-mono text-xs uppercase tracking-widest text-claro/40"
                        >
                            Web · iOS · Android
                        </motion.p>
                    </div>

                    {/* Visual: laptop con la app + teléfono */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-6 relative hidden sm:block"
                    >
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[75%] h-44 bg-azul/15 blur-[110px] -z-10"></div>
                        <img
                            alt="Panel de control de Passo para academias de baile"
                            fetchPriority="high"
                            className="w-[108%] max-w-none -ml-8"
                            src="/images/dashboard-laptop.png"
                        />
                        <img
                            alt="App móvil de Passo mostrando una clase de salsa"
                            className="absolute -bottom-0 -right-20 w-[65%] drop-shadow-2xl"
                            src="/images/mobile-app-iso.png"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Botón para bajar: entra con retardo y se desvanece al hacer scroll */}
            <motion.div
                style={{ opacity: opacidadBajar, pointerEvents: clicsBajar }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    onClick={() => document.getElementById('retos')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label="Bajar a la siguiente sección"
                    className="w-11 h-11 rounded-full border border-claro/20 text-claro/60 hover:text-claro hover:border-claro/40 transition-colors flex items-center justify-center"
                >
                    <motion.span
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex"
                    >
                        <ChevronDown size={20} />
                    </motion.span>
                </motion.button>
            </motion.div>
        </header>
    );
};

export default Hero;
