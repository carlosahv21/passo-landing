import React from 'react';
import { motion } from 'framer-motion';
import { Check, BarChart3, ShieldCheck } from 'lucide-react';
import { usePreciosCOP, fmtCOP } from '../lib/trm';
import { useModalStore } from '../store/modalStore';

const CheckItem = ({ children, icon: Icon = Check, bold = false }: { children: React.ReactNode; icon?: typeof Check; bold?: boolean }) => (
    <li className={`flex items-center gap-3 text-sm ${bold ? 'text-claro font-bold' : 'text-claro/70'}`}>
        <Icon size={16} className="flex-shrink-0 text-azul" />
        {children}
    </li>
);

const Pricing = () => {
    const precios = usePreciosCOP();

    return (
        <section className="py-20 md:py-28 relative" id="pricing">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-oro mb-5">Precios</p>
                    <h2 className="font-display text-4xl md:text-5xl mb-5 text-claro">Paga solo por quien baila</h2>
                    <p className="text-claro/60 text-lg">
                        Sin planes fijos ni contratos: un precio por alumno activo al mes.
                        <span className="block mt-2 text-oro font-semibold">30 días de prueba gratis en cualquier plan.</span>
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {/* Plan Demo */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-3xl bg-pista border border-claro/10 flex flex-col"
                    >
                        <h3 className="font-display text-2xl mb-2 text-claro">Demo</h3>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-black text-claro">Gratis</span>
                        </div>
                        <p className="font-mono text-xs uppercase tracking-wider text-claro/50 mb-8">
                            para siempre
                        </p>
                        <p className="text-claro/60 text-sm mb-10">
                            Conoce Passo por dentro antes de dar el paso.
                        </p>
                        <ul className="space-y-5 mb-10 flex-grow">
                            <CheckItem>Hasta 15 alumnos</CheckItem>
                            <CheckItem>1 administrador</CheckItem>
                            <CheckItem>Historial de reportes: 30 días</CheckItem>
                        </ul>
                        <button onClick={() => useModalStore.getState().openModal('registro')} className="w-full py-4 rounded-full border border-claro/20 hover:bg-claro/5 transition-colors font-bold text-sm text-claro">
                            Probar la demo
                        </button>
                    </motion.div>

                    {/* Plan Básico */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-3xl bg-pista border border-claro/10 flex flex-col"
                    >
                        <h3 className="font-display text-2xl mb-2 text-claro">Básico</h3>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-black text-claro">{fmtCOP.format(precios.basico)}</span>
                        </div>
                        <p className="font-mono text-xs uppercase tracking-wider text-claro/50 mb-8">
                            por alumno / mes · ~$1 USD
                        </p>
                        <p className="text-claro/60 text-sm mb-10">
                            Todo lo esencial para organizar tu academia y dejar los cuadernos atrás.
                        </p>
                        <ul className="space-y-5 mb-10 flex-grow">
                            <CheckItem>Alumnos ilimitados</CheckItem>
                            <CheckItem>Hasta 3 administradores</CheckItem>
                            <CheckItem>1 reporte personalizado</CheckItem>
                            <CheckItem>Módulos cruzados por reporte: 2</CheckItem>
                            <CheckItem>Historial de reportes: 180 días</CheckItem>
                            <CheckItem>App móvil completa</CheckItem>
                        </ul>
                        <button onClick={() => useModalStore.getState().openModal('registro')} className="w-full py-4 rounded-full border border-claro/20 hover:bg-claro/5 transition-colors font-bold text-sm text-claro">
                            Prueba 30 días gratis
                        </button>
                    </motion.div>

                    {/* Plan Pro */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-3xl bg-pista border-2 border-azul relative flex flex-col shadow-[0_0_50px_rgba(10,132,255,0.18)]"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-azul text-claro text-[10px] font-mono font-bold px-5 py-1.5 rounded-full tracking-[0.2em] uppercase whitespace-nowrap">El paso más popular</div>

                        <h3 className="font-display text-2xl mb-2 text-claro">Pro</h3>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-black text-claro">{fmtCOP.format(precios.pro)}</span>
                        </div>
                        <p className="font-mono text-xs uppercase tracking-wider text-claro/50 mb-8">
                            por alumno / mes · ~$2 USD
                        </p>
                        <p className="text-claro/60 text-sm mb-10">
                            Para academias que deciden con datos: todo lo del Básico, sin límites y con reportes a tu medida.
                        </p>
                        <ul className="space-y-5 mb-10 flex-grow">
                            <CheckItem bold icon={BarChart3}>5 reportes personalizados</CheckItem>
                            <CheckItem>Alumnos y administradores ilimitados</CheckItem>
                            <CheckItem>Módulos cruzados por reporte: 3</CheckItem>
                            <CheckItem>Historial de reportes completo</CheckItem>
                            <CheckItem>Módulo de costos de academia</CheckItem>
                            <CheckItem>Dashboard personalizable por rol</CheckItem>
                            <CheckItem>App móvil completa</CheckItem>
                        </ul>
                        <button onClick={() => useModalStore.getState().openModal('registro')} className="w-full py-4 rounded-full bg-azul hover:brightness-110 transition-all font-bold text-sm text-claro shadow-lg shadow-azul/25">
                            Prueba 30 días gratis
                        </button>
                    </motion.div>
                </div>

                {/* Notas */}
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <p className="text-claro/40 text-[10px] leading-relaxed italic">
                        * Precios en pesos colombianos{precios.trm
                            ? `, calculados con la TRM oficial del día (${fmtCOP.format(precios.trm)})`
                            : ' de referencia'}. Se facturan los alumnos activos de cada mes.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-2 pt-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={15} className="text-oro" />
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-claro/70">30 días de prueba · Garantía de satisfacción</span>
                        </div>
                        <p className="text-claro/40 text-[11px]">Un mes completo para medir los beneficios reales. Sin contratos forzosos.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
