import React from 'react';
import { motion } from 'framer-motion';

// Aparición suave al entrar en pantalla (una sola vez)
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string; y?: number }> = ({
    children,
    delay = 0,
    className,
    y = 24,
}) => (
    <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-60px' }}
        className={className}
    >
        {children}
    </motion.div>
);

export default Reveal;
