import React from 'react';
import Eyebrow from '../Eyebrow';
import Reveal from './Reveal';

// Encabezado de sección: "center" (por defecto), "split" (título a la izquierda y bajada a la
// derecha) o "left" (apilado a la izquierda, para filas de dos columnas).
// sobreAzul: para secciones con fondo azul (título blanco, resaltado dorado).
const SeccionTitulo: React.FC<{
    eyebrow: string;
    titulo: React.ReactNode;
    resaltado?: React.ReactNode;
    bajada?: React.ReactNode;
    alinear?: 'center' | 'split' | 'left';
    sobreAzul?: boolean;
    /** Clase de color del resaltado (por defecto azul, o dorado sobre azul) */
    colorResaltado?: string;
    /** Título y bajada en una sola línea desde xl */
    unaLinea?: boolean;
    className?: string;
}> = ({ eyebrow, titulo, resaltado, bajada, alinear = 'center', sobreAzul = false, colorResaltado, unaLinea = false, className = '' }) => {
    const h2 = (
        <h2 className={`t-h2 ${unaLinea ? 'xl:whitespace-nowrap' : ''}`}>
            {titulo}
            {resaltado && (
                <>
                    {' '}
                    <span className={colorResaltado ?? (sobreAzul ? 'text-oro' : 'text-azul')}>{resaltado}</span>
                </>
            )}
        </h2>
    );
    const colorBajada = sobreAzul ? 'text-white/80' : 'text-gris';

    if (alinear === 'center') {
        return (
            <Reveal className={`${unaLinea ? 'max-w-6xl' : 'max-w-3xl'} mx-auto text-center ${className}`}>
                <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
                {h2}
                {bajada && (
                    <p className={`mt-4 t-lead mx-auto ${unaLinea ? 'xl:whitespace-nowrap' : 'max-w-2xl'} ${colorBajada}`}>{bajada}</p>
                )}
            </Reveal>
        );
    }

    if (alinear === 'left') {
        return (
            <Reveal className={`max-w-2xl ${className}`}>
                <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
                {h2}
                {bajada && <p className={`mt-4 t-lead ${colorBajada}`}>{bajada}</p>}
            </Reveal>
        );
    }

    return (
        <Reveal className={`grid lg:grid-cols-12 gap-x-10 gap-y-4 items-end ${className}`}>
            <div className="lg:col-span-7">
                <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
                {h2}
            </div>
            {bajada && <p className={`lg:col-span-5 lg:pb-1 t-lead ${colorBajada}`}>{bajada}</p>}
        </Reveal>
    );
};

export default SeccionTitulo;
