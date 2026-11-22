import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, Button, Card, Progress, Tag } from 'antd';
import {
    PlayCircleFilled,
    QrcodeOutlined,
    DollarOutlined,
    TeamOutlined,
    AppstoreOutlined,
    RightOutlined,
    RiseOutlined,
    SafetyCertificateOutlined,
    ThunderboltOutlined,
    MobileOutlined,
    CustomerServiceOutlined,
} from '@ant-design/icons';
import { useModalStore } from '../store/modalStore';
import { withAntd } from '../lib/antd';
import Telefono from './ui/Telefono';
import NotaMano from './ui/NotaMano';
import VentanaWeb from './ui/VentanaWeb';
import { Figura } from './ui/Mancha';

const abrir = (m: 'registro' | 'video') => useModalStore.getState().openModal(m);

// Datos de ejemplo de la escena (ilustrativos)
const pagos = [
    { nombre: 'Valeria Gómez', detalle: 'Mensualidad · hoy', valor: '+$110.000', color: '#0A84FF' },
    { nombre: 'Andrés Ríos', detalle: 'Paquete 8 clases · ayer', valor: '+$95.000', color: '#22A06B' },
    { nombre: 'Camila Torres', detalle: 'Mensualidad · vence hoy', valor: null, color: '#F2B33D' },
];

const accesos = [
    { icon: <QrcodeOutlined />, label: 'Asistencia' },
    { icon: <DollarOutlined />, label: 'Cobrar' },
    { icon: <TeamOutlined />, label: 'Alumnos' },
    { icon: <AppstoreOutlined />, label: 'Más' },
];

const clases = [
    { nombre: 'Salsa caleña', hora: '6:00 p. m.', cupo: '18/21' },
    { nombre: 'Bachata', hora: '7:30 p. m.', cupo: '14/16' },
];

const confianza = [
    { icon: <SafetyCertificateOutlined />, label: 'Tus datos seguros en la nube' },
    { icon: <ThunderboltOutlined />, label: 'Fácil desde el primer día' },
    { icon: <MobileOutlined />, label: 'Web, iOS y Android' },
    { icon: <CustomerServiceOutlined />, label: 'Soporte en español' },
];

