import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
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
    UserAddOutlined,
} from '@ant-design/icons';
import { useModalStore } from '../store/modalStore';
import { withAntd } from '../lib/antd';
import Telefono from './ui/Telefono';
import NotaMano from './ui/NotaMano';
import VentanaWeb from './ui/VentanaWeb';
import Contador, { pesos, useContador, useDestello } from './ui/Contador';
import { useDemoEnVivo, type Aviso, type Clase, type DemoEnVivo, type Pago } from './ui/demoEnVivo';
import { Figura } from './ui/Mancha';

const abrir = (m: 'registro' | 'video') => useModalStore.getState().openModal(m);

// Datos de ejemplo de la escena (ilustrativos). Se mueven solos: ver ui/demoEnVivo.ts
const montoPago = (n: number) => `+$${n.toLocaleString('es-CO')}`;

const accesos = [
    { icon: <QrcodeOutlined />, label: 'Asistencia' },
    { icon: <DollarOutlined />, label: 'Cobrar' },
    { icon: <TeamOutlined />, label: 'Alumnos' },
    { icon: <AppstoreOutlined />, label: 'Más' },
];

const confianza = [
    { icon: <SafetyCertificateOutlined />, label: 'Tus datos seguros en la nube' },
    { icon: <ThunderboltOutlined />, label: 'Fácil desde el primer día' },
    { icon: <MobileOutlined />, label: 'Web, iOS y Android' },
    { icon: <CustomerServiceOutlined />, label: 'Soporte en español' },
];

const iconoAviso: Record<Aviso['tipo'], { icon: React.ReactNode; color: string }> = {
    pago: { icon: <DollarOutlined />, color: '#22A06B' },
    asistencia: { icon: <QrcodeOutlined />, color: '#0A84FF' },
    inscripcion: { icon: <UserAddOutlined />, color: '#F2B33D' },
};

