import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import shots from '../../scripts/screenshots/shots.config.json';

// Slides del carrusel del Hero. Las imágenes las genera scripts/screenshots
// (ver README); los textos alternativos salen del mismo shots.config.json.
const slides = shots.slides.map((s, i) => ({
    id: s.id,
    label: s.label,
    laptop: `/images/hero/slide-${i + 1}-laptop.webp`,
    phone: `/images/hero/slide-${i + 1}-phone.webp`,
    alt: s.alt,
}));

const INTERVALO_MS = 5000;
const SWIPE_PX = 60;

const HeroCarousel = () => {
    const [actual, setActual] = useState(0);
    const [pausado, setPausado] = useState(false);
    const reducirMovimiento = useReducedMotion();
    const total = slides.length;

    const ir = useCallback((i: number) => setActual(((i % total) + total) % total), [total]);

    // Avance automático (no corre con movimiento reducido ni en pausa)
    useEffect(() => {
        if (pausado || reducirMovimiento) return;
        const t = window.setTimeout(() => ir(actual + 1), INTERVALO_MS);
        return () => window.clearTimeout(t);
    }, [actual, pausado, reducirMovimiento, ir]);

    // Precarga el siguiente slide para que no parpadee al entrar
    useEffect(() => {
        const sig = slides[(actual + 1) % total];
        [sig.laptop, sig.phone].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [actual, total]);

    const duracion = reducirMovimiento ? 0 : 0.6;
    const slide = slides[actual];

    return (
        <div
            role="region"
            aria-roledescription="carrusel"
            aria-label="Pantallas de Passo"
            className="relative"
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
            onFocus={() => setPausado(true)}
            onBlur={() => setPausado(false)}
        >
            {/* Laptop: define el alto del bloque (imágenes cuadradas 1750×1750) */}
            <motion.div
                className="relative w-[108%] max-w-none -ml-8 aspect-square cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_PX) ir(actual + 1);
                    else if (info.offset.x > SWIPE_PX) ir(actual - 1);
                }}
            >
                <AnimatePresence initial={false}>
                    <motion.img
                        key={slide.laptop}
                        src={slide.laptop}
                        alt={slide.alt.laptop}
                        width={1750}
                        height={1750}
                        draggable={false}
                        fetchPriority={actual === 0 ? 'high' : 'auto'}
                        decoding="async"
                        className="absolute inset-0 w-full h-full select-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: duracion, ease: 'easeOut' }}
                    />
                </AnimatePresence>
            </motion.div>

            {/* Celular encima, misma posición que la imagen anterior del Hero */}
            <div className="absolute bottom-0 -right-20 w-[65%] aspect-square pointer-events-none">
                <AnimatePresence initial={false}>
                    <motion.img
                        key={slide.phone}
                        src={slide.phone}
                        alt={slide.alt.phone}
                        width={1625}
                        height={1625}
                        draggable={false}
                        decoding="async"
                        className="absolute inset-0 w-full h-full drop-shadow-2xl select-none"
                        initial={{ opacity: 0, y: reducirMovimiento ? 0 : 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reducirMovimiento ? 0 : -12 }}
                        transition={{ duration: duracion, ease: 'easeOut', delay: reducirMovimiento ? 0 : 0.1 }}
                    />
                </AnimatePresence>
            </div>

            {/* Controles: nombre del slide + puntos */}
            <div className="relative mt-2 flex items-center justify-center gap-4">
                <span
                    className="font-mono text-xs uppercase tracking-widest text-claro/60 min-w-[13rem] text-right"
                    aria-live={pausado ? 'polite' : 'off'}
                >
                    {slide.label}
                </span>
                <div className="flex items-center gap-1">
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => ir(i)}
                            aria-label={`Ver ${i + 1} de ${total}: ${s.label}`}
                            aria-current={i === actual ? 'true' : undefined}
                            className="w-11 h-11 flex items-center justify-center group"
                        >
                            <span
                                className={`block h-1.5 rounded-full transition-all duration-300 ${
                                    i === actual ? 'w-8 bg-azul' : 'w-3 bg-claro/25 group-hover:bg-claro/50'
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
