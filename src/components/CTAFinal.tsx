import React from 'react';
import { motion } from 'framer-motion';
import { useModalStore } from '../store/modalStore';
import Huella from './Huella';

const CTAFinal = () => {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* huella neón de fondo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <Huella size={280} className="text-azul/[0.06] blur-[2px]" rotate={18} />
            </div>

            <div className="relative max-w-3xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl md:text-6xl text-claro leading-tight mb-6"
                >
                    ¿Listo para dar{' '}
                    <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-azul to-cielo">
                        el siguiente paso?
                    </em>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="text-claro/60 text-lg mb-12 max-w-xl mx-auto"
                >
                    Prueba Passo gratis por 30 días y descubre todo lo que
                    puede hacer por tu academia.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => useModalStore.getState().openModal('registro')}
                        className="bg-azul text-claro text-base font-bold px-10 py-4 rounded-full hover:brightness-110 hover:scale-[1.03] transition-all shadow-xl shadow-azul/25"
                    >
                        Prueba 30 días gratis
                    </button>
                    <button
                        onClick={() => useModalStore.getState().openModal('contact')}
                        className="text-claro/80 hover:text-claro font-semibold px-6 py-4 transition-colors"
                    >
                        Hablar con nosotros
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default CTAFinal;
