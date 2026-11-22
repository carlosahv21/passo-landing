# Passo — Landing Page

> Toda transformación comienza con un paso.

Landing page de **Passo**, la plataforma de gestión para academias de baile: pagos, asistencia y progreso de alumnos, para que las academias dediquen menos tiempo a administrar y más tiempo a transformar vidas.

## Secciones

- **Hero**: banda azul con borde diagonal, titular centrado, panel web + celular con tarjetas flotantes y dos notas a mano; franja "Hecho para academias de baile".
- **Retos**: pagos desordenados, asistencias dispersas, deserción invisible → "Passo organiza todo eso."
- **Producto** (`#producto`): gestiona, analiza y haz crecer tu academia.
- **App alumnos** (`#alumnos`): mockup de teléfono (racha, QR, progreso) hecho en HTML/CSS.
- **Para quién** (`#para-quien`): Academias / Profesores / Alumnos.
- **Manifiesto**: "El baile conecta personas. El baile transforma vidas."
- **Calculadora** (`#calculadora`): alumnos a retener según alumnos activos, tipo (Básico/Pro) y mensualidad.
- **Precios** (`#pricing`): planes Estudio / Academia / Compañía por alumnos activos, cada uno con funcionalidades Básicas o Pro (precios fijos en COP en `src/lib/planes.ts`). La Demo no es un plan: son 30 días gratis con funcionalidades Pro en cualquier plan.
- **CTA final**: "¿Listo para dar el siguiente paso?"

## Ilustraciones

Las imágenes de la landing (panel web, celulares, tarjetas de "Para quién") están hechas con
componentes de Ant Design y datos de ejemplo, sobre las formas de fondo de `ui/Formas.tsx`.
No hay fotos pendientes por subir.

## Identidad

- Mismo lenguaje visual que el dashboard de Passo en modo claro: azul `#0A84FF`, fuente Inter y
  componentes de [Ant Design](https://ant.design/components/) (tema en `src/lib/antd-theme.json`).
- Paleta en `tailwind.config.mjs`: `tinta` `#1D2433`, `gris` `#5F6B7A`, `fondo` `#F4F7FB`, `linea` `#E3E8EF`, `azul` `#0A84FF`, `oro` `#F2B33D`.
- Anotaciones a mano (Caveat) solo en el Hero. Símbolo: la huella (`src/components/Huella.tsx`).
- Cada isla se envuelve con `withAntd` (`src/lib/antd.tsx`). `scripts/antd-css.mjs` genera
  `src/styles/antd.css` antes de `dev`/`build` para que la página no se vea sin estilos antes de hidratar;
  si usas un componente nuevo de Ant Design, agrégalo a su lista `includes`.

## Tech Stack

- [Astro](https://astro.build/) + [React](https://react.dev/) (islands con `client:load` / `client:visible`)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animaciones (respeta `prefers-reduced-motion`)
- [Ant Design](https://ant.design/) + `@ant-design/icons` — componentes e iconos
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
