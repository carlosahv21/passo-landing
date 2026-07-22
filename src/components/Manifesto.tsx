import React from 'react';
import { motion } from 'framer-motion';
import Huella from './Huella';

// Huellas de fondo cruzando la sección en diagonal
const trail = [
    { x: '6%', y: '15%', rot: 24, flip: true, size: 46 },
    { x: '18%', y: '55%', rot: 32, flip: false, size: 52 },
    { x: '32%', y: '25%', rot: 28, flip: true, size: 48 },
    { x: '58%', y: '65%', rot: 35, flip: false, size: 56 },
    { x: '74%', y: '20%', rot: 26, flip: true, size: 44 },
    { x: '88%', y: '58%', rot: 34, flip: false, size: 50 },
];

const Manifesto = () => {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* rastro de huellas */}
            <div className="absolute inset-0" aria-hidden="true">
                {trail.map((h, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-claro/[0.05]"
                        style={{ left: h.x, top: h.y }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: i * 0.15 }}
                        viewport={{ once: true }}
                    >
                        <Huella size={h.size} flip={h.flip} rotate={h.rot} />
                    </motion.div>
                ))}
            </div>

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
