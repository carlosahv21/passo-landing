import React, { useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import InfoModal from './InfoModal';
import Huella from '../Huella';

// URLs por entorno: .env.development (dev) / .env.production (build)
const API_REGISTER_URL = import.meta.env.PUBLIC_API_REGISTER_URL;
const APP_URL = import.meta.env.PUBLIC_APP_URL;

interface RegistroModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Valores {
    academyName: string;
    address?: string;
    logoUrl?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const RegistroModal: React.FC<RegistroModalProps> = ({ isOpen, onClose }) => {
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onFinish = async (v: Valores) => {
        setError(null);
        setEnviando(true);
        try {
            const res = await fetch(API_REGISTER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    academy: {
                        name: v.academyName,
                        ...(v.address && { address: v.address }),
                        ...(v.logoUrl && { logo_url: v.logoUrl }),
                    },
                    user: {
                        first_name: v.firstName,
                        last_name: v.lastName,
                        email: v.email,
                        password: v.password,
                    },
                }),
            });
            if (!res.ok) {
                const cuerpo = await res.json().catch(() => null);
                throw new Error(cuerpo?.message ?? 'No pudimos crear tu academia. Intenta de nuevo.');
            }
            window.location.href = APP_URL;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error de conexión. Intenta de nuevo.');
            setEnviando(false);
        }
    };

    return (
        <InfoModal isOpen={isOpen} onClose={onClose} title="Da el primer paso" icon={<Huella size={9} rotate={12} />} width={560}>
            <p className="mb-5 text-[14px]">Crea tu academia y pruébala gratis por 30 días con todas las funciones Pro. Sin tarjeta de crédito o débito.</p>

            <Form<Valores> layout="vertical" requiredMark={false} onFinish={onFinish} className="[&_.ant-form-item]:!mb-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-azul mb-2">Tu academia</p>
                <Form.Item name="academyName" rules={[{ required: true, message: 'Escribe el nombre de tu academia' }]}>
                    <Input placeholder="Nombre de tu academia" />
                </Form.Item>
                <Form.Item name="address">
                    <Input placeholder="Dirección física (opcional)" />
                </Form.Item>
                <Form.Item name="logoUrl" rules={[{ type: 'url', message: 'Escribe una URL válida' }]}>
                    <Input placeholder="URL de tu logo (opcional)" />
                </Form.Item>

                <p className="text-[11px] font-semibold uppercase tracking-wider text-azul mb-2 mt-4">Tus datos</p>
                <div className="grid grid-cols-2 gap-x-4">
                    <Form.Item name="firstName" rules={[{ required: true, message: 'Escribe tu nombre' }]}>
                        <Input placeholder="Nombre" autoComplete="given-name" />
                    </Form.Item>
                    <Form.Item name="lastName" rules={[{ required: true, message: 'Escribe tu apellido' }]}>
                        <Input placeholder="Apellido" autoComplete="family-name" />
                    </Form.Item>
                </div>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Escribe tu correo' },
                        { type: 'email', message: 'Escribe un correo válido' },
                    ]}
                >
                    <Input placeholder="correo@academia.com" autoComplete="email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Crea una contraseña' },
                        { min: 8, message: 'La contraseña debe tener al menos 8 caracteres.' },
                    ]}
                >
                    <Input.Password placeholder="Contraseña (mínimo 8 caracteres)" autoComplete="new-password" />
                </Form.Item>

                {error && <Alert type="error" showIcon message={error} className="!mb-5" />}

                <Button type="primary" htmlType="submit" size="large" block loading={enviando} className="!mt-2">
                    {enviando ? 'Preparando tu academia…' : 'Empezar mi prueba gratis'}
                </Button>
            </Form>
        </InfoModal>
    );
};

export default RegistroModal;
