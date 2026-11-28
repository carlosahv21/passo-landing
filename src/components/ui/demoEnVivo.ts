import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Datos de ejemplo del Hero que se mueven solos, para que la escena se vea "en vivo".
// Un solo estado alimenta el panel web, el celular y las tarjetas, así todo cuadra entre sí:
// un pago sube los ingresos en el panel y en el celular; una llegada mueve la asistencia y el cupo de la clase.

export type Pago = { id: string; nombre: string; detalle: string; monto: number | null; color: string; nuevo?: boolean };
export type Clase = { nombre: string; hora: string; presentes: number; total: number };
export type Riesgo = { n: string; c: string; color: string; volvio?: boolean };
export type Aviso = { id: string; tipo: 'pago' | 'asistencia' | 'inscripcion'; titulo: string; detalle: string };

export type DemoEnVivo = {
    pagos: Pago[];
    ingresos: number;
    alumnos: number;
    asistenciaMes: number;
    clases: Clase[];
    claseActual: number;
    ultimaLlegada: string | null;
    enRiesgo: Riesgo[];
    nPagos: number;
    aviso: Aviso | null;
};

const pagosIniciales: Pago[] = [
    { id: 'vg', nombre: 'Valeria Gómez', detalle: 'Mensualidad · hoy', monto: 110000, color: '#0A84FF' },
    { id: 'ar', nombre: 'Andrés Ríos', detalle: 'Paquete 8 clases · ayer', monto: 95000, color: '#22A06B' },
    { id: 'ct', nombre: 'Camila Torres', detalle: 'Mensualidad · vence hoy', monto: null, color: '#F2B33D' },
];

// El primero salda el pendiente de Camila
const pagosEntrantes = [
    { nombre: 'Camila Torres', detalle: 'Mensualidad', monto: 110000, color: '#F2B33D' },
    { nombre: 'Mateo Ruiz', detalle: 'Paquete 8 clases', monto: 95000, color: '#FF7A45' },
    { nombre: 'Laura Peña', detalle: 'Mensualidad', monto: 110000, color: '#722ED1' },
    { nombre: 'Daniel Castro', detalle: 'Paquete 4 clases', monto: 60000, color: '#22A06B' },
    { nombre: 'Juliana Díaz', detalle: 'Mensualidad', monto: 110000, color: '#0A84FF' },
];

// Quienes van llegando a clase y marcan con su QR (Sofía y Laura estaban en riesgo)
const llegadas = ['Juan Pérez', 'Sofía Herrera', 'Mariana López', 'Tomás Gil', 'Laura Peña', 'Isabela Ruiz', 'Santiago Mora'];

const inscripciones = ['Paula Mejía', 'Samuel Ortiz', 'Valentina Rojas'];

const clasesIniciales: Clase[] = [
    { nombre: 'Salsa caleña', hora: '6:00 p. m.', presentes: 18, total: 21 },
    { nombre: 'Bachata', hora: '7:30 p. m.', presentes: 12, total: 16 },
];

const riesgoInicial: Riesgo[] = [
    { n: 'Sofía Herrera', c: 'Sin asistir hace 12 días', color: '#F2B33D' },
    { n: 'Mateo Ruiz', c: 'Pago vencido', color: '#FF7A45' },
    { n: 'Laura Peña', c: 'Asistencia bajando', color: '#0A84FF' },
];

export const demoInicial: DemoEnVivo = {
    pagos: pagosIniciales,
    ingresos: 8450000,
    alumnos: 132,
    asistenciaMes: 87,
    clases: clasesIniciales,
    claseActual: 0,
    ultimaLlegada: null,
    enRiesgo: riesgoInicial,
    nPagos: 0,
    aviso: null,
};

const nombreCorto = (n: string) => n.split(' ')[0];
const pesosCortos = (n: number) => `$${n.toLocaleString('es-CO')}`;

