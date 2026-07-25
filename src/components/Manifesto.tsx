import React from 'react';
import { motion } from 'framer-motion';

const Manifesto = () => {
    return (
        <section className="relative py-20 md:py-28">
            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="font-display italic text-4xl md:text-6xl text-claro leading-tight mb-4"
                >
                    El baile conecta personas.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    viewport={{ once: true }}
                    className="font-display italic text-4xl md:text-6xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-azul to-cielo mb-12"
                >
                    El baile transforma vidas.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="font-mono text-xs uppercase tracking-[0.3em] text-claro/50"
                >
                    Cada alumno deja una huella — Passo la registra
                </motion.p>
            </div>
        </section>
    );
};

export default Manifesto;
