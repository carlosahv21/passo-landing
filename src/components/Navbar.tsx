import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useModalStore } from '../store/modalStore';
import { withAntd } from '../lib/antd';
import Logo from './ui/Logo';

const APP_URL = import.meta.env.PUBLIC_APP_URL;

const links = [
    { id: 'producto', label: 'Producto' },
    { id: 'alumnos', label: 'App alumnos' },
    { id: 'calculadora', label: 'Calculadora' },
    { id: 'pricing', label: 'Precios' },
];

const irA = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const registro = () => useModalStore.getState().openModal('registro');

function Navbar() {
    const [abierto, setAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className="fixed inset-x-0 top-0 z-50 px-3 md:px-6 lg:px-10 pt-4">
            <div
                className={`max-w-[1416px] lg:max-w-[min(1416px,calc(55vw+356px))] mx-auto flex items-center justify-between h-16 pl-5 pr-3 rounded-2xl border transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/90 backdrop-blur-md border-linea shadow-tarjeta'
                        : 'bg-white/95 backdrop-blur-sm border-white shadow-sm'
                }`}
            >
                <a href="/" aria-label="Passo — inicio" className="flex items-center">
                    <Logo className="h-7" />
                </a>

                <div className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <Button key={l.id} type="text" onClick={() => irA(l.id)} className="!text-gris hover:!text-tinta !font-medium">
                            {l.label}
                        </Button>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <Button type="text" href={APP_URL} className="!font-semibold !text-tinta">
                        Iniciar sesión
                    </Button>
                    <Button type="primary" size="large" onClick={registro}>
                        Prueba 30 días gratis
                    </Button>
                </div>

                <Button
                    className="md:!hidden"
                    type="text"
                    size="large"
                    icon={<MenuOutlined />}
                    aria-label="Abrir menú"
                    onClick={() => setAbierto(true)}
                />
            </div>

            <Drawer
                open={abierto}
                onClose={() => setAbierto(false)}
                placement="right"
                size={300}
                title={<Logo className="h-6" />}
                styles={{ body: { display: 'flex', flexDirection: 'column', gap: 4 } }}
            >
                {links.map((l) => (
                    <Button
                        key={l.id}
                        type="text"
                        size="large"
                        block
                        className="!justify-start !font-medium"
                        onClick={() => {
                            setAbierto(false);
                            irA(l.id);
                        }}
                    >
                        {l.label}
                    </Button>
                ))}
                <Button type="text" size="large" block href={APP_URL} className="!justify-start !font-medium">
                    Iniciar sesión
                </Button>
                <Button
                    type="primary"
                    size="large"
                    block
                    className="!mt-4"
                    onClick={() => {
                        setAbierto(false);
                        registro();
                    }}
                >
                    Prueba 30 días gratis
                </Button>
            </Drawer>
        </nav>
    );
}

export default withAntd(Navbar);
