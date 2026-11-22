import React from 'react';
import Huella from './Huella';

// Píldora de sección (como "Nos avantages" en la referencia): huella + texto
const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-linea shadow-sm text-[13px] font-medium text-gris ${className}`}
    >
        <Huella size={8} rotate={16} className="text-azul" />
        {children}
    </span>
);

export default Eyebrow;
