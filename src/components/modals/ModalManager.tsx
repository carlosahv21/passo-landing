import React, { useState } from 'react';
import { Segmented } from 'antd';
import {
    TeamOutlined,
    SafetyCertificateOutlined,
    FileTextOutlined,
    LockOutlined,
    CloudOutlined,
    InfoCircleOutlined,
    MessageOutlined,
    WhatsAppOutlined,
    MailOutlined,
    ArrowRightOutlined,
} from '@ant-design/icons';
import { useModalStore } from '../../store/modalStore';
import { withAntd } from '../../lib/antd';
import InfoModal from './InfoModal';
import RegistroModal from './RegistroModal';
import VideoModal from './VideoModal';

const WHATSAPP_URL = import.meta.env.PUBLIC_WHATSAPP_URL;

const Caja: React.FC<{ icon: React.ReactNode; titulo: string; children: React.ReactNode }> = ({ icon, titulo, children }) => (
    <div className="p-4 bg-fondo rounded-2xl border border-linea">
        <div className="flex items-center gap-2 mb-2 text-tinta font-semibold">
            <span className="text-azul">{icon}</span>
            <span>{titulo}</span>
        </div>
        <p className="text-sm">{children}</p>
    </div>
);

const Canal: React.FC<{ href?: string; icon: React.ReactNode; color: string; titulo: string; detalle: string; externo?: boolean }> = ({
    href,
    icon,
    color,
    titulo,
    detalle,
    externo,
}) => (
    <a
        href={href}
        {...(externo && { target: '_blank', rel: 'noopener noreferrer' })}
        className="flex items-center justify-between p-5 bg-white border border-linea rounded-2xl hover:border-azul hover:shadow-tarjeta transition-all group"
    >
        <span className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl" style={{ background: color }}>
                {icon}
            </span>
            <span>
                <span className="block text-tinta font-semibold">{titulo}</span>
                <span className="block text-sm text-gris">{detalle}</span>
            </span>
        </span>
        <span className="text-suave group-hover:text-azul group-hover:translate-x-1 transition-all">
            <ArrowRightOutlined />
        </span>
    </a>
);

