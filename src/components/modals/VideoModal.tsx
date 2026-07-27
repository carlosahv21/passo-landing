import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// El <video> solo se monta cuando el modal está abierto: nada se descarga hasta que lo piden.
const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
    const [cargando, setCargando] = useState(true);

    return (
        <AnimatePresence onExitComplete={() => setCargando(true)}>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-4xl"
                    >
                        <button
                            onClick={onClose}
                            aria-label="Cerrar video"
                            className="absolute -top-12 right-0 p-2 rounded-full hover:bg-white/5 text-claro/60 hover:text-claro transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative aspect-video bg-container-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                            {cargando && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-claro/60">
                                    <Loader2 size={32} className="animate-spin text-azul" />
                                    <p className="font-mono text-xs uppercase tracking-widest">Cargando video…</p>
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
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VideoModal;
