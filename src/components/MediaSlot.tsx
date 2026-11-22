import React from 'react';
import Huella from './Huella';
import Formas from './ui/Formas';

// Slot de imagen pendiente: cuando exista el archivo, reemplazar la huella por
// <img src={file} alt="..." /> (las formas de fondo se quedan) — rutas en el README.
const MediaSlot: React.FC<{ file: string; className?: string; variante?: 0 | 1 | 2 }> = ({ file, className = '', variante = 0 }) => (
    <div className={`relative overflow-hidden bg-azul-suave/60 ${className}`} aria-hidden="true">
        <Formas variante={variante} className="scale-110" />
        <div className="absolute inset-0 flex items-center justify-center">
            <Huella size={28} className="text-azul/40" rotate={12} />
        </div>
        <span className="absolute bottom-3 right-4 text-[10px] text-suave/60">{file}</span>
    </div>
);

export default MediaSlot;
