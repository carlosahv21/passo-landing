import React, { useState } from 'react';
import { useModalStore } from '../../store/modalStore';
import InfoModal from './InfoModal';
import RegistroModal from './RegistroModal';
import VideoModal from './VideoModal';
import { Users, ShieldCheck, FileText, Lock, Globe, Cookie, MessageCircle, Mail, ArrowRight } from 'lucide-react';

const ModalManager: React.FC = () => {
    const { activeModal, closeModal } = useModalStore();
    const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');

    return (
        <>
            {/* Modal Registro */}
            <RegistroModal isOpen={activeModal === 'registro'} onClose={closeModal} />

            {/* Modal Video demo */}
            <VideoModal isOpen={activeModal === 'video'} onClose={closeModal} />

            {/* Modal Nosotros */}
            <InfoModal
                isOpen={activeModal === 'about'}
                onClose={closeModal}
                title="Tu academia en las mejores manos"
                icon={<Users size={24} />}
            >
                <div className="space-y-6">
                    <p>
                        Passo nace de una experiencia personal: <span className="text-white font-semibold">el baile conecta personas y transforma vidas.</span> Los directores deben dedicarse al arte, no a la administración.
                    </p>
                    <p>
                        Vimos cómo directores talentosos perdían horas frente a hojas de Excel complejas, lidiando con errores de cobro y registros manuales que robaban su energía creativa.
                    </p>
                    <div className="bg-primary-blue/5 border border-primary-blue/10 p-6 rounded-2xl">
                        <h4 className="text-primary-blue font-bold mb-2">Nuestra Misión</h4>
                        <p>
                            Impulsar el crecimiento de toda la comunidad de baile: academias, profesores y alumnos. Automatizamos lo tedioso para que dediques menos tiempo a tareas administrativas y más tiempo a transformar vidas.
                        </p>
                    </div>
                </div>
            </InfoModal>

            {/* Modal Garantía */}
            <InfoModal
                isOpen={activeModal === 'guarantee'}
                onClose={closeModal}
                title="Tu información, siempre disponible"
                icon={<ShieldCheck size={24} />}
            >
                <div className="space-y-6">
                    <p>
                        En Passo, tu tranquilidad es nuestra prioridad. Entendemos que la información de tu academia es su activo más valioso.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-white font-medium">
                                <Globe size={18} className="text-primary-blue" />
                                <span>Nube Total</span>
                            </div>
                            <p className="text-sm">Accede desde cualquier dispositivo. Tu oficina va contigo, siempre segura.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-white font-medium">
                                <Lock size={18} className="text-primary-blue" />
                                <span>Privacidad de Datos</span>
                            </div>
                            <p className="text-sm">Cumplimos con los más altos estándares. Tus datos son tuyos y de nadie más.</p>
                        </div>
                    </div>
                    <p className="text-sm bg-primary-blue/5 p-4 rounded-lg italic">
                        Realizamos respaldos automáticos cada hora para garantizar que nunca pierdas ni un segundo de progreso.
                    </p>
                </div>
            </InfoModal>

            {/* Modal Legal */}
            <InfoModal
                isOpen={activeModal === 'legal'}
                onClose={closeModal}
                title="Documentación Legal"
                icon={<FileText size={24} />}
            >
                <div className="space-y-6">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                        {(['privacy', 'terms', 'cookies'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setLegalTab(tab)}
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${legalTab === tab
                                    ? 'bg-primary-blue text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab === 'privacy' ? 'Privacidad' : tab === 'terms' ? 'Términos' : 'Cookies'}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 min-h-[300px]">
                        {legalTab === 'privacy' && (
                            <div className="space-y-4 animate-in fade-in duration-300">
                                <h4 className="text-white font-bold flex items-center gap-2">
                                    <Lock size={16} /> Política de Privacidad
                                </h4>
                                <p>Sus datos personales están protegidos según el Reglamento General de Protección de Datos (RGPD). Recogemos información únicamente para la prestación del servicio y su mejora continua.</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm italic">
                                    <li>No vendemos sus datos a terceros.</li>
                                    <li>Encriptación de extremo a extremo en transacciones.</li>
                                    <li>Derecho de acceso, rectificación y olvido garantizado.</li>
                                </ul>
                            </div>
                        )}
                        {legalTab === 'terms' && (
                            <div className="space-y-4 animate-in fade-in duration-300">
                                <h4 className="text-white font-bold flex items-center gap-2">
                                    <FileText size={16} /> Términos de Servicio
                                </h4>
                                <p>Al utilizar Passo, usted acepta los términos que rigen el uso razonable de la plataforma. El servicio se proporciona bajo una suscripción mensual o anual revocable.</p>
                                <p>Passo no se hace responsable de las malas praxis contables realizadas por el usuario, siendo este el único responsable de la veracidad de los datos introducidos.</p>
                            </div>
                        )}
                        {legalTab === 'cookies' && (
                            <div className="space-y-4 animate-in fade-in duration-300">
                                <h4 className="text-white font-bold flex items-center gap-2">
                                    <Cookie size={16} /> Gestión de Cookies
                                </h4>
                                <p>Utilizamos cookies esenciales para el funcionamiento de la sesión y cookies analíticas para entender cómo navega por nuestra landing y mejorar su experiencia.</p>
                                <p>Puede desactivar las cookies no esenciales desde la configuración de su navegador en cualquier momento.</p>
                            </div>
                        )}
                    </div>
                </div>
            </InfoModal>

            {/* Modal Contacto */}
            <InfoModal
                isOpen={activeModal === 'contact'}
                onClose={closeModal}
                title="¿Listo para digitalizar tu academia?"
                icon={<MessageCircle size={24} />}
            >
                <div className="space-y-8">
                    <div className="space-y-4">
                        <p className="text-lg text-white font-medium">
                            Hablemos de cómo llevar tu escuela al siguiente nivel.
                        </p>
                        <p className="text-slate-400">
                            Ya sea que busques automatizar tus cobros, organizar tus clases o simplemente profesionalizar la imagen de tu academia, estamos aquí para ayudarte.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <a
                            href="https://wa.me/your-number"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-6 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl hover:bg-[#25D366]/20 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/20">
                                    <MessageCircle className="text-white" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">WhatsApp Directo</h4>
                                    <p className="text-sm text-slate-400 font-light">Respuesta inmediata</p>
                                </div>
                            </div>
                            <ArrowRight size={20} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="mailto:hola@passo.app"
                            className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center shadow-lg shadow-primary-blue/20">
                                    <Mail className="text-white" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Correo Corporativo</h4>
                                    <p className="text-sm text-slate-400 font-light">hola@passo.app</p>
                                </div>
                            </div>
                            <ArrowRight size={20} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <p className="text-xs text-center text-slate-500 font-light italic">
                        Atención personalizada de lunes a viernes, de 9:00 a 18:00.
                    </p>
                </div>
            </InfoModal>
        </>
    );
};

export default ModalManager;