const PantallaApp = () => (
    <div className="px-5 pt-3 pb-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-[17px] font-bold text-tinta leading-tight">¡Hola, Laura!</p>
                <p className="text-[12px] text-gris">Así va tu academia hoy</p>
            </div>
            <Avatar style={{ background: '#E8F3FF', color: '#0A84FF', fontWeight: 700 }}>L</Avatar>
        </div>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-azul to-cielo p-4 text-white shadow-[0_12px_24px_-10px_rgba(10,132,255,0.6)]">
            <p className="text-[12px] text-white/80">Ingresos del mes</p>
            <p className="text-[26px] font-extrabold tracking-tight leading-tight">$ 8.450.000</p>
            <div className="flex items-end justify-between">
                <span className="text-[11px] font-semibold flex items-center gap-1">
                    <RiseOutlined /> +12% este mes
                </span>
                <svg width="96" height="30" viewBox="0 0 96 30" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 26 C 14 24, 18 14, 30 17 S 46 26, 56 15 S 76 8, 94 3" />
                </svg>
            </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            {accesos.map((a) => (
                <div key={a.label}>
                    <span className="mx-auto w-11 h-11 rounded-full bg-azul-suave text-azul text-[18px] flex items-center justify-center">
                        {a.icon}
                    </span>
                    <p className="mt-1 text-[10.5px] text-gris font-medium">{a.label}</p>
                </div>
            ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
            <p className="text-[13px] font-bold text-tinta">Clases de hoy</p>
            <span className="text-[11px] text-azul font-semibold">Ver todo</span>
        </div>
        <div className="mt-2 space-y-2">
            {clases.map((c) => (
                <div key={c.nombre} className="flex items-center justify-between rounded-xl border border-linea px-3 py-2.5">
                    <div>
                        <p className="text-[12.5px] font-semibold text-tinta">{c.nombre}</p>
                        <p className="text-[10.5px] text-gris">{c.hora}</p>
                    </div>
                    <Tag color="blue" variant="filled" className="!m-0 !text-[11px]">{c.cupo}</Tag>
                </div>
            ))}
        </div>
    </div>
);

const TarjetaPagos = () => (
    <Card
        size="small"
        title={<span className="font-semibold">Pagos recientes</span>}
        extra={<RightOutlined style={{ color: '#8A94A3', fontSize: 12 }} />}
        className="!rounded-2xl !border-0 shadow-flotante"
    >
        <div className="divide-y divide-linea">
            {pagos.map((p) => (
                <div key={p.nombre} className="flex items-center gap-3 py-2.5 first:pt-1 last:pb-1">
                    <Avatar size={36} style={{ background: `${p.color}1A`, color: p.color, fontWeight: 700, fontSize: 13 }}>
                        {p.nombre.split(' ').map((x) => x[0]).join('')}
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-tinta leading-tight">{p.nombre}</p>
                        <p className="text-[11.5px] text-suave">{p.detalle}</p>
                    </div>
                    {p.valor ? (
                        <span className="text-[13px] font-bold text-verde">{p.valor}</span>
                    ) : (
                        <Tag color="gold" variant="filled" className="!m-0">Pendiente</Tag>
                    )}
                </div>
            ))}
        </div>
    </Card>
);

const TarjetaAsistencia = () => (
    <Card size="small" className="!rounded-2xl !border-0 shadow-flotante">
        <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-tinta">Asistencia de hoy</span>
            <Tag color="green" variant="filled" className="!m-0">En vivo</Tag>
        </div>
        <div className="flex items-center gap-4">
            <Progress
                type="circle"
                percent={86}
                size={88}
                strokeWidth={9}
                format={(p) => <span className="text-lg font-extrabold text-tinta">{p}%</span>}
            />
            <div>
                <p className="text-[13.5px] font-semibold text-tinta leading-tight">Salsa caleña</p>
                <p className="text-[12px] text-gris">18 de 21 alumnos</p>
                <p className="mt-1.5 text-[11.5px] text-suave flex items-center gap-1">
                    <QrcodeOutlined /> Marcaron con QR
                </p>
            </div>
        </div>
    </Card>
);

const flotar = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

function Hero() {
    return (
        <header className="relative pt-28 md:pt-32 overflow-hidden">
            {/* Fondo azul a todo el ancho con borde inferior irregular */}
            <div className="absolute inset-x-0 top-0 h-[760px] md:h-[720px] -z-10 overflow-hidden" aria-hidden="true">
                <div className="hero-banda absolute inset-0" />
                <div className="absolute -right-24 top-24 w-[520px] h-[180px] rounded-full bg-white/[0.06] rotate-[-32deg]" />
                <div className="absolute right-40 top-72 w-[420px] h-[140px] rounded-full bg-white/[0.05] rotate-[-32deg]" />
                <div className="absolute -left-32 top-48 w-[420px] h-[150px] rounded-full bg-white/[0.05] rotate-[-32deg]" />
                <Figura tipo="aro" color="#F2B33D" className="absolute left-[7%] top-[22%] w-5 h-5 hidden md:block" />
                <Figura tipo="aro" color="#FFFFFF" className="absolute right-[12%] top-[36%] w-4 h-4 opacity-70 hidden md:block" />
                <Figura tipo="triangulo" color="#F2B33D" className="absolute left-[9%] top-[62%] w-5 h-5 hidden md:block" />
                <Figura tipo="punto" color="#FFFFFF" className="absolute right-[24%] top-[18%] w-2.5 h-2.5 opacity-70" />
            </div>

            <div className="contenedor text-center">
                <motion.h1
                    {...flotar(0.08)}
                    className="mx-auto max-w-[1100px] t-hero !text-white"
                >
                    Menos tiempo administrando.
                    <br className="hidden sm:block" /> Más tiempo haciendo <span className="text-oro">crecer</span> tu academia.
                </motion.h1>
                <motion.p {...flotar(0.16)} className="mt-4 max-w-2xl mx-auto text-base md:text-[17px] text-white/80 leading-relaxed">
                    Passo organiza pagos, asistencia y el progreso de tus alumnos para que te enfoques en lo más
                    importante: transformar vidas a través del baile.
                </motion.p>
                <motion.p {...flotar(0.2)} className="mt-3 text-[13px] text-white/65">
                    Sin tarjeta de crédito o débito · Demo con todas las funciones Pro
                </motion.p>
                <motion.div {...flotar(0.24)} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <Button
                        size="large"
                        className="!bg-white !text-azul !border-white !font-bold hover:!bg-white/90"
                        onClick={() => abrir('registro')}
                    >
                        Prueba 30 días gratis
                    </Button>
                    <Button
                        type="text"
                        size="large"
                        onClick={() => abrir('video')}
                        icon={<PlayCircleFilled style={{ fontSize: 26, color: '#FFFFFF' }} />}
                        className="!font-semibold !text-white hover:!bg-white/10"
                    >
                        Ver cómo funciona
                    </Button>
                </motion.div>
            </div>

            {/* Escena: panel web a lo ancho, celular encima y tarjetas flotantes */}
            <div className="contenedor mt-10 md:mt-12">
                <div className="relative mx-auto max-w-[1180px]">
                    <NotaMano flecha="abajo-derecha" className="absolute -left-2 xl:-left-6 -top-44 hidden xl:block text-white">
                        Cobros claros,
                        <br />
                        sin cuadernos
                    </NotaMano>
                    <NotaMano flecha="abajo-izquierda" className="absolute -right-2 xl:-right-4 -top-44 hidden xl:block text-white">
                        Alumnos más
                        <br />
                        constantes
                    </NotaMano>

                    <motion.div {...flotar(0.3)} className="hidden md:block md:pr-16 lg:pl-8 lg:pr-32">
                        <VentanaWeb />
                    </motion.div>

                    {/* Celular: sobre el panel en escritorio, solo en móvil */}
                    <div className="md:absolute md:-right-4 lg:-right-2 md:-bottom-16 flex justify-center">
                        <div className="w-[280px] md:w-[300px] md:origin-bottom-right md:scale-[0.72] lg:scale-[0.8]">
                            <motion.div {...flotar(0.45)}>
                                <Telefono className="h-[600px]">
                                    <PantallaApp />
                                </Telefono>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div {...flotar(0.55)} className="absolute -left-2 xl:-left-10 top-[38%] w-[280px] hidden md:block">
                        <TarjetaPagos />
                    </motion.div>
                    <motion.div {...flotar(0.65)} className="absolute right-[24%] -top-12 w-[270px] hidden lg:block">
                        <TarjetaAsistencia />
                    </motion.div>
                </div>
            </div>

            {/* Franja de confianza */}
            <div className="contenedor pt-24 md:pt-28 pb-14">
                <p className="text-center t-card text-tinta">Hecho para academias de baile</p>
                <div className="mt-7 grid grid-cols-2 lg:flex lg:flex-nowrap lg:justify-between gap-y-5 gap-x-6 max-w-6xl mx-auto">
                    {confianza.map((c) => (
                        <div key={c.label} className="flex items-center gap-3">
                            <Avatar size={40} style={{ background: '#0A84FF', fontSize: 18, flexShrink: 0 }} icon={c.icon} />
                            <span className="text-[14.5px] font-medium text-tinta leading-snug lg:whitespace-nowrap">{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default withAntd(Hero);
