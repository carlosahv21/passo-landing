import React from 'react';
import Huella from './Huella';

// Slot de imagen pendiente: cuando exista el archivo, reemplazar este bloque por
// <img src={file} alt="..." /> — las rutas esperadas están en el README.
const MediaSlot: React.FC<{ file: string; className?: string }> = ({ file, className = '' }) => (
    <div
        className={`relative overflow-hidden rounded-3xl border border-claro/10 bg-gradient-to-br from-pista to-noche ${className}`}
        aria-hidden="true"
    >
        <div className="absolute inset-0 flex items-center justify-center">
            <Huella size={44} className="text-claro/[0.06]" rotate={12} />
        </div>
        <span className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-widest text-claro/20">
            {file}
        </span>
    </div>
);

export default MediaSlot;
