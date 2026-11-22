import React from 'react';
import { Avatar, Card } from 'antd';
import { WalletOutlined, ScheduleOutlined, FallOutlined } from '@ant-design/icons';
import { withAntd } from '../lib/antd';
import SeccionTitulo from './ui/SeccionTitulo';
import Reveal from './ui/Reveal';

const retos = [
    {
        icon: <WalletOutlined />,
        color: '#F2B33D',
        title: 'Pagos desordenados',
        description: 'A mano generan errores y te quitan horas.',
    },
    {
        icon: <ScheduleOutlined />,
        color: '#0A84FF',
        title: 'Asistencias en todos lados',
        description: 'WhatsApp, Excel y apuntes, sin visión clara.',
    },
    {
        icon: <FallOutlined />,
        color: '#FF7A45',
        title: 'No sabes quién deja de asistir',
        description: 'Sin datos es difícil actuar a tiempo.',
    },
];

function Retos() {
    return (
        <section className="seccion seccion-blanca" id="retos">
            <div className="contenedor">
                <SeccionTitulo
                    eyebrow="Los retos de cada academia"
                    titulo="Lo que hoy te quita tiempo,"
                    resaltado="Passo lo organiza"
                    bajada="Si hoy llevas tu academia entre cuadernos, WhatsApp y hojas de cálculo, esto te va a sonar conocido."
                    unaLinea
                />
                <div className="mt-14 grid md:grid-cols-3 gap-6">
                    {retos.map((r, i) => (
                        <Reveal key={r.title} delay={i * 0.08}>
                            <Card variant="borderless" className="h-full !rounded-3xl !bg-fondo text-center" styles={{ body: { padding: '32px 24px' } }}>
                                <Avatar size={60} style={{ background: r.color, fontSize: 26, boxShadow: `0 10px 24px -8px ${r.color}` }} icon={r.icon} />
                                <h3 className="mt-5 t-card xl:whitespace-nowrap">{r.title}</h3>
                                <p className="mt-2 text-[15px] text-gris leading-relaxed xl:whitespace-nowrap">{r.description}</p>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default withAntd(Retos);
