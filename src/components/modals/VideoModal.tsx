import React, { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mismo corte que el breakpoint md de Tailwind: por debajo se muestra el video vertical.
const CONSULTA_MOVIL = '(max-width: 767px)';

const VIDEO_HORIZONTAL = '/videos/passo-demo-horizontal.mp4';
const VIDEO_VERTICAL = '/videos/passo-demo-vertical.mp4';

const useEsMovil = () => {
    const [esMovil, setEsMovil] = useState(false);

    useEffect(() => {
        const consulta = window.matchMedia(CONSULTA_MOVIL);
        const actualizar = () => setEsMovil(consulta.matches);
        actualizar();
        consulta.addEventListener('change', actualizar);
        return () => consulta.removeEventListener('change', actualizar);
    }, []);

    return esMovil;
};

// El <video> solo se monta cuando el modal está abierto: nada se descarga hasta que lo piden.
const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
    const [cargando, setCargando] = useState(true);
    const esMovil = useEsMovil();
    const src = esMovil ? VIDEO_VERTICAL : VIDEO_HORIZONTAL;

    useEffect(() => {
        setCargando(true);
    }, [src]);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            afterClose={() => setCargando(true)}
            footer={null}
            centered
            width={esMovil ? 420 : 960}
            destroyOnHidden
            title="Así funciona Passo"
        >
            <div
                className={`relative rounded-2xl overflow-hidden bg-fondo ${
                    esMovil ? 'aspect-[9/16] w-full max-w-[calc(72dvh*9/16)] mx-auto' : 'aspect-video'
                }`}
            >
                {cargando && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Spin size="large" description="Cargando video…">
                            <div className="w-40 h-16" />
                        </Spin>
                    </div>
                )}
                <video
                    key={src}
                    src={src}
                    controls
                    autoPlay
                    playsInline
                    onCanPlay={() => setCargando(false)}
                    className={`w-full h-full transition-opacity duration-300 ${cargando ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>
        </Modal>
    );
};

export default VideoModal;
