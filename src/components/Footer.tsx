import React from 'react';
import { Button, Divider } from 'antd';
import { InstagramOutlined, MailOutlined } from '@ant-design/icons';
import { useModalStore } from '../store/modalStore';
import { withAntd } from '../lib/antd';
import Logo from './ui/Logo';

const abrir = (m: 'about' | 'contact' | 'legal' | 'guarantee') => useModalStore.getState().openModal(m);
const irA = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Enlace: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <li>
        <button onClick={onClick} className="text-gris hover:text-azul transition-colors text-left">
            {children}
        </button>
    </li>
);

function Footer() {
    return (
        <footer className="bg-white border-t border-linea">
            <div className="contenedor pt-16 pb-24 md:pb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-12">
                    <div className="col-span-2">
                        <Logo className="h-8" />
                        <p className="mt-5 text-lg font-semibold text-tinta">Toda transformación comienza con un paso.</p>
                        <p className="mt-3 max-w-sm text-gris leading-relaxed">
                            Ayudamos a academias, profesores y alumnos a enfocarse en crecer, conectar y transformar vidas,
                            mientras la tecnología organiza el camino.
                        </p>
                        <div className="mt-6 flex gap-2">
                            <Button shape="circle" size="large" icon={<InstagramOutlined />} href="#" aria-label="Instagram" />
                            <Button shape="circle" size="large" icon={<MailOutlined />} href="mailto:contacto@passodance.com" aria-label="Correo" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-tinta mb-5">Producto</h2>
                        <ul className="space-y-3 text-[15px]">
                            <Enlace onClick={() => irA('producto')}>Producto</Enlace>
                            <Enlace onClick={() => irA('alumnos')}>App alumnos</Enlace>
                            <Enlace onClick={() => irA('pricing')}>Precios</Enlace>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-tinta mb-5">Compañía</h2>
                        <ul className="space-y-3 text-[15px]">
                            <Enlace onClick={() => abrir('about')}>Sobre nosotros</Enlace>
                            <Enlace onClick={() => abrir('contact')}>Contacto</Enlace>
                            <Enlace onClick={() => abrir('legal')}>Privacidad</Enlace>
                        </ul>
                    </div>
                </div>
                <Divider className="!my-10" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-suave">
                    <p>© {new Date().getFullYear()} Passo. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <button className="hover:text-azul transition-colors" onClick={() => abrir('legal')}>Términos</button>
                        <button className="hover:text-azul transition-colors" onClick={() => abrir('legal')}>Cookies</button>
                        <button className="hover:text-azul transition-colors" onClick={() => abrir('guarantee')}>Seguridad</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default withAntd(Footer);
