import { useEffect, useState } from 'react';

// Precios por alumno/mes en USD; el COP se calcula con la TRM oficial del día
export const USD = { basico: 1, pro: 2 } as const;

// Fallback si la API no responde (por ahora: valores fijos acordados)
export const FALLBACK = { basico: 3500, pro: 7000, trm: null as number | null };

export interface PreciosCOP {
    basico: number;
    pro: number;
    trm: number | null;
}

// TRM oficial — datos.gov.co (Superfinanciera / Banco de la República)
const TRM_URL = 'https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=1&$order=vigenciadesde%20DESC';

let cache: Promise<PreciosCOP> | null = null;

export function getPreciosCOP(): Promise<PreciosCOP> {
    cache ??= fetch(TRM_URL)
        .then((r) => r.json())
        .then(([{ valor }]: Array<{ valor: string }>) => {
            const trm = Number(valor);
            if (!trm || !isFinite(trm)) throw new Error('TRM inválida');
            const round10 = (n: number) => Math.round(n / 10) * 10;
            return { basico: round10(trm * USD.basico), pro: round10(trm * USD.pro), trm };
        })
        .catch(() => ({ ...FALLBACK }));
    return cache;
}

export function usePreciosCOP(): PreciosCOP {
    const [precios, setPrecios] = useState<PreciosCOP>({ ...FALLBACK });
    useEffect(() => {
        let vivo = true;
        getPreciosCOP().then((p) => vivo && setPrecios(p));
        return () => { vivo = false; };
    }, []);
    return precios;
}

export const fmtCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
});
