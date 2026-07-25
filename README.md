# Passo — Landing Page

> Toda transformación comienza con un paso.

Landing page de **Passo**, la plataforma de gestión para academias de baile: pagos, asistencia y progreso de alumnos, para que las academias dediquen menos tiempo a administrar y más tiempo a transformar vidas.

## Secciones

- **Hero**: slogan de marca + foto de bailarina + mockup del dashboard.
- **Retos**: pagos desordenados, asistencias dispersas, deserción invisible → "Passo organiza todo eso."
- **Producto** (`#producto`): gestiona, analiza y haz crecer tu academia.
- **App alumnos** (`#alumnos`): mockup de teléfono (racha, QR, progreso) hecho en HTML/CSS.
- **Para quién** (`#para-quien`): Academias / Profesores / Alumnos.
- **Manifiesto**: "El baile conecta personas. El baile transforma vidas."
- **Calculadora** (`#calculadora`): alumnos a retener según plan y mensualidad.
- **Precios** (`#pricing`): Demo / Básico / Pro por alumno en COP (TRM viva).
- **CTA final**: "¿Listo para dar el siguiente paso?"
- Rastro decorativo de huellas azul/oro por el margen izquierdo (`HuellaTrail.tsx`).

## Imágenes pendientes de subir

Los slots con gradiente (`MediaSlot.tsx`) esperan estos archivos en `public/images/`;
al subirlos, reemplazar el `<MediaSlot>` correspondiente por un `<img>`:

- `hero-dancer.png` — bailarina del hero
- `quien-academias.jpg`, `quien-profesores.jpg`, `quien-alumnos.jpg` — cards "Para quién"

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
