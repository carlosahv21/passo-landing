import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Huella from './Huella';
import { usePreciosCOP, fmtCOP } from '../lib/trm';

const NOMBRES = { basico: 'Básico', pro: 'Pro' } as const;

const Calculadora = () => {
    const precios = usePreciosCOP();
    const [alumnos, setAlumnos] = useState(80);
    const [plan, setPlan] = useState<keyof typeof NOMBRES>('basico');
    const [mensualidad, setMensualidad] = useState(110000);

    const precioPlan = precios[plan];
    const costoPasso = alumnos * precioPlan;
    const alumnosARetener = Math.max(1, Math.ceil(costoPasso / mensualidad));
    const porcentaje = ((precioPlan / mensualidad) * 100).toFixed(1);

    return (
        <section className="py-20 md:py-28 relative" id="calculadora">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-oro mb-5">Calculadora Passo</p>
                    <h2 className="font-display text-4xl md:text-5xl text-claro mb-5">
                        ¿Cuántos alumnos paga Passo?
                    </h2>
                    <p className="text-claro/60 text-lg max-w-2xl mx-auto">
                        Passo cuesta apenas una fracción de lo que cobras por alumno.
                        Calcula cuántas mensualidades cubren la plataforma para toda tu academia.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
                >
                    {/* Entradas */}
                    <div className="p-9 rounded-3xl bg-pista border border-claro/10 space-y-8">
                        <div>
                            <label htmlFor="calc-alumnos" className="flex justify-between text-sm font-semibold text-claro mb-3">
                                Alumnos de tu academia
                                <span className="font-mono text-azul">{alumnos}</span>
                            </label>
                            <input
                                id="calc-alumnos"
                                type="range"
                                min={10}
                                max={500}
                                step={5}
                                value={alumnos}
                                onChange={(e) => setAlumnos(Number(e.target.value))}
                                className="w-full accent-azul"
                            />
                        </div>

                        <div>
                            <span className="block text-sm font-semibold text-claro mb-3">Plan</span>
                            <div className="grid grid-cols-2 gap-3">
                                {(Object.keys(NOMBRES) as Array<keyof typeof NOMBRES>).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setPlan(key)}
                                        aria-pressed={plan === key}
                                        className={`py-3 px-4 rounded-2xl border text-sm font-bold transition-colors ${
                                            plan === key
                                                ? 'border-azul bg-azul/10 text-claro'
                                                : 'border-claro/15 text-claro/60 hover:border-claro/30'
                                        }`}
                                    >
                                        {NOMBRES[key]}
                                        <span className="block font-mono text-xs font-normal mt-1 text-claro/50">
                                            {fmtCOP.format(precios[key])}/alumno
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="calc-mensualidad" className="flex justify-between text-sm font-semibold text-claro mb-3">
                                Tu mensualidad por alumno
                                <span className="font-mono text-azul">{fmtCOP.format(mensualidad)}</span>
                            </label>
                            <input
                                id="calc-mensualidad"
                                type="range"
                                min={80000}
                                max={200000}
                                step={5000}
                                value={mensualidad}
                                onChange={(e) => setMensualidad(Number(e.target.value))}
                                className="w-full accent-azul"
                            />
                        </div>
                    </div>

                    {/* Resultado */}
                    {/* fondo sólido (mezcla noche+azul): translúcido dejaba ver las huellas del fondo */}
                    <div className="p-9 rounded-3xl bg-[#0E1926] border border-azul/25 flex flex-col justify-center text-center">
                        <div className="flex justify-center gap-2 mb-6 text-azul" aria-hidden="true">
                            {Array.from({ length: Math.min(alumnosARetener, 6) }, (_, i) => (
                                <Huella key={i} size={16} flip={i % 2 === 0} rotate={i % 2 === 0 ? -12 : 12} />
                            ))}
                        </div>
                        <p className="font-display text-6xl md:text-7xl text-claro mb-2">
                            {alumnosARetener}
                        </p>
                        <p className="text-claro/80 text-lg mb-8">
                            {alumnosARetener === 1 ? 'alumno paga' : 'alumnos pagan'} Passo
                            para <span className="text-claro font-semibold">toda tu academia</span>
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="p-4 rounded-2xl bg-noche/60 border border-claro/10">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-claro/50 mb-1">Costo mensual Passo</p>
                                <p className="text-claro font-bold">{fmtCOP.format(costoPasso)}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-noche/60 border border-claro/10">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-claro/50 mb-1">De cada mensualidad</p>
                                <p className="text-claro font-bold">{porcentaje}%</p>
                            </div>
                        </div>
                        <p className="font-display italic text-claro/60 mt-8">
                            Con la mensualidad de 2 a 4 alumnos, ya está pagado Passo para toda tu academia.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Calculadora;