// Notificación que baja desde arriba del celular con cada evento y se va sola
const NotificacionApp: React.FC<{ aviso: Aviso | null }> = ({ aviso }) => {
    const [visible, setVisible] = useState<Aviso | null>(null);

    useEffect(() => {
        if (!aviso) return;
        setVisible(aviso);
        const t = window.setTimeout(() => setVisible(null), 1700);
        return () => window.clearTimeout(t);
    }, [aviso]);

    return (
        <div className="absolute inset-x-3 top-1 z-10 pointer-events-none">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        key={visible.id}
                        initial={{ opacity: 0, y: -24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -16, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        className="flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur px-3 py-2.5 shadow-[0_10px_30px_-8px_rgba(29,36,51,0.35)] border border-linea"
                    >
                        <span
                            className="w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-white text-[15px]"
                            style={{ background: iconoAviso[visible.tipo].color }}
                        >
                            {iconoAviso[visible.tipo].icon}
                        </span>
                        <div className="min-w-0">
                            <p className="text-[12px] font-bold text-tinta leading-tight truncate">{visible.titulo}</p>
                            <p className="text-[10.5px] text-gris truncate">{visible.detalle}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Cupo de una clase en el celular: destella en verde cuando alguien llega
const CupoClase: React.FC<{ c: Clase }> = ({ c }) => {
    const ref = useDestello<HTMLDivElement>(c.presentes, { color: 'rgba(10,132,255,0.18)' });
    const llena = c.presentes >= c.total;
    return (
        <div ref={ref} className="flex items-center justify-between rounded-xl border border-linea px-3 py-2.5 bg-white">
            <div>
                <p className="text-[12.5px] font-semibold text-tinta">{c.nombre}</p>
                <p className="text-[10.5px] text-gris">{c.hora}</p>
            </div>
            <Tag color={llena ? 'green' : 'blue'} variant="filled" className="!m-0 !text-[11px] tabular-nums">
                {c.presentes}/{c.total}
            </Tag>
        </div>
    );
};

const PantallaApp: React.FC<{ demo: DemoEnVivo }> = ({ demo }) => {
    const saldo = useDestello<HTMLDivElement>(demo.ingresos, {
        color: 'rgba(77,163,255,0.45)',
        sombraBase: '0 12px 24px -10px rgba(10,132,255,0.6)',
    });
    return (
        <div className="relative px-5 pt-3 pb-6">
            <NotificacionApp aviso={demo.aviso} />
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[17px] font-bold text-tinta leading-tight">¡Hola, Laura!</p>
                    <p className="text-[12px] text-gris">Así va tu academia hoy</p>
                </div>
                <Avatar style={{ background: '#E8F3FF', color: '#0A84FF', fontWeight: 700 }}>L</Avatar>
            </div>

            <div ref={saldo} className="mt-4 rounded-2xl bg-gradient-to-br from-azul to-cielo p-4 text-white shadow-[0_12px_24px_-10px_rgba(10,132,255,0.6)]">
                <p className="text-[12px] text-white/80">Ingresos del mes</p>
                <p className="text-[26px] font-extrabold tracking-tight leading-tight tabular-nums">
                    <Contador valor={demo.ingresos} formato={pesos} retraso={0.8} />
                </p>
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
                {demo.clases.map((c) => (
                    <CupoClase key={c.nombre} c={c} />
                ))}
            </div>
        </div>
    );
};

const TarjetaPagos: React.FC<{ pagos: Pago[] }> = ({ pagos }) => (
    <Card
        size="small"
        title={<span className="font-semibold">Pagos recientes</span>}
        extra={<RightOutlined style={{ color: '#8A94A3', fontSize: 12 }} />}
        className="!rounded-2xl !border-0 shadow-flotante"
    >
        <div className="divide-y divide-linea">
            <AnimatePresence initial={false}>
                {pagos.map((p) => (
                    <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            className="flex items-center gap-3 py-2.5 px-1 -mx-1 rounded-lg"
                            initial={p.nuevo ? { backgroundColor: 'rgba(34,160,107,0.14)' } : false}
                            animate={{ backgroundColor: 'rgba(34,160,107,0)' }}
                            transition={{ duration: 1.6, delay: 0.4 }}
                        >
                            <Avatar size={36} style={{ background: `${p.color}1A`, color: p.color, fontWeight: 700, fontSize: 13 }}>
                                {p.nombre.split(' ').map((x) => x[0]).join('')}
                            </Avatar>
                            <div className="min-w-0 flex-1">
                                <p className="text-[13px] font-semibold text-tinta leading-tight">{p.nombre}</p>
                                <p className="text-[11.5px] text-suave">{p.detalle}</p>
                            </div>
                            {p.monto ? (
                                <span className="text-[13px] font-bold text-verde">{montoPago(p.monto)}</span>
                            ) : (
                                <Tag color="gold" variant="filled" className="!m-0">Pendiente</Tag>
                            )}
                        </motion.div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </Card>
);

// Asistencia de la clase en curso: el aro y el conteo suben con cada llegada; al llenarse pasa a la siguiente clase
const TarjetaAsistencia: React.FC<{ clase: Clase; ultimaLlegada: string | null }> = ({ clase, ultimaLlegada }) => {
    const reducir = useReducedMotion();
    const porcentaje = Math.round(useContador((clase.presentes / clase.total) * 100, { retraso: 1, duracion: 1.8 }));
    const presentes = Math.round(useContador(clase.presentes, { retraso: 1, duracion: 1.8 }));
    const entrar = reducir ? false : { opacity: 0, y: 6 };
    return (
        <Card size="small" className="!rounded-2xl !border-0 shadow-flotante">
            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-tinta">Asistencia de hoy</span>
                <Tag color="green" variant="filled" className="!m-0">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="relative flex w-1.5 h-1.5">
                            {!reducir && <span className="absolute inline-flex h-full w-full rounded-full bg-verde opacity-75 animate-ping" />}
                            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-verde" />
                        </span>
                        En vivo
                    </span>
                </Tag>
            </div>
            <div className="flex items-center gap-4">
                <Progress
                    type="circle"
                    percent={porcentaje}
                    size={88}
                    strokeWidth={9}
                    strokeColor={clase.presentes >= clase.total ? '#22A06B' : undefined}
                    format={(p) => <span className="text-lg font-extrabold text-tinta tabular-nums">{p}%</span>}
                />
                <div className="min-w-0">
                    <motion.p key={clase.nombre} initial={entrar} animate={{ opacity: 1, y: 0 }} className="text-[13.5px] font-semibold text-tinta leading-tight">
                        {clase.nombre}
                    </motion.p>
                    <p className="text-[12px] text-gris tabular-nums">
                        {presentes} de {clase.total} alumnos
                    </p>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                            key={ultimaLlegada ?? 'inicio'}
                            initial={entrar}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reducir ? undefined : { opacity: 0, y: -6 }}
                            transition={{ duration: 0.3 }}
                            className={`mt-1.5 text-[11.5px] flex items-center gap-1 ${ultimaLlegada ? 'text-azul font-medium' : 'text-suave'}`}
                        >
                            <QrcodeOutlined /> {ultimaLlegada ? `${ultimaLlegada.split(' ')[0]} acaba de llegar` : 'Marcaron con QR'}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </Card>
    );
};

const flotar = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

function Hero() {
    const reducir = useReducedMotion();
    const demo = useDemoEnVivo();
    const { scrollY } = useScroll();
    const avance = useSpring(useTransform(scrollY, [0, 420], [0, 1], { clamp: true }), {
        stiffness: 140,
        damping: 26,
        mass: 0.4,
    });
    const escala = useTransform(avance, [0, 1], [0.9, 1]);
    const inclinacion = useTransform(avance, [0, 1], [12, 0]);
    const zoom = reducir
        ? undefined
        : { scale: escala, rotateX: inclinacion, transformPerspective: 1400, transformOrigin: '50% 0%' };

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
            <div className="contenedor mt-10 md:mt-20">
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

                    {/* Zoom con scroll: envuelve panel, celular y tarjetas (las notas a mano quedan fuera) */}
                    <motion.div className="relative" style={zoom}>
                        <motion.div {...flotar(0.3)} className="hidden md:block md:pr-24 lg:pl-20 lg:pr-44">
                            <VentanaWeb datos={demo} />
                        </motion.div>

                        {/* Celular: sobre el panel en escritorio, solo en móvil */}
                        <div className="md:absolute md:-right-4 lg:-right-10 xl:-right-14 md:-bottom-16 flex justify-center">
                            <div className="w-[280px] md:w-[300px] md:origin-bottom-right md:scale-[0.72] lg:scale-[0.8]">
                                <motion.div {...flotar(0.45)}>
                                    <Telefono className="h-[600px]">
                                        <PantallaApp demo={demo} />
                                    </Telefono>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div {...flotar(0.55)} className="absolute -left-2 lg:-left-8 xl:-left-14 top-[42%] w-[260px] hidden md:block">
                            <TarjetaPagos pagos={demo.pagos} />
                        </motion.div>
                        <motion.div {...flotar(0.65)} className="absolute left-[30%] -bottom-14 w-[270px] hidden lg:block">
                            <TarjetaAsistencia clase={demo.clases[demo.claseActual]} ultimaLlegada={demo.ultimaLlegada} />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Franja de confianza */}
            <div className="contenedor pt-24 md:pt-32 pb-14">
                <p className="text-center t-card text-tinta">Hecho para academias de baile</p>
                <div className="mt-7 grid grid-cols-2 xl:flex xl:flex-nowrap xl:justify-between gap-y-5 gap-x-6 max-w-6xl mx-auto">
                    {confianza.map((c) => (
                        <div key={c.label} className="flex items-center gap-3">
                            <Avatar size={40} style={{ background: '#0A84FF', fontSize: 18, flexShrink: 0 }} icon={c.icon} />
                            <span className="text-[14.5px] font-medium text-tinta leading-snug xl:whitespace-nowrap">{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default withAntd(Hero);
