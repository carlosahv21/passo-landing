import React from 'react';
import { WalletOutlined, ScheduleOutlined, UserDeleteOutlined, CloseOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { withAntd } from '../lib/antd';
import SeccionTitulo from './ui/SeccionTitulo';
import Reveal from './ui/Reveal';

// Sección de problema: tono de alerta (rojo), sin el azul de la marca, para que no se lea como solución.
const ROJO = '#E5484D';

const retos = [
    {
        icon: <WalletOutlined />,
        queja: '¿Quién me falta por pagar?',
        title: 'Pagos desordenados',
        description: 'Cuadernos y transferencias sueltas generan errores y te quitan horas.',
    },
    {
        icon: <ScheduleOutlined />,
        queja: '¿Dónde anoté la clase del martes?',
        title: 'Asistencias en todos lados',
        description: 'Entre WhatsApp, Excel y apuntes nunca tienes la foto completa.',
    },
    {
        icon: <UserDeleteOutlined />,
        queja: '¿Hace cuánto no viene Camila?',
        title: 'No sabes quién deja de asistir',
        description: 'Te enteras cuando el alumno ya se fue y es tarde para actuar.',
    },
];

function Retos() {
    return (
        <section className="seccion seccion-blanca" id="retos">
            <div className="contenedor">
                <SeccionTitulo
                    eyebrow="¿Te suena conocido?"
                    titulo="Lo que hoy"
                    resaltado="te quita tiempo"
                    colorResaltado="text-[#E5484D]"
                    bajada="Si llevas tu academia entre cuadernos, WhatsApp y hojas de cálculo, seguro has vivido esto."
                />
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    {retos.map((r, i) => (
                        <Reveal key={r.title} delay={i * 0.08} className="h-full">
                            <div className="h-full rounded-3xl border border-[#F5D5D6] bg-[#FFF8F8] p-7">
                                <div className="relative w-12 h-12">
                                    <span
                                        className="w-12 h-12 rounded-2xl bg-white text-[22px] flex items-center justify-center border border-[#F5D5D6]"
                                        style={{ color: ROJO }}
                                    >
                                        {r.icon}
                                    </span>
                                    <span
                                        className="absolute -right-1.5 -top-1.5 w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center ring-2 ring-[#FFF8F8]"
                                        style={{ background: ROJO }}
                                        aria-hidden="true"
                                    >
                                        <CloseOutlined />
                                    </span>
                                </div>
                                <p className="mt-5 font-hand text-[26px] leading-tight text-gris">“{r.queja}”</p>
                                <h3 className="mt-4 t-card">{r.title}</h3>
                                <p className="mt-2 text-[15px] text-gris leading-relaxed">{r.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={0.2} className="mt-12 text-center">
                    <a
                        href="#producto"
                        className="inline-flex items-center gap-2 text-[17px] font-semibold text-azul hover:text-cielo transition-colors"
                    >
                        Passo lo organiza por ti
                        <ArrowDownOutlined />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}

export default withAntd(Retos);
