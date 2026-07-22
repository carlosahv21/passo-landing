import React from 'react';

interface HuellaProps {
    size?: number;
    className?: string;
    flip?: boolean;
    rotate?: number;
}

// Huella de pie — símbolo de la marca Passo
const Huella: React.FC<HuellaProps> = ({ size = 20, className = '', flip = false, rotate = 0 }) => (
    <svg
        width={size}
        height={size * 1.55}
        viewBox="0 0 28 48"
        fill="currentColor"
        className={className}
        style={{ transform: `${flip ? 'scaleX(-1) ' : ''}rotate(${rotate}deg)` }}
        aria-hidden="true"
    >
        {/* planta alargada */}
        <path d="M14 1 C20.5 1 24 6 23.5 14 C23 21.5 19.5 26.5 14 26.5 C8.5 26.5 5 21.5 4.5 14 C4 6 7.5 1 14 1 Z" />
        {/* talón */}
        <circle cx="13.5" cy="40" r="6.2" />
    </svg>
);

export default Huella;
