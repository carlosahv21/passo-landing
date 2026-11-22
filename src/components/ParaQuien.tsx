import React from 'react';
import { Avatar, Card, Progress, Tag } from 'antd';
import { ShopOutlined, ReadOutlined, TeamOutlined, StarFilled, FireFilled } from '@ant-design/icons';
import { withAntd } from '../lib/antd';
import SeccionTitulo from './ui/SeccionTitulo';
import Reveal from './ui/Reveal';
import Formas from './ui/Formas';

// Ilustraciones hechas con componentes (datos de ejemplo). Cada una ocupa todo
// el espacio de la portada de la tarjeta, con un margen para que asomen las formas.
const lienzo = 'h-full w-full rounded-2xl bg-white p-5 shadow-flotante flex flex-col';

const VisualAcademia = () => (
    <div className={lienzo}>
        <div className="flex items-center justify-between">
            <p className="text-[14px] font-bold text-tinta">Academia Ritmo Caleño</p>
            <Tag color="success" variant="filled" className="!m-0 !text-[11px]">Al día</Tag>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
            {[
                { t: 'Alumnos', v: '132' },
                { t: 'Clases', v: '24' },
                { t: 'Profes', v: '6' },
            ].map((k) => (
                <div key={k.t} className="rounded-xl bg-fondo px-3 py-2">
                    <p className="text-[11px] text-gris">{k.t}</p>
                    <p className="text-[19px] font-extrabold text-tinta leading-tight">{k.v}</p>
                </div>
            ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px]">
            <span className="text-gris">Ingresos últimos 6 meses</span>
            <span className="font-bold text-verde">+18%</span>
        </div>
        <div className="mt-2 flex-1 min-h-[48px] flex items-end gap-2" aria-hidden="true">
            {[40, 55, 48, 66, 72, 92].map((h, i) => (
                <span key={i} className={`flex-1 rounded-md ${i === 5 ? 'bg-azul' : 'bg-azul-suave'}`} style={{ height: `${h}%` }} />
            ))}
        </div>
        <div className="mt-1.5 flex gap-2 text-[10px] text-suave" aria-hidden="true">
            {['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'].map((m) => (
                <span key={m} className="flex-1 text-center">{m}</span>
            ))}
        </div>
    </div>
);

const VisualProfesor = () => (
    <div className={lienzo}>
        <div className="flex items-center gap-3">
            <Avatar size={46} style={{ background: '#722ED1', fontWeight: 700 }}>DM</Avatar>
            <div className="flex-1">
                <p className="text-[14.5px] font-bold text-tinta leading-tight">Daniel Mejía</p>
                <p className="text-[11.5px] text-gris">Salsa caleña · Bachata</p>
            </div>
            <Tag color="processing" variant="filled" className="!m-0 !text-[11px]">Profesor</Tag>
        </div>
        <div className="mt-3 flex items-center gap-1 text-oro text-[14px]">
            {[0, 1, 2, 3, 4].map((i) => (
                <StarFilled key={i} />
            ))}
            <span className="ml-1.5 text-[12px] font-semibold text-tinta">4,9</span>
            <span className="text-[11.5px] text-suave">· 38 reseñas</span>
        </div>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-suave">Sus clases</p>
        <div className="mt-2 flex-1 flex flex-col justify-between gap-1.5">
            {[
                { c: 'Salsa caleña', h: 'Lun y Mié · 6:00 p. m.' },
                { c: 'Bachata', h: 'Vie · 7:30 p. m.' },
                { c: 'Salsa en línea', h: 'Sáb · 10:00 a. m.' },
            ].map((x) => (
                <div key={x.c} className="flex flex-1 items-center justify-between rounded-lg bg-fondo px-3 py-1.5">
                    <span className="text-[12px] font-semibold text-tinta">{x.c}</span>
                    <span className="text-[11px] text-gris">{x.h}</span>
                </div>
            ))}
        </div>
    </div>
);

const VisualAlumno = () => (
    <div className={lienzo}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <Avatar size={42} style={{ background: '#E8F3FF', color: '#0A84FF', fontWeight: 700 }}>V</Avatar>
                <div>
                    <p className="text-[14px] font-bold text-tinta leading-tight">Valeria</p>
                    <p className="text-[11.5px] text-gris">Nivel intermedio</p>
                </div>
            </div>
            <span className="flex items-center gap-1 text-[14px] font-bold text-tinta">
                <FireFilled style={{ color: '#F2B33D' }} /> 12
            </span>
        </div>
        <div className="mt-3 flex flex-1 gap-2">
            {[
                { c: '#CD7F32', t: '1.ª clase' },
                { c: '#A8B4C4', t: 'Racha 3' },
                { c: '#F2B33D', t: 'Dedicada' },
            ].map((l) => (
                <div key={l.t} className="flex-1 rounded-xl bg-fondo py-2 flex flex-col items-center justify-center">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[14px]" style={{ background: l.c }}>
                        <StarFilled />
                    </span>
                    <p className="mt-1.5 text-[11px] font-semibold text-tinta">{l.t}</p>
                </div>
            ))}
        </div>
        <div className="mt-3">
            <div className="flex justify-between text-[11px]">
                <span className="text-gris">Progreso del nivel</span>
                <span className="font-bold text-azul">75%</span>
            </div>
            <Progress percent={75} showInfo={false} size="small" className="!m-0" />
        </div>
        <div className="mt-2 flex items-center justify-between rounded-lg bg-azul-suave/60 px-3 py-2">
            <span className="text-[11px] text-gris">Próxima clase</span>
            <span className="text-[11.5px] font-semibold text-tinta">Salsa caleña · Hoy 6:00 p. m.</span>
        </div>
    </div>
);

const perfiles = [
    {
        icon: <ShopOutlined />,
        title: 'Academias',
        description: 'Organiza tu operación, toma mejores decisiones y enfócate en crecer.',
        visual: <VisualAcademia />,
    },
    {
        icon: <ReadOutlined />,
        title: 'Profesores',
        description: 'Comparte tu conocimiento, recibe reconocimiento y haz crecer tu reputación.',
        visual: <VisualProfesor />,
    },
    {
        icon: <TeamOutlined />,
        title: 'Alumnos',
        description: 'Sigue tu progreso, mantente motivado y conéctate con tu comunidad.',
        visual: <VisualAlumno />,
    },
];

const Portada: React.FC<{ variante: 0 | 1 | 2; children: React.ReactNode }> = ({ variante, children }) => (
    <div className="relative aspect-[4/3] overflow-hidden bg-azul-suave/50 p-5">
        <Formas variante={variante} />
        <div className="relative h-full">{children}</div>
    </div>
);

function ParaQuien() {
    return (
        <section className="seccion seccion-blanca" id="para-quien">
            <div className="contenedor">
                <SeccionTitulo
                    eyebrow="Una plataforma para todos"
                    titulo="Crece toda la"
                    resaltado="comunidad de baile"
                    bajada="Passo conecta a la academia, a sus profesores y a sus alumnos en un mismo lugar."
                    unaLinea
                />
                <div className="mt-14 grid md:grid-cols-3 gap-6">
                    {perfiles.map((p, i) => (
                        <Reveal key={p.title} delay={i * 0.08}>
                            <Card
                                variant="borderless"
                                className="h-full !rounded-3xl !bg-fondo overflow-hidden"
                                cover={<Portada variante={(i % 3) as 0 | 1 | 2}>{p.visual}</Portada>}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar size={40} style={{ background: '#0A84FF', fontSize: 18 }} icon={p.icon} />
                                    <h3 className="t-card">{p.title}</h3>
                                </div>
                                <p className="mt-3 text-gris leading-relaxed">{p.description}</p>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default withAntd(ParaQuien);
