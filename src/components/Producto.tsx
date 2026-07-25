import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Eyebrow from './Eyebrow';

const capacidades = ['Pagos', 'Asistencia', 'Reportes', 'Profesores', 'Eventos', 'Y mucho más'];

const Producto = () => {
    return (
        <section className="py-20 md:py-28" id="producto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Eyebrow className="mb-8">Todo tu negocio en un solo lugar</Eyebrow>
                        <h2 className="font-display text-4xl md:text-5xl text-claro leading-tight mb-6">
                            Gestiona, analiza y haz crecer tu academia.
                        </h2>
                        <p className="text-claro/60 text-lg leading-relaxed mb-10 max-w-md">
                            Deja los cuadernos y las hojas de cálculo. Passo centraliza
                            la operación completa de tu academia en un solo panel.
                        </p>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-5 max-w-md">
                            {capacidades.map((item, i) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 text-claro/80 font-medium"
                                >
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-azul/15 flex items-center justify-center">
                                        <Check size={13} className="text-azul" />
                                    </span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[70%] h-28 bg-azul/15 blur-[100px] -z-10"></div>
                        <img
                            src="/images/dashboard-laptop.png"
                            alt="Dashboard de Passo con ingresos, alumnos activos y asistencias"
                            loading="lazy"
                            decoding="async"
                            className="w-full transition-transform duration-500 hover:scale-[1.02]"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Producto;
