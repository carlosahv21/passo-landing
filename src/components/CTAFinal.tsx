import React from 'react';
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { useModalStore } from '../store/modalStore';
import { withAntd } from '../lib/antd';
import Reveal from './ui/Reveal';
import Huella from './Huella';

function CTAFinal() {
    return (
        <section className="seccion">
            <div className="contenedor">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-azul to-[#0062CC] px-7 py-14 md:px-14 md:py-16 text-white">
                        <svg className="absolute inset-x-0 bottom-0 w-full h-1/2" viewBox="0 0 1200 300" preserveAspectRatio="none" fill="white" aria-hidden="true">
                            <path opacity="0.08" d="M0 160 C 260 60, 460 260, 760 140 S 1080 60, 1200 110 L1200 300 L0 300Z" />
                            <path opacity="0.06" d="M0 230 C 300 150, 560 300, 860 210 S 1120 170, 1200 200 L1200 300 L0 300Z" />
                        </svg>
                        <Huella size={70} rotate={18} className="absolute right-[36%] -top-8 text-white/10" />
                        <div className="relative grid lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-8">
                                <h2 className="t-h2 !text-white">
                                    ¿Listo para dar el siguiente paso?
                                </h2>
                                <p className="mt-4 t-lead text-white/85 max-w-2xl">
                                    Prueba Passo gratis por 30 días con todas las funciones Pro y descubre todo lo que puede
                                    hacer por tu academia.
                                </p>
                            </div>
                            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-end xl:items-center lg:justify-end">
                                <Button
                                    size="large"
                                    className="!bg-white !text-azul !border-white !font-bold hover:!bg-white/90"
                                    onClick={() => useModalStore.getState().openModal('registro')}
                                >
                                    Prueba 30 días gratis
                                </Button>
                                <Button
                                    size="large"
                                    ghost
                                    icon={<MessageOutlined />}
                                    onClick={() => useModalStore.getState().openModal('contact')}
                                >
                                    Habla con nosotros
                                </Button>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default withAntd(CTAFinal);
