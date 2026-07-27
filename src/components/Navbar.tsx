import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useModalStore } from '../store/modalStore';

const APP_URL = import.meta.env.PUBLIC_APP_URL;

const links = [
    { id: 'producto', label: 'Producto' },
    { id: 'para-quien', label: 'Para quién' },
    { id: 'calculadora', label: 'Calculadora' },
    { id: 'pricing', label: 'Precios' },
];

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
                    <a href="#" className="flex items-center gap-2.5" aria-label="Passo — inicio">
                        <img src="/images/logo-passo.webp" alt="" className="h-8 w-auto" />
                        <span className="font-display text-2xl font-semibold tracking-tight text-claro">
                            Passo
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest">
                        {links.map((l) => (
                            <button key={l.id} onClick={() => goTo(l.id)} className="text-claro/60 hover:text-claro transition-colors">
                                {l.label}
                            </button>
                        ))}
                    </div>

                    {/* Acciones */}
                    <div className="hidden md:flex items-center gap-5">
                        <a href={APP_URL} className="text-sm font-semibold text-claro/70 hover:text-claro transition-colors">
                            Iniciar sesión
                        </a>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => useModalStore.getState().openModal('registro')}
                            className="bg-azul text-claro text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-azul/20 hover:brightness-110 transition-all"
                        >
                            Prueba 30 días gratis
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
                            {links.map((l) => (
                                <button key={l.id} onClick={() => goTo(l.id)} className="text-claro/70 hover:text-claro block px-3 py-2 text-base font-medium text-left w-full">
                                    {l.label}
                                </button>
                            ))}
                            <a href={APP_URL} className="text-claro/70 hover:text-claro block px-3 py-2 text-base font-medium">
                                Iniciar sesión
                            </a>
                            <div className="pt-3">
                                <button
                                    onClick={() => { setIsOpen(false); useModalStore.getState().openModal('registro'); }}
                                    className="w-full bg-azul text-claro text-base font-bold px-8 py-3.5 rounded-full shadow-lg shadow-azul/20"
                                >
                                    Prueba 30 días gratis
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
