import React, { useState } from 'react';
import { Modal, Spin } from 'antd';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// El <video> solo se monta cuando el modal está abierto: nada se descarga hasta que lo piden.
const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
    const [cargando, setCargando] = useState(true);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            afterClose={() => setCargando(true)}
            footer={null}
            centered
            width={960}
            destroyOnHidden
            title="Así funciona Passo"
        >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-fondo">
                {cargando && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Spin size="large" description="Cargando video…">
                            <div className="w-40 h-16" />
                        </Spin>
                    </div>
                )}
                <video
                    src="/demo-passo.mp4"
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
