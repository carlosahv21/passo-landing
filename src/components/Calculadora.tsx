import React, { useState } from 'react';
import { Card, Slider, Statistic } from 'antd';
import { withAntd } from '../lib/antd';
import Huella from './Huella';
import TipoToggle from './TipoToggle';
import SeccionTitulo from './ui/SeccionTitulo';
import Reveal from './ui/Reveal';
import NotaMano from './ui/NotaMano';
import { planPorAlumnos, fmtCOP, type Tipo } from '../lib/planes';

const Etiqueta: React.FC<{ htmlFor?: string; texto: string; valor?: React.ReactNode }> = ({ htmlFor, texto, valor }) => (
    <label htmlFor={htmlFor} className="flex items-center justify-between text-[15px] font-semibold text-tinta mb-2">
        {texto}
        {valor !== undefined && <span className="text-azul font-bold">{valor}</span>}
    </label>
);

function Calculadora() {
    const [alumnos, setAlumnos] = useState(80);
    const [tipo, setTipo] = useState<Tipo>('basico');
    const [mensualidad, setMensualidad] = useState(110000);

    const plan = planPorAlumnos(alumnos);
    const costoPasso = plan.precio[tipo];
    const alumnosARetener = Math.max(1, Math.ceil(costoPasso / mensualidad));
    const costoPorAlumno = Math.round(costoPasso / alumnos);

    return (
        <section className="seccion seccion-azul" id="calculadora">
            <div className="contenedor">
                <SeccionTitulo
                    alinear="left"
                    sobreAzul
                    eyebrow="Calculadora Passo"
                    titulo="¿Cuántos alumnos"
                    resaltado="pagan Passo?"
                    bajada="Passo cuesta una fracción de lo que cobras por alumno. Calcula cuántas mensualidades cubren la plataforma para toda tu academia."
                />

                <Reveal className="mt-12 relative">
                    <Card variant="borderless" className="!rounded-3xl shadow-tarjeta" styles={{ body: { padding: 12 } }}>
                        <div className="grid lg:grid-cols-12 gap-3">
                            <div className="lg:col-span-7 p-6 md:p-10 space-y-9">
                                <div>
                                    <Etiqueta htmlFor="calc-alumnos" texto="Alumnos activos de tu academia" valor={alumnos} />
                                    <Slider id="calc-alumnos" min={10} max={500} step={5} value={alumnos} onChange={setAlumnos} tooltip={{ open: false }} />
                                    <p className="text-sm text-gris">
                                        Tu plan: <span className="font-semibold text-tinta">{plan.nombre}</span> · {plan.alumnos.toLowerCase()}
                                    </p>
                                </div>

                                <div>
                                    <Etiqueta texto="Funcionalidades" />
                                    <TipoToggle tipo={tipo} onChange={setTipo} block />
                                    <p className="mt-2 text-sm text-gris">
                                        {plan.nombre} Básico {fmtCOP.format(plan.precio.basico)} · {plan.nombre} Pro {fmtCOP.format(plan.precio.pro)} al mes
                                    </p>
                                </div>

                                <div>
                                    <Etiqueta htmlFor="calc-mensualidad" texto="Tu mensualidad por alumno" valor={fmtCOP.format(mensualidad)} />
                                    <Slider
                                        id="calc-mensualidad"
                                        min={80000}
                                        max={200000}
                                        step={5000}
                                        value={mensualidad}
                                        onChange={setMensualidad}
                                        tooltip={{ open: false }}
                                    />
                                </div>
                            </div>

                            <div className="relative lg:col-span-5 hero-ola rounded-2xl p-8 md:p-10 flex flex-col justify-center">
                                <NotaMano flecha="abajo-izquierda" className="absolute right-8 top-6 hidden xl:block">
                                    Haz la cuenta
                                </NotaMano>
                                <div className="flex gap-2 text-azul mb-4" aria-hidden="true">
                                    {Array.from({ length: Math.min(alumnosARetener, 6) }, (_, i) => (
                                        <Huella key={i} size={10} flip={i % 2 === 0} rotate={i % 2 === 0 ? -12 : 12} />
                                    ))}
                                </div>
                                <p className="text-[88px] font-extrabold leading-none tracking-[-0.04em] text-azul">{alumnosARetener}</p>
                                <p className="mt-3 text-lg text-tinta">
                                    {alumnosARetener === 1 ? 'alumno paga' : 'alumnos pagan'} Passo para{' '}
                                    <span className="font-semibold">toda tu academia</span>
                                </p>
                                <div className="mt-8 grid grid-cols-2 gap-3 text-left">
                                    <Card size="small" variant="borderless" className="!rounded-2xl">
                                        <Statistic title="Costo mensual Passo" value={fmtCOP.format(costoPasso)} styles={{ content: { fontSize: 20, fontWeight: 700 } }} />
                                    </Card>
                                    <Card size="small" variant="borderless" className="!rounded-2xl">
                                        <Statistic title="Por alumno activo" value={fmtCOP.format(costoPorAlumno)} styles={{ content: { fontSize: 20, fontWeight: 700 } }} />
                                    </Card>
                                </div>
                                <p className="mt-6 text-sm text-gris">Con la mensualidad de 1 a 3 alumnos, Passo queda pagado para toda tu academia.</p>
                            </div>
                        </div>
                    </Card>
                </Reveal>
            </div>
        </section>
    );
}

export default withAntd(Calculadora);
