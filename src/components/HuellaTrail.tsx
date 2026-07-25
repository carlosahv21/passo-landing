import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Huella from './Huella';

// Huellas repartidas al azar por toda la página. Cada una "pisa" en bucle:
// aparece, se queda un momento y se desvanece, con ritmo y retardo propios,
// y solo anima mientras su tramo de la página está en pantalla.
// PRNG con semilla fija: mismo resultado en servidor y cliente (sin mismatch de hidratación).
let semilla = 42;
const rnd = () => {
    semilla = (semilla * 9301 + 49297) % 233280;
    return semilla / 233280;
};

const pasos = Array.from({ length: 42 }, (_, i) => {
    const izquierdo = i % 2 === 0;
    return {
        top: `${1.5 + i * 2.3 + rnd() * 1.2}%`,
        left: `${5 + rnd() * 85}%`,
        rot: 140 + rnd() * 100,
        flip: !izquierdo,
        color: izquierdo ? 'text-azul' : 'text-oro',
        duracion: 4 + rnd() * 3,     // ciclo de 4–7s
        retardo: rnd() * 1.2,        // aparece casi al llegar (0–1.2s)
    };
});

const HuellaTrail = () => {
    const reduced = useReducedMotion();
    return (
        <div className="absolute inset-0 pointer-events-none hidden lg:block -z-10" aria-hidden="true">
            {pasos.map((p, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${p.color}`}
                    style={{ top: p.top, left: p.left }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={reduced
                        ? { opacity: 0.35, scale: 1 }
                        : { opacity: [0, 0.5, 0.5, 0], scale: [0.5, 1, 1, 1] }}
                    viewport={{ once: false, margin: '-8% 0px -8% 0px' }}
                    transition={reduced ? { duration: 0.5 } : {
                        duration: p.duracion,
                        times: [0, 0.12, 0.7, 1],
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        delay: p.retardo,
                        ease: 'easeOut',
                    }}
                >
                    <Huella size={30} flip={p.flip} rotate={p.rot} />
                </motion.div>
            ))}
        </div>
    );
};

export default HuellaTrail;
