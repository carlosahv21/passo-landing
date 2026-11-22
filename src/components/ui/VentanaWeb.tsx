import React from 'react';
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
} from '@ant-design/icons';

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

const kpis = [
    { t: 'Alumnos activos', v: '132', d: '+4%' },
    { t: 'Clases de hoy', v: '8', d: '2 en curso' },
    { t: 'Ingresos del mes', v: '$ 8.450.000', d: '+12%' },
    { t: 'Asistencia', v: '87%', d: '+3%' },
];

const riesgo = [
    { n: 'Sofía Herrera', c: 'Sin asistir hace 12 días', color: '#F2B33D' },
    { n: 'Mateo Ruiz', c: 'Pago vencido', color: '#FF7A45' },
    { n: 'Laura Peña', c: 'Asistencia bajando', color: '#0A84FF' },
];

const VentanaWeb: React.FC<{ className?: string }> = ({ className = '' }) => (
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
                    {kpis.map((k) => (
                        <div key={k.t} className="rounded-xl bg-white p-3 border-l-[3px] border-azul shadow-sm">
                            <p className="text-[10.5px] text-gris">{k.t}</p>
                            <p className="mt-1 text-[16px] font-extrabold text-tinta tracking-tight whitespace-nowrap">{k.v}</p>
                            <p className="text-[10px] font-semibold text-verde flex items-center gap-1">
                                <RiseOutlined /> {k.d}
                            </p>
                        </div>
                    ))}
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
                            <path d="M0 98 C 40 92, 60 70, 90 76 S 150 96, 180 70 S 240 52, 270 60 S 340 30, 400 16 L400 130 L0 130Z" fill="url(#area-ingresos)" />
                            <path d="M0 98 C 40 92, 60 70, 90 76 S 150 96, 180 70 S 240 52, 270 60 S 340 30, 400 16" fill="none" stroke="#0A84FF" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="400" cy="16" r="4" fill="#0A84FF" />
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
                            {riesgo.map((r) => (
                                <div key={r.n} className="flex items-center gap-2.5">
                                    <Avatar size={28} style={{ background: `${r.color}22`, color: r.color, fontSize: 11, fontWeight: 700 }}>
                                        {r.n.split(' ').map((x) => x[0]).join('')}
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="text-[11.5px] font-semibold text-tinta leading-tight">{r.n}</p>
                                        <p className="text-[10px] text-suave truncate">{r.c}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default VentanaWeb;
