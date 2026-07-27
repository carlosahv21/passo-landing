import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { useModalStore } from '../store/modalStore';

const Footer = () => {
    return (
        <footer className="py-24 border-t border-claro/10 bg-[#0A0D12]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/images/logo-passo.webp" alt="" className="h-10 w-auto" />
                            <span className="font-display text-3xl font-semibold tracking-tight text-claro">Passo</span>
                        </div>
                        <p className="font-display italic text-xl text-claro/70 mb-6">
                            Toda transformación comienza con un paso.
                        </p>
                        <p className="text-claro/40 max-w-sm mb-10 leading-relaxed">
                            Ayudamos a academias, profesores y alumnos a enfocarse en crecer,
                            conectar y transformar vidas, mientras la tecnología organiza el camino.
                        </p>
                        <div className="flex gap-4">
                            <a aria-label="Instagram" className="w-11 h-11 rounded-full bg-pista border border-claro/10 flex items-center justify-center hover:border-azul transition-colors" href="#">
                                <Instagram size={18} className="text-claro/60" />
                            </a>
                            <a aria-label="Correo" className="w-11 h-11 rounded-full bg-pista border border-claro/10 flex items-center justify-center hover:border-azul transition-colors" href="mailto:hola@passo.app">
                                <Mail size={18} className="text-claro/60" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-claro mb-8">Producto</h5>
                        <ul className="space-y-4 text-sm text-claro/50">
                            <li><button className="hover:text-claro transition-colors" onClick={() => document.getElementById('producto')?.scrollIntoView({ behavior: 'smooth' })}>Producto</button></li>
                            <li><button className="hover:text-claro transition-colors" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Precios</button></li>
                            <li><a className="hover:text-claro transition-colors" href="#">Próximamente</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-claro mb-8">Compañía</h5>
                        <ul className="space-y-4 text-sm text-claro/50">
                            <li><button className="hover:text-claro transition-colors text-left" onClick={() => useModalStore.getState().openModal('about')}>Sobre nosotros</button></li>
                            <li><button className="hover:text-claro transition-colors text-left" onClick={() => useModalStore.getState().openModal('contact')}>Contacto</button></li>
                            <li><button className="hover:text-claro transition-colors text-left" onClick={() => useModalStore.getState().openModal('legal')}>Privacidad</button></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-10 border-t border-claro/10 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[11px] font-bold text-claro/30 uppercase tracking-[0.2em]">
                    <p>© {new Date().getFullYear()} Passo. Todos los derechos reservados.</p>
                    <div className="flex gap-8">
                        <button className="hover:text-claro/60 transition-colors uppercase" onClick={() => useModalStore.getState().openModal('legal')}>Términos</button>
                        <button className="hover:text-claro/60 transition-colors uppercase" onClick={() => useModalStore.getState().openModal('legal')}>Cookies</button>
                        <button className="hover:text-claro/60 transition-colors uppercase" onClick={() => useModalStore.getState().openModal('guarantee')}>Seguridad</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
