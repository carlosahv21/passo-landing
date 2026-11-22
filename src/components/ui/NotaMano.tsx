import React from 'react';

// Anotación a mano alzada con flecha (como en la referencia). Solo decorativa.
const NotaMano: React.FC<{
    children: React.ReactNode;
    flecha: 'abajo-derecha' | 'abajo-izquierda';
    className?: string;
}> = ({ children, flecha, className = '' }) => (
    <div className={`pointer-events-none select-none ${className.includes('text-') ? '' : 'text-azul'} ${className}`} aria-hidden="true">
        <p className={`font-hand text-[26px] leading-[1.05] ${flecha === 'abajo-derecha' ? '-rotate-[8deg]' : 'rotate-[7deg] text-right'}`}>
            {children}
        </p>
        <svg
            width="70"
            height="56"
            viewBox="0 0 70 56"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`mt-1 ${flecha === 'abajo-derecha' ? 'ml-20' : 'ml-auto mr-20 -scale-x-100'}`}
        >
            <path d="M4 6 C 22 4, 44 14, 54 44" />
            <path d="M44 38 L 54 46 L 60 34" />
        </svg>
    </div>
);

export default NotaMano;
