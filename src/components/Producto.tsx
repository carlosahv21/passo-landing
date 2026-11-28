import React from 'react';
import { Avatar, Card, Progress, Tag } from 'antd';
import {
    WalletOutlined,
    QrcodeOutlined,
    BarChartOutlined,
    CheckCircleFilled,
    RiseOutlined,
} from '@ant-design/icons';
import { withAntd } from '../lib/antd';
import SeccionTitulo from './ui/SeccionTitulo';
import Formas from './ui/Formas';
import NotaMano from './ui/NotaMano';
import Reveal from './ui/Reveal';
import CodigoQR from './ui/CodigoQR';

// Visuales de ejemplo dentro de cada tarjeta (ilustrativos)
const VisualPagos = () => (
    <div className="space-y-2.5">
        {[
            { n: 'Valeria Gómez', p: 'Mensualidad', estado: <Tag color="success" variant="filled">Pagado</Tag> },
            { n: 'Andrés Ríos', p: 'Paquete 8 clases', estado: <Tag color="success" variant="filled">Pagado</Tag> },
            { n: 'Camila Torres', p: 'Mensualidad', estado: <Tag color="gold" variant="filled">Pendiente</Tag> },
        ].map((f) => (
            <div key={f.n} className="flex items-center justify-between rounded-xl bg-fondo px-4 py-3">
                <div>
                    <p className="text-sm font-semibold text-tinta">{f.n}</p>
                    <p className="text-xs text-suave">{f.p}</p>
                </div>
                {f.estado}
            </div>
        ))}
    </div>
);

const VisualAsistencia = () => (
    <div>
        {/* El alumno muestra su QR al llegar y queda marcado en la clase */}
        <div className="flex items-center gap-4 rounded-2xl bg-fondo p-3 mb-5">
            <CodigoQR className="w-[72px] h-[72px] shrink-0 !p-1.5" />
            <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                <div>
                    <p className="text-xs text-suave">QR de Valeria Gómez</p>
                    <p className="text-sm font-semibold text-tinta">Escaneado · 5:58 p. m.</p>
                </div>
                <Tag color="success" variant="filled" icon={<CheckCircleFilled />} className="!m-0 self-start sm:self-auto">
                    En la lista
                </Tag>
            </div>
        </div>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-semibold text-tinta">Salsa caleña · 6:00 p. m.</p>
                <p className="text-xs text-suave">Marcaron con QR</p>
            </div>
            <Avatar.Group max={{ count: 4 }} size={30}>
                {['VG', 'AR', 'CT', 'LM', 'JP', 'SR'].map((x, i) => (
                    <Avatar key={x} style={{ background: ['#0A84FF', '#22A06B', '#F2B33D', '#4DA3FF', '#722ED1', '#0A84FF'][i], fontSize: 11 }}>
                        {x}
                    </Avatar>
                ))}
            </Avatar.Group>
        </div>
        <Progress percent={86} className="!mt-4 !mb-0" format={() => '18 de 21'} />
        <div className="mt-5 pt-4 border-t border-linea flex items-center justify-between">
            <div>
                <p className="text-sm font-semibold text-tinta">Bachata · 7:30 p. m.</p>
                <p className="text-xs text-suave">Empieza en 40 min</p>
            </div>
            <Tag color="blue" variant="filled" className="!m-0">16 inscritos</Tag>
        </div>
    </div>
);

const meses = [
    { m: 'Jun', v: 52 },
    { m: 'Jul', v: 60 },
    { m: 'Ago', v: 58 },
    { m: 'Sep', v: 71 },
    { m: 'Oct', v: 78 },
    { m: 'Nov', v: 92 },
];

const VisualReportes = () => (
    <div>
        <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-tinta">Ingresos por mes</p>
            <Tag color="success" variant="filled" icon={<RiseOutlined />}>+12%</Tag>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3 h-28" aria-hidden="true">
            {meses.map((x, i) => (
                <div key={x.m} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                        className={`w-full rounded-md ${i === meses.length - 1 ? 'bg-azul' : 'bg-azul-suave'}`}
                        style={{ height: `${x.v}%` }}
                    />
                    <span className="text-[11px] text-suave">{x.m}</span>
                </div>
            ))}
        </div>
    </div>
);

const capacidades = ['Profesores', 'Clases y horarios', 'Eventos', 'Logros y rachas', 'App móvil', 'Planes y paquetes'];

