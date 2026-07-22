# Passo — Landing Page

> Toda transformación comienza con un paso.

Landing page de **Passo**, la plataforma de gestión para academias de baile: pagos, asistencia y progreso de alumnos, para que las academias dediquen menos tiempo a administrar y más tiempo a transformar vidas.

## Secciones

- **Hero**: slogan de marca + diagrama animado de paso básico de salsa (huellas con conteo 1-2-3, 5-6-7).
- **Marquee**: géneros de baile en movimiento continuo.
- **Dolores**: fuga de capital, deserción de alumnos, caos operativo.
- **Manifiesto**: "El baile conecta personas. El baile transforma vidas."
- **El camino (Paso 01/02/03)**: cobranza sin fricción, agenda bajo control, la huella de cada alumno.
- **Precios**: Primer paso (gratis) / En movimiento / Gran salón, con toggle mensual/anual.

## Identidad

- Paleta "noche eléctrica": `noche` `#0E1116`, `claro` `#E8EDF4`, `azul` `#0A84FF`, `oro` `#F2B33D`, `cielo` `#4DA3FF` (definida en `tailwind.config.mjs`).
- Tipografía: Fraunces (display), Figtree (cuerpo), Space Grotesk (etiquetas y números).
- Símbolo: la huella (`src/components/Huella.tsx`), usada como logo, checks y rastro de fondo.

## Tech Stack

- [Astro](https://astro.build/) + [React](https://react.dev/) (islands con `client:load` / `client:visible`)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animaciones (respeta `prefers-reduced-motion`)
- [Lucide React](https://lucide.dev/) — iconos
- [Zustand](https://zustand-demo.pmnd.rs/) — estado de modales

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando           | Acción                                               |
| :---------------- | :--------------------------------------------------- |
| `npm install`     | Instala las dependencias del proyecto                |
| `npm run dev`     | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`   | Compila el sitio para producción en `./dist/`        |
| `npm run preview` | Vista previa del build localmente                    |

> Gestor de paquetes: **npm** (único lockfile: `package-lock.json`).

## Estructura del Proyecto

```text
/
├── public/         # Activos estáticos (imágenes, favicon)
├── src/
│   ├── components/ # Componentes React (Hero, Steps, Pricing, Huella…)
│   ├── layouts/    # Plantilla base (fuentes, meta)
│   ├── pages/      # Rutas del sitio
│   ├── store/      # Estado de modales (Zustand)
│   └── styles/     # Estilos globales
└── package.json
```