// Un pago: entra arriba en "Pagos recientes", suma a los ingresos y, si debía, sale de "en riesgo"
function llegaPago(d: DemoEnVivo, i: number): DemoEnVivo {
    const base = pagosEntrantes[i % pagosEntrantes.length];
    const nuevo: Pago = { ...base, id: `pago-${i}`, detalle: `${base.detalle} · ahora`, nuevo: true };
    return {
        ...d,
        pagos: [
            nuevo,
            ...d.pagos
                .filter((x) => x.nombre !== nuevo.nombre)
                .map((x) => ({ ...x, nuevo: false, detalle: x.detalle.replace('· ahora', '· hoy') })),
        ].slice(0, 3),
        ingresos: d.ingresos + base.monto,
        nPagos: d.nPagos + 1,
        enRiesgo: d.enRiesgo.map((r) => (r.n === base.nombre && r.c === 'Pago vencido' ? { ...r, c: 'Se puso al día', volvio: true } : r)),
        aviso: { id: `aviso-pago-${i}`, tipo: 'pago', titulo: `${nombreCorto(base.nombre)} pagó ${pesosCortos(base.monto)}`, detalle: base.detalle },
    };
}

// Una llegada a clase: suma presentes; cuando la clase se llena pasa a la siguiente y, al final, vuelve a empezar
function llegaAlumno(d: DemoEnVivo, i: number): DemoEnVivo {
    const nombre = llegadas[i % llegadas.length];
    let clases = d.clases;
    let actual = d.claseActual;
    if (clases[actual].presentes >= clases[actual].total) {
        actual = (actual + 1) % clases.length;
        if (actual === 0) clases = clasesIniciales;
    }
    clases = clases.map((c, k) => (k === actual ? { ...c, presentes: Math.min(c.presentes + 1, c.total) } : c));
    return {
        ...d,
        clases,
        claseActual: actual,
        ultimaLlegada: nombre,
        asistenciaMes: Math.min(d.asistenciaMes + (i % 3 === 2 ? 1 : 0), 92),
        enRiesgo: d.enRiesgo.map((r) => (r.n === nombre ? { ...r, c: 'Volvió a clase hoy', volvio: true } : r)),
        aviso: { id: `aviso-asis-${i}`, tipo: 'asistencia', titulo: `${nombreCorto(nombre)} marcó asistencia`, detalle: `${clases[actual].nombre} · con QR` },
    };
}

function llegaInscripcion(d: DemoEnVivo, i: number): DemoEnVivo {
    const nombre = inscripciones[i % inscripciones.length];
    return {
        ...d,
        alumnos: d.alumnos + 1,
        aviso: { id: `aviso-insc-${i}`, tipo: 'inscripcion', titulo: 'Nueva inscripción', detalle: `${nombre} se unió a la academia` },
    };
}

const PRIMER_EVENTO_MS = 3000;
const PASO_MS = 2000; // pagos y llegadas se alternan: cada tipo se repite cada 4 s

export function useDemoEnVivo(): DemoEnVivo {
    const reducir = useReducedMotion();
    const [demo, setDemo] = useState<DemoEnVivo>(demoInicial);

    useEffect(() => {
        if (reducir) return;
        let paso = 0;
        let intervalo: number | undefined;
        const avanzar = () => {
            const n = Math.floor(paso / 2);
            const esPago = paso % 2 === 0;
            const tocaInscripcion = paso % 6 === 5;
            setDemo((d) => {
                if (tocaInscripcion) return llegaInscripcion(d, Math.floor(paso / 6));
                return esPago ? llegaPago(d, n) : llegaAlumno(d, n);
            });
            paso += 1;
        };
        const inicio = window.setTimeout(() => {
            avanzar();
            intervalo = window.setInterval(avanzar, PASO_MS);
        }, PRIMER_EVENTO_MS);
        return () => {
            window.clearTimeout(inicio);
            window.clearInterval(intervalo);
        };
    }, [reducir]);

    return demo;
}
