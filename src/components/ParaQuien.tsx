import React from 'react';
import { motion } from 'framer-motion';
import { Building2, GraduationCap, Users } from 'lucide-react';
import Eyebrow from './Eyebrow';
import MediaSlot from './MediaSlot';

const perfiles = [
    {
        icon: Building2,
        title: 'Academias',
        description: 'Organiza tu operación, toma mejores decisiones y enfócate en crecer.',
        file: 'images/quien-academias.jpg',
    },
    {
        icon: GraduationCap,
        title: 'Profesores',
        description: 'Comparte tu conocimiento, recibe reconocimiento y haz crecer tu reputación.',
        file: 'images/quien-profesores.jpg',
    },
    {
        icon: Users,
        title: 'Alumnos',
        description: 'Sigue tu progreso, mantente motivado y conéctate con tu comunidad.',
        file: 'images/quien-alumnos.jpg',
    },
];

const ParaQuien = () => {
    return (
        <section className="py-20 md:py-28" id="para-quien">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <Eyebrow className="mb-8">Una plataforma para todos</Eyebrow>
                    <h2 className="font-display text-4xl md:text-5xl text-claro">
                        Crece toda la comunidad de baile
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {perfiles.map((p, index) => (
                        <motion.div
                            key={p.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-3xl bg-pista border border-claro/10 overflow-hidden hover:border-claro/25 hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Foto (pendiente de subir) */}
                            <MediaSlot file={p.file} className="aspect-[4/3] rounded-none border-0" />
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-10 h-10 rounded-xl bg-azul/10 border border-azul/20 flex items-center justify-center">
                                        <p.icon size={18} className="text-azul" strokeWidth={1.6} />
                                    </span>
                                    <h3 className="font-display text-2xl text-claro">{p.title}</h3>
                                </div>
                                <p className="text-claro/60 leading-relaxed">{p.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ParaQuien;
