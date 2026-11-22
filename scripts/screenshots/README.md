# Pantallazos del carrusel del Hero

Genera las imágenes de `public/images/hero/` (laptop + celular por slide) a partir de
pantallazos reales de Passo. Los slides, rutas y textos alternativos están en
`shots.config.json`.

## Requisitos (una sola vez)

- `npm install` en passo-landing (instala Playwright) y `npx playwright install chromium`
- `pip3 install pillow numpy`
- `adb` para Android: `brew install --cask android-platform-tools`

## Flujo

1. En `passo`: `npm run seed:demo` y levantar backend + web en local.
2. Web: `PASSO_DEMO_EMAIL=... PASSO_DEMO_PASSWORD=... npm run shots:web`
   (usuario admin que crea el seed demo; ver `apps/backend/db/seeds/demo/create_fake_data.js`).
3. App: celular por cable con la app abierta en la academia demo, `npm run shots:app`
   y seguir las indicaciones (abrir cada pantalla y Enter).
4. Mockup de la landing de academia: exportar escritorio y celular a
   `raw/4-landing-web.png` y `raw/4-landing-app.png`.
5. `npm run shots:compose` arma `public/images/hero/slide-N-{laptop,phone}.{webp,png}`.

Un solo slide: agregar `-- --slide N` a cualquiera de los comandos.

## Marcos

`frames/` tiene el laptop y el celular con la pantalla transparente, la máscara de cada
pantalla y sus coordenadas (`frames.json`: rectángulo del laptop, 4 esquinas del celular).
El pantallazo web se toma a 1440x922 para que coincida con la proporción de la pantalla
del laptop. En el celular, `compose.py` recorta las barras de Android y dibuja una barra
de estado iOS a las 9:41.

`raw/` no se versiona.

## Slide con un solo elemento

Si un slide tiene `web.element` en `shots.config.json`, la captura toma solo ese elemento
(`selector` + `text` para elegir cuál, `hide` para ocultar botones dentro de él, `padding`
en px CSS) y `compose.py` lo pone arriba y centrado en la pantalla del laptop, sobre el
color de fondo de la app (`widthRatio` y `topRatio` opcionales). `pick: "last"` toma el
elemento más interno cuando el selector también coincide con contenedores. Lo usan los
tres slides web: la fila de KPIs, una notificación y los logros de un alumno.

`{topStudent}` en una ruta se reemplaza por el alumno con más logros desbloqueados
(consulta `web.apiUrl` con la sesión iniciada). Para fijar uno: `PASSO_DEMO_STUDENT_ID=<id>`.

