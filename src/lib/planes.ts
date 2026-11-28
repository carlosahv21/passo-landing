// Planes de Passo: el plan se define por alumnos activos del mes y el tipo de
// funcionalidades (Básico o Pro) se elige aparte, en cualquiera de los planes.
// Precios fijos en COP por mes (propuesta comercial V1, pendiente de validar).

export type Tipo = 'basico' | 'pro';
export type PlanId = 'estudio' | 'academia' | 'compania';

export interface Plan {
    id: PlanId;
    nombre: string;
    alumnos: string;
    /** Máximo de alumnos activos del plan; null = sin tope. */
    max: number | null;
    descripcion: string;
    precio: Record<Tipo, number>;
    destacado?: boolean;
}

export const PLANES: Plan[] = [
    {
        id: 'estudio',
        nombre: 'Estudio',
        alumnos: 'Hasta 50 alumnos activos',
        max: 50,
        descripcion: 'Para academias que están empezando o tienen pocos grupos.',
        precio: { basico: 49900, pro: 79900 },
    },
    {
        id: 'academia',
        nombre: 'Academia',
        alumnos: 'De 51 a 150 alumnos activos',
        max: 150,
        descripcion: 'Para academias con varias clases y profesores en marcha.',
        precio: { basico: 99900, pro: 139900 },
        destacado: true,
    },
    {
        id: 'compania',
        nombre: 'Compañía',
        alumnos: 'Más de 150 alumnos activos',
        max: null,
        descripcion: 'Para academias grandes, con muchos grupos y movimiento diario.',
        precio: { basico: 179900, pro: 229900 },
    },
];

export const TIPOS: Record<Tipo, { nombre: string; resumen: string; funcionalidades: string[] }> = {
    basico: {
        nombre: 'Básico',
        resumen: 'Todo lo esencial para organizar tu academia y dejar los cuadernos atrás.',
        funcionalidades: [
            'Hasta 3 administradores',
            '1 reporte personalizado',
            'Módulos cruzados por reporte: 2',
            'Historial de reportes: 180 días',
            'App móvil completa',
        ],
    },
    pro: {
        nombre: 'Pro',
        resumen: 'Para decidir con datos: todo lo del Básico, sin límites y con reportes a tu medida.',
        funcionalidades: [
            'Administradores ilimitados',
            '5 reportes personalizados',
            'Módulos cruzados por reporte: 3',
            'Historial de reportes completo',
            'Módulo de costos de academia',
            'Dashboard personalizable por rol',
            'App móvil completa',
        ],
    },
};

// Demo: prueba gratis con todas las funcionalidades Pro, en cualquier plan, por tiempo limitado.
// Al vencer, la academia elige su plan (según alumnos activos) y el tipo (Básico o Pro).
// Diferencias entre Básico y Pro (true = incluido, false = no incluido, texto = límite)
// `corto`: nombre para celular, para que cada fila quepa en una sola línea
export const COMPARACION: { funcion: string; corto?: string; basico: string | boolean; pro: string | boolean }[] = [
    { funcion: 'Administradores', basico: 'Hasta 3', pro: 'Ilimitados' },
    { funcion: 'Reportes personalizados', corto: 'Reportes a medida', basico: '1', pro: '5' },
    { funcion: 'Módulos cruzados por reporte', corto: 'Módulos por reporte', basico: '2', pro: '3' },
    { funcion: 'Historial de reportes', basico: '180 días', pro: 'Completo' },
    { funcion: 'Módulo de costos de academia', corto: 'Módulo de costos', basico: false, pro: true },
    { funcion: 'Dashboard personalizable por rol', corto: 'Dashboard por rol', basico: false, pro: true },
    { funcion: 'App móvil completa', basico: true, pro: true },
];

export const DEMO = {
    dias: 30,
    tipo: 'pro' as Tipo,
};

/** Plan que corresponde a una cantidad de alumnos activos. */
export function planPorAlumnos(alumnos: number): Plan {
    return PLANES.find((p) => p.max === null || alumnos <= p.max) ?? PLANES[PLANES.length - 1];
}

export const fmtCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
});
