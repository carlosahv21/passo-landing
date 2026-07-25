import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import InfoModal from './InfoModal';
import Huella from '../Huella';

// URLs por entorno: .env.development (dev) / .env.production (build)
const API_REGISTER_URL = import.meta.env.PUBLIC_API_REGISTER_URL;
const APP_URL = import.meta.env.PUBLIC_APP_URL;

interface RegistroModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const campoBase =
    'w-full px-4 py-3 rounded-xl bg-noche border border-claro/15 text-claro placeholder:text-claro/30 focus:border-azul focus:outline-none transition-colors text-sm';

const RegistroModal: React.FC<RegistroModalProps> = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({
        academyName: '',
        address: '',
        logoUrl: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = (campo: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [campo]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (form.password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        setEnviando(true);
        try {
            const res = await fetch(API_REGISTER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    academy: {
                        name: form.academyName,
                        ...(form.address && { address: form.address }),
                        ...(form.logoUrl && { logo_url: form.logoUrl }),
                    },
                    user: {
                        first_name: form.firstName,
                        last_name: form.lastName,
                        email: form.email,
                        password: form.password,
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
        <InfoModal
            isOpen={isOpen}
            onClose={onClose}
            title="Da el primer paso"
            icon={<Huella size={16} rotate={12} />}
        >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                <p className="text-sm text-claro/60">
                    Crea tu academia en Passo y pruébala gratis por 30 días. Sin tarjeta de crédito.
                </p>

                <fieldset className="space-y-4">
                    <legend className="font-mono text-xs uppercase tracking-[0.2em] text-oro mb-3">Tu academia</legend>
                    <input required placeholder="Nombre de tu academia" value={form.academyName} onChange={set('academyName')} className={campoBase} />
                    <input placeholder="Dirección física (opcional)" value={form.address} onChange={set('address')} className={campoBase} />
                    <input type="url" placeholder="URL de tu logo (opcional)" value={form.logoUrl} onChange={set('logoUrl')} className={campoBase} />
                </fieldset>

                <fieldset className="space-y-4">
                    <legend className="font-mono text-xs uppercase tracking-[0.2em] text-oro mb-3">Tus datos</legend>
                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="Nombre" value={form.firstName} onChange={set('firstName')} className={campoBase} />
                        <input required placeholder="Apellido" value={form.lastName} onChange={set('lastName')} className={campoBase} />
                    </div>
                    <input required type="email" placeholder="correo@academia.com" value={form.email} onChange={set('email')} className={campoBase} />
                    <input required type="password" minLength={8} placeholder="Contraseña (mínimo 8 caracteres)" value={form.password} onChange={set('password')} className={campoBase} autoComplete="new-password" />
                </fieldset>

                {error && (
                    <p role="alert" className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={enviando}
                    className="w-full py-4 rounded-full bg-azul hover:brightness-110 transition-all font-bold text-sm text-claro shadow-lg shadow-azul/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {enviando && <Loader2 size={16} className="animate-spin" />}
                    {enviando ? 'Creando tu academia…' : 'Crear mi academia — 30 días gratis'}
                </button>
            </form>
        </InfoModal>
    );
};

export default RegistroModal;