function ModalManager() {
    const { activeModal, closeModal } = useModalStore();
    const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');

    return (
        <>
            <RegistroModal isOpen={activeModal === 'registro'} onClose={closeModal} />
            <VideoModal isOpen={activeModal === 'video'} onClose={closeModal} />

            {/* Nosotros */}
            <InfoModal isOpen={activeModal === 'about'} onClose={closeModal} title="Tu academia en las mejores manos" icon={<TeamOutlined />}>
                <div className="space-y-5">
                    <p>
                        Passo nace de una experiencia personal:{' '}
                        <span className="text-tinta font-semibold">el baile conecta personas y transforma vidas.</span> Los
                        directores deben dedicarse al arte, no a la administración.
                    </p>
                    <p>
                        Vimos cómo directores talentosos perdían horas frente a hojas de Excel complejas, lidiando con errores
                        de cobro y registros manuales que robaban su energía creativa.
                    </p>
                    <div className="bg-azul-suave p-5 rounded-2xl">
                        <h4 className="text-azul font-bold mb-2">Nuestra misión</h4>
                        <p className="text-tinta">
                            Impulsar el crecimiento de toda la comunidad de baile: academias, profesores y alumnos.
                            Automatizamos lo tedioso para que dediques menos tiempo a tareas administrativas y más tiempo a
                            transformar vidas.
                        </p>
                    </div>
                </div>
            </InfoModal>

            {/* Garantía */}
            <InfoModal isOpen={activeModal === 'guarantee'} onClose={closeModal} title="Tu información, siempre disponible" icon={<SafetyCertificateOutlined />}>
                <div className="space-y-5">
                    <p>En Passo, tu tranquilidad es nuestra prioridad. Entendemos que la información de tu academia es su activo más valioso.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Caja icon={<CloudOutlined />} titulo="Nube total">
                            Accede desde cualquier dispositivo. Tu oficina va contigo, siempre segura.
                        </Caja>
                        <Caja icon={<LockOutlined />} titulo="Privacidad de datos">
                            Cumplimos con los más altos estándares. Tus datos son tuyos y de nadie más.
                        </Caja>
                    </div>
                    <p className="text-sm bg-azul-suave text-tinta p-4 rounded-2xl">
                        Realizamos respaldos automáticos cada hora para garantizar que nunca pierdas ni un segundo de progreso.
                    </p>
                </div>
            </InfoModal>

            {/* Legal */}
            <InfoModal isOpen={activeModal === 'legal'} onClose={closeModal} title="Documentación legal" icon={<FileTextOutlined />}>
                <Segmented
                    block
                    value={legalTab}
                    onChange={(v) => setLegalTab(v as typeof legalTab)}
                    options={[
                        { value: 'privacy', label: 'Privacidad' },
                        { value: 'terms', label: 'Términos' },
                        { value: 'cookies', label: 'Cookies' },
                    ]}
                />
                <div className="mt-6 min-h-[260px] space-y-4">
                    {legalTab === 'privacy' && (
                        <>
                            <h4 className="text-tinta font-bold flex items-center gap-2">
                                <LockOutlined /> Política de privacidad
                            </h4>
                            <p>
                                Sus datos personales están protegidos según el Reglamento General de Protección de Datos (RGPD).
                                Recogemos información únicamente para la prestación del servicio y su mejora continua.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li>No vendemos sus datos a terceros.</li>
                                <li>Encriptación de extremo a extremo en transacciones.</li>
                                <li>Derecho de acceso, rectificación y olvido garantizado.</li>
                            </ul>
                        </>
                    )}
                    {legalTab === 'terms' && (
                        <>
                            <h4 className="text-tinta font-bold flex items-center gap-2">
                                <FileTextOutlined /> Términos de servicio
                            </h4>
                            <p>
                                Al utilizar Passo, usted acepta los términos que rigen el uso razonable de la plataforma. El
                                servicio se proporciona bajo una suscripción mensual o anual revocable.
                            </p>
                            <p>
                                Passo no se hace responsable de las malas praxis contables realizadas por el usuario, siendo este
                                el único responsable de la veracidad de los datos introducidos.
                            </p>
                        </>
                    )}
                    {legalTab === 'cookies' && (
                        <>
                            <h4 className="text-tinta font-bold flex items-center gap-2">
                                <InfoCircleOutlined /> Gestión de cookies
                            </h4>
                            <p>
                                Utilizamos cookies esenciales para el funcionamiento de la sesión y cookies analíticas para
                                entender cómo navega por nuestra landing y mejorar su experiencia.
                            </p>
                            <p>Puede desactivar las cookies no esenciales desde la configuración de su navegador en cualquier momento.</p>
                        </>
                    )}
                </div>
            </InfoModal>

            {/* Contacto */}
            <InfoModal isOpen={activeModal === 'contact'} onClose={closeModal} title="¿Listo para digitalizar tu academia?" icon={<MessageOutlined />}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-lg text-tinta font-semibold">Hablemos de cómo llevar tu academia al siguiente nivel.</p>
                        <p>
                            Ya sea que busques automatizar tus cobros, organizar tus clases o profesionalizar la imagen de tu
                            academia, estamos aquí para ayudarte.
                        </p>
                    </div>
                    <div className="grid gap-3">
                        {WHATSAPP_URL && (
                            <Canal href={WHATSAPP_URL} externo icon={<WhatsAppOutlined />} color="#25D366" titulo="WhatsApp directo" detalle="Respuesta inmediata" />
                        )}
                        <Canal href="mailto:contacto@passodance.com" icon={<MailOutlined />} color="#0A84FF" titulo="Correo" detalle="contacto@passodance.com" />
                    </div>
                    <p className="text-xs text-center text-suave">Atención personalizada de lunes a viernes, de 9:00 a. m. a 6:00 p. m.</p>
                </div>
            </InfoModal>
        </>
    );
}

export default withAntd(ModalManager);
