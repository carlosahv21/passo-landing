import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, UserX, Layers } from 'lucide-react';

const FeaturesGrid = () => {
    const features = [
        {
            icon: TrendingDown,
            accent: 'text-azul',
            title: 'Fuga de capital',
            description: 'Controla cada centavo y evita que las mensualidades vencidas afecten tu flujo de caja de forma silenciosa. La morosidad invisible drena la rentabilidad de tu salón.'
        },
        {
            icon: UserX,
            accent: 'text-oro',
            title: 'Deserción de alumnos',
            description: 'Anticípate al abandono. Identifica alumnos en riesgo y motívalos mostrando su progreso real, antes de que dejen de asistir.'
        },
        {
            icon: Layers,
            accent: 'text-cielo',
            title: 'Caos operativo',
            description: 'Cambia el caos de los cuadernos y grupos de WhatsApp por un centro de mando digital. Gestiona horarios y salones en segundos.'
        }
    ];

    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-16"
                >
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-oro mb-5">Lo que frena a tu academia</p>
                    <h2 className="font-display text-4xl md:text-5xl text-claro leading-tight mb-5">
                        Menos administración,<br />
                        <em className="italic text-claro/70">más transformación.</em>
                    </h2>
                    <p className="text-claro/60 text-lg">Sabemos lo que cuesta mantener una academia en movimiento.</p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-9 rounded-3xl bg-pista border border-claro/10 hover:border-claro/25 hover:-translate-y-1 transition-all duration-300"
                        >
                            <feature.icon size={28} className={`${feature.accent} mb-7`} strokeWidth={1.6} />
                            <h3 className="font-display text-2xl mb-4 text-claro">{feature.title}</h3>
                            <p className="text-claro/60 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;
