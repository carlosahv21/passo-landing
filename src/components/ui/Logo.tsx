import React from 'react';

// Logo de Passo para fondo claro (mismo archivo que logo-light.png del dashboard)
const Logo: React.FC<{ className?: string; texto?: boolean }> = ({ className = 'h-8', texto = true }) => (
    <span className="inline-flex items-center gap-2">
        <img src="/images/logo-passo-light.webp" alt="" width={177} height={256} className={`${className} w-auto`} />
        {texto && <span className="text-[22px] font-extrabold tracking-[-0.03em] text-tinta">Passo</span>}
    </span>
);

export default Logo;
