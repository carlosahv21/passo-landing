import React from 'react';
import Huella from '../Huella';

// Camino punteado con huellas que se van desvaneciendo (como en los correos de Passo).
// Va de izquierda a derecha; decorativo.
const pasos = [
    { x: 8, y: 72, r: 62, o: 0.25 },
    { x: 34, y: 48, r: 48, o: 0.4, flip: true },
    { x: 62, y: 58, r: 78, o: 0.6 },
    { x: 92, y: 30, r: 58, o: 0.8, flip: true },
    { x: 122, y: 22, r: 80, o: 1 },
];

const CaminoHuellas: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`relative w-[170px] h-[110px] text-azul ${className}`} aria-hidden="true">
        <svg viewBox="0 0 170 110" className="absolute inset-0 w-full h-full" fill="none">
            <path
                d="M4 104 C 30 70, 20 60, 48 62 S 80 80, 100 50 S 140 18, 166 22"
                stroke="#B9CBE3"
                strokeWidth="1.6"
                strokeDasharray="5 6"
                strokeLinecap="round"
            />
        </svg>
        {pasos.map((p, i) => (
            <span key={i} className="absolute" style={{ left: p.x, top: p.y, opacity: p.o }}>
                <Huella size={9} rotate={p.r} flip={p.flip} />
            </span>
        ))}
    </div>
);

export default CaminoHuellas;
