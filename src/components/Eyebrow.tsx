import React from 'react';
import Huella from './Huella';

// Chip de sección, estilo referencia: píldora con huella + texto mono
const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <p className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pista border border-claro/10 font-mono text-[11px] uppercase tracking-[0.25em] text-oro ${className}`}>
        <Huella size={9} rotate={16} />
        {children}
    </p>
);

export default Eyebrow;
