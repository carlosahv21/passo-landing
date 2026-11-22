import React from 'react';

// Formas orgánicas irregulares para poner detrás de imágenes y tarjetas.
const FORMAS = [
    'M421 54c78 35 139 112 155 198 17 88-12 186-73 252-62 67-155 103-246 100-92-3-182-46-229-121C-19 409-9 311 23 228 56 143 121 70 203 41c71-26 150-21 218 13Z',
    'M455 92c61 55 99 140 92 224-7 85-60 168-135 206-76 39-174 33-255-4C76 481 12 416 2 339-9 262 34 173 98 116 162 58 249 32 330 37c45 3 89 22 125 55Z',
    'M492 160c41 76 37 176-9 249-45 74-131 121-218 123-87 3-175-39-225-109C-10 353-23 256 14 179 51 101 136 44 226 31c103-14 222 47 266 129Z',
];

const Mancha: React.FC<{ forma?: 0 | 1 | 2; className?: string; color?: string; opacidad?: number }> = ({
    forma = 0,
    className = '',
    color = '#0A84FF',
    opacidad = 0.12,
}) => {
    const id = `mancha-${React.useId().replace(/:/g, '')}`;
    return (
    <svg viewBox="0 0 580 580" className={`pointer-events-none ${className}`} aria-hidden="true" preserveAspectRatio="none">
        <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={opacidad * 1.6} />
                <stop offset="100%" stopColor={color} stopOpacity={opacidad * 0.6} />
            </linearGradient>
        </defs>
        <path d={FORMAS[forma]} fill={`url(#${id})`} />
    </svg>
    );
};

export default Mancha;

// Figuritas sueltas (aros, triángulos, puntos) como en la referencia
export const Figura: React.FC<{ tipo: 'aro' | 'triangulo' | 'punto'; className?: string; color?: string }> = ({
    tipo,
    className = '',
    color = 'currentColor',
}) => (
    <svg viewBox="0 0 24 24" className={`pointer-events-none ${className}`} aria-hidden="true" fill="none">
        {tipo === 'aro' && <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="3" />}
        {tipo === 'triangulo' && <path d="M12 4 L21 19 L3 19 Z" stroke={color} strokeWidth="2.6" strokeLinejoin="round" />}
        {tipo === 'punto' && <circle cx="12" cy="12" r="6" fill={color} />}
    </svg>
);