const filas = [
    {
        icon: <WalletOutlined />,
        color: '#F2B33D',
        titulo: 'Cobros y pagos al día',
        texto: 'Registra pagos, planes y paquetes, y mira de un vistazo quién está al día y quién tiene un pago pendiente.',
        puntos: [
            { t: 'Planes y paquetes', d: 'Mensualidad o paquete de clases, cada uno con su precio y vigencia.' },
            { t: 'Pendientes a la vista', d: 'Sabes quién debe y desde cuándo, sin revisar cuadernos.' },
        ],
        visual: <VisualPagos />,
        mini: { titulo: 'Recaudado este mes', valor: '$ 8.450.000' },
        forma: 0 as const,
    },
    {
        icon: <QrcodeOutlined />,
        color: '#0A84FF',
        titulo: 'Asistencia con QR',
        texto: 'Tus alumnos marcan con su código desde la app y tú ves quién vino a cada clase.',
        puntos: [
            { t: 'Desde su celular', d: 'Cada alumno tiene su código QR en la app de Passo.' },
            { t: 'En tiempo real', d: 'La lista de la clase se llena mientras van llegando.' },
        ],
        visual: <VisualAsistencia />,
        mini: { titulo: 'Asistencia del mes', valor: '87%' },
        forma: 1 as const,
    },
    {
        icon: <BarChartOutlined />,
        color: '#22A06B',
        titulo: 'Reportes que se entienden',
        texto: 'Ingresos, asistencia y alumnos en riesgo en gráficos claros, para decidir con datos y no a ojo.',
        puntos: [
            { t: 'Alumnos en riesgo', d: 'Detecta a quién dejó de venir antes de perderlo.' },
            { t: 'Reportes a tu medida', d: 'Cruza pagos, asistencia y alumnos según lo que necesites ver.' },
        ],
        visual: <VisualReportes />,
        mini: { titulo: 'Ingresos vs. mes anterior', valor: '+12%' },
        forma: 2 as const,
    },
];

function Producto() {
    return (
        <section className="seccion overflow-hidden" id="producto">
            <div className="contenedor">
                <SeccionTitulo
                    eyebrow="Todo tu negocio en un solo lugar"
                    titulo="Gestiona, analiza y haz"
                    resaltado="crecer tu academia"
                    bajada="Passo centraliza la operación completa de tu academia en un solo panel, en la web y en el celular."
                    unaLinea
                />

                <div className="mt-14 md:mt-20 space-y-24 md:space-y-32">
                    {filas.map((f, i) => {
                        const visualIzquierda = i % 2 === 1;
                        return (
                            <div key={f.titulo} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                <Reveal className={visualIzquierda ? 'lg:order-2' : ''}>
                                    <Avatar size={52} style={{ background: `${f.color}1F`, color: f.color, fontSize: 24 }} icon={f.icon} />
                                    <h3 className="mt-5 t-h3">{f.titulo}</h3>
                                    <p className="mt-3 t-lead text-gris max-w-xl">{f.texto}</p>
                                    <div className="mt-7 space-y-4">
                                        {f.puntos.map((p) => (
                                            <div key={p.t} className="flex gap-3">
                                                <CheckCircleFilled style={{ color: '#0A84FF', fontSize: 20, marginTop: 2 }} />
                                                <div>
                                                    <p className="font-semibold text-tinta">{p.t}</p>
                                                    <p className="text-gris">{p.d}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Reveal>

                                <Reveal delay={0.1} className={`relative ${visualIzquierda ? 'lg:order-1' : ''}`}>
                                    <Formas variante={f.forma} color={f.color === '#F2B33D' ? '#0A84FF' : f.color} className="-inset-y-16 md:-inset-y-20" />
                                    {i === 1 && (
                                        <NotaMano flecha="abajo-derecha" className="absolute -top-28 -left-6 z-10 hidden xl:block">
                                            Escanean su QR
                                            <br />
                                            y quedan en la lista
                                        </NotaMano>
                                    )}
                                    <Card variant="borderless" className="relative !rounded-3xl shadow-flotante max-w-[560px] mx-auto">
                                        {f.visual}
                                    </Card>
                                    <Card
                                        size="small"
                                        variant="borderless"
                                        className={`!absolute ${visualIzquierda ? '-right-2 md:-right-4' : '-left-2 md:-left-4'} -bottom-16 w-[200px] !rounded-2xl shadow-flotante hidden sm:block`}
                                    >
                                        <p className="text-xs text-gris">{f.mini.titulo}</p>
                                        <p className="text-[22px] font-extrabold tracking-tight text-tinta">{f.mini.valor}</p>
                                    </Card>
                                </Reveal>
                            </div>
                        );
                    })}
                </div>

                <Reveal className="mt-24 flex flex-wrap items-center justify-center gap-2.5">
                    <span className="mr-2 font-semibold text-tinta">Y además:</span>
                    {capacidades.map((c) => (
                        <span key={c} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-tinta shadow-sm">
                            <CheckCircleFilled style={{ color: '#0A84FF' }} />
                            {c}
                        </span>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}

export default withAntd(Producto);
