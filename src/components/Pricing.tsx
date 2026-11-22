import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Card, Tag } from 'antd';
import { CheckCircleFilled, MinusOutlined, TeamOutlined, SafetyCertificateOutlined, GiftOutlined, DownOutlined } from '@ant-design/icons';
import { PLANES, TIPOS, DEMO, COMPARACION, fmtCOP, type Tipo } from '../lib/planes';
import { useModalStore } from '../store/modalStore';
import { withAntd } from '../lib/antd';
import TipoToggle from './TipoToggle';
import SeccionTitulo from './ui/SeccionTitulo';
import Reveal from './ui/Reveal';
import NotaMano from './ui/NotaMano';

const abrirRegistro = () => useModalStore.getState().openModal('registro');

const Celda: React.FC<{ valor: string | boolean; activo: boolean }> = ({ valor, activo }) => (
    <td className={`px-4 py-3 text-center ${activo ? 'bg-azul-suave/60' : ''}`}>
        {valor === true ? (
            <CheckCircleFilled style={{ color: '#0A84FF', fontSize: 17 }} />
        ) : valor === false ? (
            <MinusOutlined style={{ color: '#B0B8C4' }} />
        ) : (
            <span className="font-semibold text-tinta">{valor}</span>
        )}
    </td>
);

function Pricing() {
    const [tipo, setTipo] = useState<Tipo>('basico');
    const [verDiferencias, setVerDiferencias] = useState(false);

    return (
        <section className="seccion seccion-blanca" id="pricing">
            <div className="contenedor">
                <SeccionTitulo
                    eyebrow="Precios"
                    titulo="Un plan a la medida de"
                    resaltado="tu academia"
                    bajada="El plan depende de tus alumnos activos. Las funcionalidades Pro las eliges aparte, en cualquier plan: no tienes que crecer para tenerlas."
                />

                <Reveal className="mt-8 flex flex-col items-center gap-5">
                    <Tag color="blue" variant="filled" icon={<GiftOutlined />} className="!px-4 !py-1.5 !text-sm !rounded-lg !m-0 !whitespace-normal !h-auto max-w-full text-center">
                        Demo: {DEMO.dias} días gratis con todo Pro, en cualquier plan
                    </Tag>
                    <div className="relative">
                        <TipoToggle tipo={tipo} onChange={setTipo} />
                        <NotaMano flecha="abajo-derecha" className="absolute right-full mr-16 -top-2 w-48 hidden lg:block">
                            Pro, en cualquier
                            <br />
                            plan
                        </NotaMano>
                    </div>

                    {/* ¿Básico o Pro? Desplegable con las diferencias */}
                    <Button
                        type="text"
                        onClick={() => setVerDiferencias((v) => !v)}
                        aria-expanded={verDiferencias}
                        aria-controls="diferencias-basico-pro"
                        className="!font-semibold !text-azul"
                        icon={<DownOutlined className={`transition-transform duration-300 ${verDiferencias ? 'rotate-180' : ''}`} />}
                        iconPlacement="end"
                    >
                        ¿Básico o Pro? Lo eliges en cualquier plan
                    </Button>
                    <AnimatePresence initial={false}>
                        {verDiferencias && (
                            <motion.div
                                id="diferencias-basico-pro"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="w-full overflow-hidden"
                            >
                                <div className="rounded-2xl border border-linea overflow-hidden">
                                    <table className="w-full text-[15px]">
                                        <thead>
                                            <tr className="bg-fondo text-tinta">
                                                <th className="px-4 py-3 text-left font-semibold">Funcionalidad</th>
                                                {(Object.keys(TIPOS) as Tipo[]).map((k) => (
                                                    <th key={k} className={`px-4 py-3 w-1/4 font-bold ${tipo === k ? 'text-azul bg-azul-suave' : ''}`}>
                                                        {TIPOS[k].nombre}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-linea">
                                            {COMPARACION.map((f) => (
                                                <tr key={f.funcion}>
                                                    <td className="px-4 py-3 text-gris">{f.funcion}</td>
                                                    <Celda valor={f.basico} activo={tipo === 'basico'} />
                                                    <Celda valor={f.pro} activo={tipo === 'pro'} />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Reveal>

                <div className="mt-12 grid md:grid-cols-3 gap-6 items-stretch">
                    {PLANES.map((plan, i) => (
                        <Reveal key={plan.id} delay={i * 0.08}>
                            <Card
                                variant="borderless"
                                className={`relative h-full !rounded-3xl ${
                                    plan.destacado ? '!border-2 !border-solid !border-azul shadow-flotante' : 'shadow-tarjeta'
                                }`}
                                styles={{ body: { height: '100%', display: 'flex', flexDirection: 'column' } }}
                            >
                                {plan.destacado && (
                                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-azul px-4 py-1 text-xs font-semibold text-white">
                                        El paso más popular
                                    </span>
                                )}
                                <h3 className="t-h3">{plan.nombre}</h3>
                                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gris">
                                    <TeamOutlined style={{ color: '#0A84FF' }} /> {plan.alumnos}
                                </p>
                                <div className="mt-6 flex items-baseline gap-1.5">
                                    <span className="text-[40px] font-extrabold tracking-[-0.03em] text-tinta">{fmtCOP.format(plan.precio[tipo])}</span>
                                    <span className="text-gris">/ mes</span>
                                </div>
                                <p className="text-sm text-suave h-5">
                                    {tipo === 'pro'
                                        ? `Con Pro · +${fmtCOP.format(plan.precio.pro - plan.precio.basico)} sobre Básico`
                                        : 'Con funcionalidades Básicas'}
                                </p>
                                <p className="mt-5 text-gris leading-relaxed flex-grow">{plan.descripcion}</p>
                                <Button
                                    type={plan.destacado ? 'primary' : 'default'}
                                    size="large"
                                    block
                                    className="!mt-8"
                                    onClick={abrirRegistro}
                                >
                                    Probar {DEMO.dias} días gratis
                                </Button>
                            </Card>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-linea grid md:grid-cols-12 gap-x-10 gap-y-3">
                    <p className="md:col-span-4 flex items-start gap-2 text-sm leading-relaxed font-semibold text-tinta">
                        <SafetyCertificateOutlined style={{ color: '#0A84FF', marginTop: 4 }} /> Demo de {DEMO.dias} días con Pro · Garantía de satisfacción
                    </p>
                    <p className="md:col-span-5 text-sm leading-relaxed text-gris">
                        Un mes completo con todas las funcionalidades Pro para medir los beneficios reales. Al terminar la Demo
                        eliges tu plan y si sigues con Básico o Pro. Sin contratos forzosos.
                    </p>
                    <p className="md:col-span-3 text-sm leading-relaxed text-gris">
                        Precios en pesos colombianos, por mes. El plan se asigna según los alumnos activos de cada mes.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default withAntd(Pricing);
