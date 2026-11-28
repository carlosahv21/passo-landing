import React, { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

/**
 * Número animado: al montarse sube de 0 hasta `valor` y, cada vez que `valor` cambia,
 * se desliza desde el valor anterior. Con movimiento reducido muestra el valor final.
 */
export function useContador(valor: number, { duracion = 1.6, retraso = 0 }: { duracion?: number; retraso?: number } = {}) {
    const reducir = useReducedMotion();
    const [actual, setActual] = useState(0);
    const previo = useRef(0);
    const primera = useRef(true);

    useEffect(() => {
        if (reducir) {
            previo.current = valor;
            setActual(valor);
            return;
        }
        const control = animate(previo.current, valor, {
            duration: primera.current ? duracion : 0.9,
            delay: primera.current ? retraso : 0,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
                previo.current = v;
                setActual(v);
            },
        });
        primera.current = false;
        return () => control.stop();
    }, [valor, duracion, retraso, reducir]);

    return actual;
}

/**
 * Destello suave sobre un elemento cada vez que cambia `clave` (no en el primer render).
 * Devuelve la ref que hay que poner en el elemento.
 */
export function useDestello<T extends HTMLElement>(
    clave: unknown,
    { color = 'rgba(34,160,107,0.22)', sombraBase = '0 0 #0000' }: { color?: string; sombraBase?: string } = {},
) {
    const ref = useRef<T>(null);
    const reducir = useReducedMotion();
    const primera = useRef(true);

    useEffect(() => {
        if (primera.current) {
            primera.current = false;
            return;
        }
        if (reducir || !ref.current) return;
        // Anillo de color que se desvanece, sin perder la sombra propia del elemento
        const control = animate(
            ref.current,
            { boxShadow: [`0 0 0 5px ${color}, ${sombraBase}`, `0 0 0 0px rgba(0,0,0,0), ${sombraBase}`], scale: [1.03, 1] },
            { duration: 1.1, ease: 'easeOut' },
        );
        return () => control.stop();
    }, [clave, color, sombraBase, reducir]);

    return ref;
}

/** Pesos colombianos con punto de miles: $ 8.450.000 */
export const pesos = (n: number) => `$ ${Math.round(n).toLocaleString('es-CO')}`;

const Contador: React.FC<{
    valor: number;
    formato?: (n: number) => string;
    duracion?: number;
    retraso?: number;
}> = ({ valor, formato = (n) => String(Math.round(n)), duracion, retraso }) => {
    const actual = useContador(valor, { duracion, retraso });
    return <>{formato(actual)}</>;
};

export default Contador;
