import React from 'react';
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from 'framer-motion';
import { Avatar, Tag } from 'antd';
import {
    HomeFilled,
    TeamOutlined,
    CalendarOutlined,
    WalletOutlined,
    QrcodeOutlined,
    BarChartOutlined,
    SettingOutlined,
    RiseOutlined,
    BellOutlined,
    SearchOutlined,
    CheckCircleFilled,
} from '@ant-design/icons';
import Contador, { pesos, useDestello } from './Contador';
import { demoInicial, type DemoEnVivo } from './demoEnVivo';

// Panel web de Passo dibujado con componentes (ilustrativo, datos de ejemplo)
const menu = [
    { icon: <HomeFilled />, label: 'Inicio', activo: true },
    { icon: <TeamOutlined />, label: 'Alumnos' },
    { icon: <CalendarOutlined />, label: 'Clases' },
    { icon: <WalletOutlined />, label: 'Pagos' },
    { icon: <QrcodeOutlined />, label: 'Asistencia' },
    { icon: <BarChartOutlined />, label: 'Reportes' },
    { icon: <SettingOutlined />, label: 'Configuración' },
];

const entero = (n: number) => String(Math.round(n));
const porciento = (n: number) => `${Math.round(n)}%`;

// Tarjeta de indicador: el número se desliza al nuevo valor y la tarjeta destella cuando cambia
const Kpi: React.FC<{ t: string; v: number; f: (n: number) => string; d: string }> = ({ t, v, f, d }) => {
    const ref = useDestello<HTMLDivElement>(v, { sombraBase: '0 1px 2px 0 rgb(0 0 0 / 0.05)' });
    return (
        <div ref={ref} className="rounded-xl bg-white p-3 border-l-[3px] border-azul shadow-sm">
            <p className="text-[10.5px] text-gris">{t}</p>
            <p className="mt-1 text-[16px] font-extrabold text-tinta tracking-tight whitespace-nowrap tabular-nums">
                <Contador valor={v} formato={f} retraso={0.5} />
            </p>
            <p className="text-[10px] font-semibold text-verde flex items-center gap-1">
                <RiseOutlined /> {d}
            </p>
        </div>
    );
};

const CURVA = 'M0 98 C 40 92, 60 70, 90 76 S 150 96, 180 70 S 240 52, 270 60 S 340 30, 400 16';

type DatosPanel = Pick<DemoEnVivo, 'alumnos' | 'ingresos' | 'asistenciaMes' | 'enRiesgo' | 'nPagos'>;

