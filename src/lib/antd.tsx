import React from 'react';
import { ConfigProvider, type ThemeConfig } from 'antd';
import esES from 'antd/locale/es_ES';
import tema from './antd-theme.json';

// Tema claro del dashboard de Passo (#0A84FF, Inter). El mismo JSON genera el CSS
// estático de src/styles/antd.css (scripts/antd-css.mjs), así la página se ve bien
// antes de que React hidrate cada isla.
export const theme = tema as ThemeConfig;

export const AntdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ConfigProvider theme={theme} locale={esES}>
        {children}
    </ConfigProvider>
);

/** Envuelve una isla de Astro con el tema de Ant Design. */
export function withAntd<P extends object>(Componente: React.ComponentType<P>) {
    const ConTema = (props: P) => (
        <AntdProvider>
            <Componente {...props} />
        </AntdProvider>
    );
    ConTema.displayName = `withAntd(${Componente.displayName || Componente.name || 'Isla'})`;
    return ConTema;
}
