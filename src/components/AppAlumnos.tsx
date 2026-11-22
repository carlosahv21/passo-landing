import React from 'react';
import { Avatar, Button, Card, Progress } from 'antd';
import {
    QrcodeOutlined,
    HistoryOutlined,
    TrophyOutlined,
    CreditCardOutlined,
    NotificationOutlined,
    FireFilled,
    StarFilled,
} from '@ant-design/icons';
import { withAntd } from '../lib/antd';
import SeccionTitulo from './ui/SeccionTitulo';
import Reveal from './ui/Reveal';
import Telefono from './ui/Telefono';
import Formas from './ui/Formas';
import NotaMano from './ui/NotaMano';

const features = [
    { icon: <QrcodeOutlined />, label: 'Asistencia con QR' },
    { icon: <HistoryOutlined />, label: 'Historial y progreso' },
    { icon: <TrophyOutlined />, label: 'Logros y rachas' },
    { icon: <CreditCardOutlined />, label: 'Pagos y planes' },
    { icon: <NotificationOutlined />, label: 'Novedades y eventos' },
];

// Patrón decorativo tipo QR (7×7)
const qr = [
    1, 1, 1, 0, 1, 1, 1,
    1, 0, 1, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1,
    0, 0, 0, 1, 0, 0, 0,
    1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 0, 0, 1, 0,
    1, 1, 1, 0, 1, 0, 1,
];

const PantallaAlumno = () => (
    <div className="px-5 pt-3 pb-6 space-y-3.5">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-[17px] font-bold text-tinta leading-tight">¡Hola, Valeria!</p>
                <p className="text-[12px] text-gris">Salsa caleña · Intermedio</p>
            </div>
            <Avatar style={{ background: '#E8F3FF', color: '#0A84FF', fontWeight: 700 }}>V</Avatar>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-azul to-cielo p-4 text-white flex items-center justify-between">
            <div>
                <p className="text-[11px] text-white/80">Tu racha actual</p>
                <p className="text-[28px] font-extrabold leading-none mt-1">
                    12 <span className="text-[12px] font-medium text-white/80">clases seguidas</span>
                </p>
            </div>
            <FireFilled style={{ fontSize: 30, color: '#F2B33D' }} />
        </div>

        <div className="rounded-2xl border border-linea p-4 text-center">
            <p className="text-[11px] text-gris mb-3">Tu código para marcar asistencia</p>
            <div className="w-24 h-24 mx-auto rounded-lg bg-white p-2 grid grid-cols-7 gap-[2px] border border-linea">
                {qr.map((v, i) => (
                    <span key={i} className={`rounded-[1px] ${v ? 'bg-tinta' : 'bg-transparent'}`} />
                ))}
            </div>
        </div>

        <div className="rounded-2xl border border-linea p-4">
            <div className="flex justify-between text-[11px]">
                <span className="text-gris">Progreso del nivel</span>
                <span className="font-bold text-azul">75%</span>
            </div>
            <Progress percent={75} showInfo={false} size="small" className="!m-0" />
        </div>

        <Button type="primary" block icon={<QrcodeOutlined />}>
            Escanear QR
        </Button>
    </div>
);

function AppAlumnos() {
    return (
        <section className="seccion seccion-azul overflow-hidden" id="alumnos">
            <div className="contenedor grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <SeccionTitulo
                        alinear="left"
                        sobreAzul
                        eyebrow="Experiencia para tus alumnos"
                        titulo="Todo lo que tus alumnos necesitan,"
                        resaltado="en su bolsillo"
                        bajada="Cada alumno ve su recorrido: asistencia, logros y pagos. Motivación que se traduce en permanencia para tu academia."
                    />
                    <div className="mt-10 grid sm:grid-cols-2 gap-4">
                        {features.map((f, i) => (
                            <Reveal key={f.label} delay={i * 0.05}>
                                <div className="flex items-center gap-3 py-1">
                                    <Avatar size={44} style={{ background: 'rgba(255,255,255,0.16)', color: '#FFFFFF', fontSize: 19 }} icon={f.icon} />
                                    <span className="font-medium text-white">{f.label}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                <Reveal className="relative flex justify-center">
                    <Formas variante={1} sobreAzul />
                    <NotaMano flecha="abajo-derecha" className="absolute -top-10 left-0 hidden xl:block text-white">
                        Motivación
                        <br />
                        que se nota
                    </NotaMano>
                    <Telefono className="relative w-[290px] h-[600px]">
                        <PantallaAlumno />
                    </Telefono>
                    <Card
                        size="small"
                        variant="borderless"
                        className="!absolute left-0 xl:-left-6 top-[300px] w-[200px] !rounded-2xl shadow-flotante hidden sm:block"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F7D774] to-oro flex items-center justify-center text-white text-lg">
                                <StarFilled />
                            </span>
                            <div>
                                <p className="text-[13px] font-bold text-tinta leading-tight">¡Nuevo logro!</p>
                                <p className="text-[12px] text-gris">Primer mes completo</p>
                            </div>
                        </div>
                    </Card>
                    <Card
                        size="small"
                        variant="borderless"
                        className="!absolute right-0 xl:-right-6 top-[120px] w-[190px] !rounded-2xl shadow-flotante hidden sm:block"
                    >
                        <p className="text-[12px] text-gris">Asistencia del mes</p>
                        <p className="text-[22px] font-extrabold text-tinta leading-tight">9 de 10 clases</p>
                        <Progress percent={90} showInfo={false} size="small" className="!m-0" />
                    </Card>
                </Reveal>
            </div>
        </section>
    );
}

export default withAntd(AppAlumnos);
