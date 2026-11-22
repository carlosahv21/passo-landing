#!/usr/bin/env node
// Captura los pantallazos web del carrusel del Hero con Playwright.
//
// Requisitos (en passo): backend y web corriendo en local con la academia demo
// (npm run seed:demo). Credenciales del admin demo por variables de entorno:
//   PASSO_DEMO_EMAIL=... PASSO_DEMO_PASSWORD=... node scripts/screenshots/capture-web.mjs
// Opcional: --slide 2 para capturar solo ese slide.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const conf = JSON.parse(fs.readFileSync(path.join(HERE, 'shots.config.json'), 'utf8'));
const web = conf.web;
const rawDir = path.join(HERE, conf.rawDir || 'raw');
fs.mkdirSync(rawDir, { recursive: true });

const onlyIdx = process.argv.indexOf('--slide');
const only = onlyIdx > -1 ? Number(process.argv[onlyIdx + 1]) : null;

const email = process.env[web.login.emailEnv];
const password = process.env[web.login.passwordEnv];
if (!email || !password) {
  console.error(`Faltan ${web.login.emailEnv} y ${web.login.passwordEnv}.`);
  process.exit(1);
}

const hideCss = `${web.hideSelectors.join(',')} { display: none !important; }
*, *::before, *::after { caret-color: transparent !important; transition: none !important; animation-duration: 0s !important; }`;

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: web.viewport,
  deviceScaleFactor: web.deviceScaleFactor,
  locale: 'es-CO',
  timezoneId: 'America/Bogota',
});
const page = await context.newPage();

// Login
await page.goto(web.baseUrl + web.login.path, { waitUntil: 'networkidle' });
// AntD (Form name="login-form") no pone el atributo name en el input: el id es login-form_<campo>
await page.locator('#login-form_email, input[name="email"]').first().fill(email, { timeout: 15000 });
const pass = page.locator('#login-form_password, input[name="password"]').first();
await pass.fill(password);
await pass.press('Enter');
await page.waitForFunction(() => !!localStorage.getItem('token'), null, { timeout: 15000 });
console.log('Sesión iniciada.');

// {topStudent} en una ruta = el alumno con más logros desbloqueados (o PASSO_DEMO_STUDENT_ID)
let topStudent = process.env.PASSO_DEMO_STUDENT_ID || null;
async function resolverTopStudent() {
  if (topStudent) return topStudent;
  topStudent = await page.evaluate(async (apiUrl) => {
    const res = await fetch(`${apiUrl}/user-achievements?limit=1000`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const body = await res.json();
    const filas = Array.isArray(body.data) ? body.data : body.data?.data ?? [];
    const conteo = {};
    for (const f of filas) conteo[f.user_id] = (conteo[f.user_id] || 0) + 1;
    return Object.entries(conteo).sort((x, y) => y[1] - x[1])[0]?.[0] ?? null;
  }, web.apiUrl);
  if (!topStudent) throw new Error('Ningún alumno tiene logros: corre el seed demo o define PASSO_DEMO_STUDENT_ID.');
  console.log(`Alumno con más logros: ${topStudent}`);
  return topStudent;
}

let n = 0;
for (const [i, s] of conf.slides.entries()) {
  if (only && only !== i + 1) continue;
  if (!s.web.path) {
    console.log(`Slide ${i + 1} (${s.id}): sin ruta web, se exporta del mockup -> raw/${s.web.file}`);
    continue;
  }
  let ruta = s.web.path;
  if (ruta.includes('{topStudent}')) ruta = ruta.replace('{topStudent}', await resolverTopStudent());
  await page.goto(web.baseUrl + ruta, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: hideCss });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(web.settleMs);
  const out = path.join(rawDir, s.web.file);
  if (s.web.element) {
    // Solo un elemento de la pantalla (p. ej. una notificación), con un margen del fondo
    const el = s.web.element;
    // hide: oculta sin mover nada (visibility) · remove: lo quita del flujo (display: none)
    if (el.hide?.length) await page.addStyleTag({ content: `${el.hide.join(',')} { visibility: hidden !important; }` });
    if (el.remove?.length) await page.addStyleTag({ content: `${el.remove.join(',')} { display: none !important; }` });
    let loc = page.locator(el.selector);
    if (el.text) loc = loc.filter({ hasText: el.text });
    // pick "last": el más interno cuando el selector también coincide con contenedores
    loc = el.pick === 'last' ? loc.last() : loc.first();
    await loc.waitFor({ state: 'visible', timeout: 15000 });
    // style / childStyle: reacomoda el elemento solo para la foto (p. ej. KPIs en 2x2,
    // notificación más angosta) para que se lea bien dentro del laptop
    if (el.style || el.childStyle) {
      await loc.evaluate((node, { style, childStyle }) => {
        if (style) Object.assign(node.style, style);
        if (childStyle) for (const c of node.children) Object.assign(c.style, childStyle);
      }, { style: el.style, childStyle: el.childStyle });
      await page.waitForTimeout(400);
    }
    await loc.scrollIntoViewIfNeeded();
    const box = await loc.boundingBox();
    const pad = el.padding ?? 24;
    await page.screenshot({
      path: out,
      clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 },
    });
  } else {
    await page.screenshot({ path: out });
  }
  console.log(`Slide ${i + 1} (${s.id}): ${s.web.path} -> raw/${s.web.file}`);
  n++;
}

await browser.close();
console.log(`Listo: ${n} pantallazos web.`);
