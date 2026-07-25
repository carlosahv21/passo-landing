import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ClipboardList, TrendingDown } from 'lucide-react';
import Eyebrow from './Eyebrow';

const retos = [
    {
        icon: Wallet,
        title: 'Pagos desordenados',
        description: 'Llevar el control de pagos manualmente genera errores y pérdida de tiempo.',
    },
    {
        icon: ClipboardList,
        title: 'Asistencias en todos lados',
        description: 'WhatsApp, hojas de cálculo y apuntes no te dan una visión clara.',
    },
    {
        icon: TrendingDown,
        title: 'No sabes quién deja de asistir',
        description: 'Sin datos reales, es difícil tomar decisiones y hacer crecer tu academia.',
    },
];

const Retos = () => {
    return (
        <section className="py-20 md:py-28 relative" id="retos">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Eyebrow>Los retos de cada academia</Eyebrow>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {retos.map((reto, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-5 p-8 rounded-3xl bg-pista border border-claro/10 hover:border-claro/25 transition-colors duration-300"
                        >
                            <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-azul/10 border border-azul/20 flex items-center justify-center">
                                <reto.icon size={22} className="text-azul" strokeWidth={1.6} />
                            </span>
                            <div>
                                <h3 className="font-display text-xl text-claro mb-2">{reto.title}</h3>
                                <p className="text-claro/60 text-sm leading-relaxed">{reto.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center font-display text-3xl md:text-4xl text-claro"
                >
                    Passo organiza <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-azul to-cielo">todo eso.</em>
                </motion.p>
            </div>
        </section>
    );
};

export default Retos;
