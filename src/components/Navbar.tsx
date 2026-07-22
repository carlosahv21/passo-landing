import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useModalStore } from '../store/modalStore';
import Huella from './Huella';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const goTo = (id: string) => {
        setIsOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="fixed w-full z-50 top-0 left-0 nav-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2" aria-label="Passo — inicio">
                        <Huella size={15} className="text-azul" rotate={12} />
                        <span className="font-display text-2xl font-semibold tracking-tight text-claro">
                            Passo
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest">
                        <button onClick={() => goTo('features')} className="text-claro/60 hover:text-claro transition-colors">El camino</button>
                        <button onClick={() => goTo('calculadora')} className="text-claro/60 hover:text-claro transition-colors">Calculadora</button>
                        <button onClick={() => goTo('pricing')} className="text-claro/60 hover:text-claro transition-colors">Precios</button>
                        <button onClick={() => useModalStore.getState().openModal('about')} className="text-claro/60 hover:text-claro transition-colors">Nosotros</button>
                    </div>

                    {/* CTA */}
                    <div className="hidden md:block">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => useModalStore.getState().openModal('registro')}
                            className="bg-azul text-claro text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-azul/20 hover:brightness-110 transition-all"
                        >
                            Da el primer paso
                        </motion.button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-claro/60 hover:text-claro hover:bg-claro/5"
                            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-noche border-b border-claro/10"
                    >
                        <div className="px-4 pt-2 pb-5 space-y-1">
                            <button onClick={() => goTo('features')} className="text-claro/70 hover:text-claro block px-3 py-2 text-base font-medium text-left w-full">El camino</button>
                            <button onClick={() => goTo('pricing')} className="text-claro/70 hover:text-claro block px-3 py-2 text-base font-medium text-left w-full">Precios</button>
                            <button onClick={() => { setIsOpen(false); useModalStore.getState().openModal('about'); }} className="text-claro/70 hover:text-claro block px-3 py-2 text-base font-medium text-left w-full">Nosotros</button>
                            <div className="pt-3">
                                <button
                                    onClick={() => { setIsOpen(false); useModalStore.getState().openModal('registro'); }}
                                    className="w-full bg-azul text-claro text-base font-bold px-8 py-3.5 rounded-full shadow-lg shadow-azul/20"
                                >
                                    Da el primer paso
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