const VentanaWeb: React.FC<{ className?: string; datos?: DatosPanel }> = ({ className = '', datos = demoInicial }) => {
    const reducir = useReducedMotion();
    // Con movimiento reducido el gráfico aparece ya dibujado
    const entrar = (desde: TargetAndTransition, hasta: TargetAndTransition, transition: Transition) =>
        reducir ? { initial: false as const, animate: hasta } : { initial: desde, animate: hasta, transition };

    return (
        <div className={`rounded-3xl bg-white shadow-[0_40px_80px_-30px_rgba(29,36,51,0.45)] overflow-hidden border border-white ${className}`} aria-hidden="true">
            {/* barra del navegador */}
            <div className="flex items-center gap-3 px-4 h-10 bg-[#F1F4F9] border-b border-linea">
                <span className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </span>
                <span className="mx-auto w-64 max-w-[50%] rounded-md bg-white text-[11px] text-suave text-center py-1">app.passodance.com</span>
            </div>

            <div className="flex">
                {/* menú lateral */}
                <div className="hidden lg:block w-[190px] shrink-0 border-r border-linea px-3 py-5">
                    <p className="px-3 text-[15px] font-extrabold tracking-tight text-tinta mb-5">Passo</p>
                    <div className="space-y-1">
                        {menu.map((m) => (
                            <div
                                key={m.label}
                                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12.5px] ${
                                    m.activo ? 'bg-azul-suave text-azul font-semibold' : 'text-gris'
                                }`}
                            >
                                {m.icon}
                                {m.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* contenido */}
                <div className="flex-1 min-w-0 bg-fondo p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[17px] font-bold text-tinta leading-tight">Buenas tardes, Laura</p>
                            <p className="text-[11.5px] text-gris">Academia Ritmo Caleño · sábado 22 de noviembre</p>
                        </div>
                        <div className="flex items-center gap-3 text-gris">
                            <span className="hidden md:flex items-center gap-2 rounded-lg bg-white border border-linea px-3 py-1.5 text-[11px] text-suave w-40">
                                <SearchOutlined /> Buscar alumno
                            </span>
                            <BellOutlined />
                            <Avatar size={28} style={{ background: '#0A84FF', fontSize: 12 }}>L</Avatar>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-3">
                        <Kpi t="Alumnos activos" v={datos.alumnos} f={entero} d="+4%" />
                        <Kpi t="Clases de hoy" v={8} f={entero} d="2 en curso" />
                        <Kpi t="Ingresos del mes" v={datos.ingresos} f={pesos} d="+12%" />
                        <Kpi t="Asistencia" v={datos.asistenciaMes} f={porciento} d="+3%" />
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-3">
                        <div className="col-span-2 rounded-xl bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-[12.5px] font-semibold text-tinta">Ingresos de los últimos 6 meses</p>
                                <Tag color="success" variant="filled" className="!m-0 !text-[10px]">+12%</Tag>
                            </div>
                            <svg viewBox="0 0 400 130" className="mt-3 w-full h-[96px]" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="area-ingresos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {[30, 65, 100].map((y) => (
                                    <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#EDF1F6" strokeWidth="1" />
                                ))}
                                {/* La línea se dibuja de izquierda a derecha, luego aparece el área y el punto final */}
                                <motion.path
                                    d={`${CURVA} L400 130 L0 130Z`}
                                    fill="url(#area-ingresos)"
                                    {...entrar({ opacity: 0 }, { opacity: 1 }, { duration: 0.8, delay: 1.6 })}
                                />
                                <motion.path
                                    d={CURVA}
                                    fill="none"
                                    stroke="#0A84FF"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    {...entrar({ pathLength: 0 }, { pathLength: 1 }, { duration: 1.4, delay: 0.5, ease: 'easeInOut' })}
                                />
                                <motion.circle
                                    cx="400"
                                    cy="16"
                                    r="4"
                                    fill="#0A84FF"
                                    style={{ transformOrigin: '400px 16px' }}
                                    {...entrar({ scale: 0 }, { scale: 1 }, { type: 'spring', stiffness: 400, damping: 15, delay: 1.9 })}
                                />
                                {/* Cada pago nuevo hace una onda en el último punto */}
                                {datos.nPagos > 0 && !reducir && (
                                    <motion.circle
                                        key={`onda-${datos.nPagos}`}
                                        cx="400"
                                        cy="16"
                                        fill="none"
                                        stroke="#0A84FF"
                                        strokeWidth="2"
                                        initial={{ r: 4, opacity: 0.7 }}
                                        animate={{ r: 22, opacity: 0 }}
                                        transition={{ duration: 1.2, ease: 'easeOut' }}
                                    />
                                )}
                            </svg>
                            <div className="mt-1 flex justify-between text-[10px] text-suave">
                                {['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'].map((m) => (
                                    <span key={m}>{m}</span>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            <p className="text-[12.5px] font-semibold text-tinta">Alumnos en riesgo</p>
                            <div className="mt-3 space-y-3">
                                {datos.enRiesgo.map((r) => {
                                    const color = r.volvio ? '#22A06B' : r.color;
                                    return (
                                        <div key={r.n} className="flex items-center gap-2.5">
                                            <Avatar
                                                size={28}
                                                style={{ background: `${color}22`, color, fontSize: 11, fontWeight: 700, transition: 'all .4s' }}
                                            >
                                                {r.n.split(' ').map((x) => x[0]).join('')}
                                            </Avatar>
                                            <div className="min-w-0">
                                                <p className="text-[11.5px] font-semibold text-tinta leading-tight">{r.n}</p>
                                                <motion.p
                                                    key={r.c}
                                                    initial={reducir ? false : { opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`text-[10px] truncate flex items-center gap-1 ${r.volvio ? 'text-verde font-semibold' : 'text-suave'}`}
                                                >
                                                    {r.volvio && <CheckCircleFilled />} {r.c}
                                                </motion.p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VentanaWeb;
