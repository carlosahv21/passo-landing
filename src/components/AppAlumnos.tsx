import React from 'react';
import { Avatar, Card, Progress } from 'antd';
import {
    QrcodeOutlined,
    HistoryOutlined,
    TrophyOutlined,
    CreditCardOutlined,
    NotificationOutlined,
    StarFilled,
} from '@ant-design/icons';
import { withAntd } from '../lib/antd';
import SeccionTitulo from './ui/SeccionTitulo';
import Reveal from './ui/Reveal';
import Telefono from './ui/Telefono';
import Formas from './ui/Formas';
import NotaMano from './ui/NotaMano';
import PantallaAlumno from './ui/PantallaAlumno';

const features = [
    { icon: <QrcodeOutlined />, label: 'Asistencia con QR' },
    { icon: <HistoryOutlined />, label: 'Historial y progreso' },
    { icon: <TrophyOutlined />, label: 'Logros y rachas' },
    { icon: <CreditCardOutlined />, label: 'Pagos y planes' },
    { icon: <NotificationOutlined />, label: 'Novedades y eventos' },
];

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
                    {/* La nota va anclada al borde izquierdo del celular: la flecha llega al teléfono sin quedar sobre la pantalla blanca */}
                    <div className="relative">
                        <NotaMano flecha="abajo-derecha" className="absolute right-full -mr-3 -top-6 z-10 hidden xl:block text-white">
                            Motivación
                            <br />
                            que se nota
                        </NotaMano>
                        <Telefono className="relative w-[290px] h-[600px]">
                            <PantallaAlumno />
                        </Telefono>
                    </div>
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
