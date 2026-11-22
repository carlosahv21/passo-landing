import React from 'react';
import Mancha, { Figura } from './Mancha';

// Fondo decorativo detrás de una imagen (como la sección de la app de alumnos):
// una mancha grande irregular, un círculo de acento que asoma por una esquina y
// figuritas sueltas. Va dentro de un contenedor `relative`.
const Formas: React.FC<{
    variante?: 0 | 1 | 2;
    color?: string;
    acento?: string;
    sobreAzul?: boolean;
    className?: string;
}> = ({ variante = 0, color = '#0A84FF', acento = '#F2B33D', sobreAzul = false, className = '' }) => {
    const base = sobreAzul ? '#FFFFFF' : color;
    // posición del círculo de acento según la variante
    const circulo = [
        'right-[2%] bottom-[2%] w-[34%]',
        'left-[0%] bottom-[6%] w-[30%]',
        'right-[6%] top-[0%] w-[28%]',
    ][variante];
    return (
        <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
            <Mancha
                forma={variante}
                color={base}
                opacidad={sobreAzul ? 0.2 : 0.18}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] aspect-square"
            />
            <span
                className={`absolute aspect-square rounded-full ${circulo}`}
                style={{ background: acento, opacity: sobreAzul ? 0.9 : 0.22 }}
            />
            <Figura tipo="aro" color={acento} className="absolute left-[8%] top-[6%] w-5 h-5" />
            <Figura tipo="punto" color={sobreAzul ? '#FFFFFF' : color} className="absolute right-[10%] top-[16%] w-3 h-3" />
            <Figura tipo="triangulo" color={sobreAzul ? '#FFFFFF' : color} className="absolute left-[16%] bottom-[8%] w-5 h-5 opacity-60" />
        </div>
    );
};

export default Formas;
