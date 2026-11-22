import { motion, useReducedMotion } from 'framer-motion';
import Huella from './Huella';

// Huellas que "caminan" por los márgenes de la página: cada una aparece, se queda un
// momento y se desvanece en bucle, solo mientras su tramo está en pantalla. Van por los
// costados (fuera del contenido) para no tapar texto, y por encima de los fondos de sección.
// PRNG con semilla fija: mismo resultado en servidor y cliente (sin mismatch de hidratación).
let semilla = 42;
const rnd = () => {
    semilla = (semilla * 9301 + 49297) % 233280;
    return semilla / 233280;
};

const TOTAL = 44;
const pasos = Array.from({ length: TOTAL }, (_, i) => {
    const tramo = Math.floor(i / 4);           // cada 4 pasos cambia de costado
    const derecha = tramo % 2 === 1;
    const pieIzquierdo = i % 2 === 0;
    const desvio = pieIzquierdo ? 0 : 1.1;      // los dos pies, uno al lado del otro
    return {
        top: `${1.2 + i * (96 / TOTAL) + rnd() * 0.6}%`,
        lado: derecha
            ? { right: `${0.6 + desvio + rnd() * 0.4}%` }
            : { left: `${0.6 + desvio + rnd() * 0.4}%` },
        rot: (derecha ? 8 : -8) + (rnd() - 0.5) * 14,
        flip: !pieIzquierdo,
        color: pieIzquierdo ? 'text-azul' : 'text-oro',
        duracion: 4 + rnd() * 3,
        retardo: (i % 4) * 0.35 + rnd() * 0.3,  // pisan en orden dentro de cada tramo
    };
});

const HuellaTrail = () => {
    const reduced = useReducedMotion();
    return (
        <div className="absolute inset-0 pointer-events-none hidden lg:block z-[3]" aria-hidden="true">
            {pasos.map((p, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${p.color}`}
                    style={{ top: p.top, ...p.lado }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={
                        reduced ? { opacity: 0.45, scale: 1 } : { opacity: [0, 0.6, 0.6, 0], scale: [0.6, 1, 1, 1] }
                    }
                    viewport={{ once: false, margin: '-8% 0px -8% 0px' }}
                    transition={
                        reduced
                            ? { duration: 0.5 }
                            : {
                                  duration: p.duracion,
                                  times: [0, 0.12, 0.7, 1],
                                  repeat: Infinity,
                                  repeatDelay: 0.8,
                                  delay: p.retardo,
                                  ease: 'easeOut',
                              }
                    }
                >
                    <Huella size={13} flip={p.flip} rotate={p.rot} />
                </motion.div>
            ))}
        </div>
    );
};

export default HuellaTrail;
