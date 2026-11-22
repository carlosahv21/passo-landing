#!/usr/bin/env node
// Genera src/styles/antd.css con los estilos de los componentes de Ant Design que usa
// la landing, con el tema de src/lib/antd-theme.json. Astro renderiza las islas en el
// servidor y Ant Design inyecta su CSS al hidratar: sin este archivo, la página se ve
// sin estilos un instante. Corre solo antes de dev y build (predev / prebuild).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { ConfigProvider } from 'antd';
import { extractStyle } from '@ant-design/static-style-extract';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const theme = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/lib/antd-theme.json'), 'utf8'));

// Agregar aquí cualquier componente nuevo de Ant Design que use la landing
const includes = [
    'Alert', 'Avatar', 'Badge', 'Button', 'Card', 'Divider', 'Drawer', 'Form', 'Input',
    'Modal', 'Progress', 'Segmented', 'Slider', 'Spin', 'Statistic', 'Tag', 'Typography',
];

const css = extractStyle({
    includes,
    customTheme: (node) => React.createElement(ConfigProvider, { theme }, node),
});

// Las variables del tema quedan bajo una clase .css-var-<id> generada con useId, que
// no coincide con la que React pone en el HTML del servidor: se pasan a :root.
const global = css
    .replace(/\.css-var-[A-Za-z0-9_-]+(?=\{)/g, ':root')
    .replace(/\.css-var-[A-Za-z0-9_-]+(?=\.)/g, '');

const out = path.join(ROOT, 'src/styles/antd.css');
fs.writeFileSync(out, `/* Generado por scripts/antd-css.mjs — no editar a mano */\n${global}\n`);
console.log(`antd.css: ${(css.length / 1024).toFixed(0)} KB, ${includes.length} componentes`);
