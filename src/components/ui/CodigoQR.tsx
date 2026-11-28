import React from 'react';

// Patrón decorativo tipo QR (7×7). Se usa en la app del alumno y en la sección de asistencia.
const patron = [
    1, 1, 1, 0, 1, 1, 1,
    1, 0, 1, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1,
    0, 0, 0, 1, 0, 0, 0,
    1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 0, 0, 1, 0,
    1, 1, 1, 0, 1, 0, 1,
];

const CodigoQR: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
    <div className={`rounded-lg bg-white p-2 grid grid-cols-7 gap-[2px] border border-linea ${className}`} aria-hidden="true">
        {patron.map((v, i) => (
            <span key={i} className={`rounded-[1px] ${v ? 'bg-tinta' : 'bg-transparent'}`} />
        ))}
    </div>
);

export default CodigoQR;
