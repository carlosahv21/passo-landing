import React from 'react';
import { Segmented } from 'antd';
import { TIPOS, type Tipo } from '../lib/planes';

// Selector Básico / Pro compartido por Precios y Calculadora
const TipoToggle = ({
    tipo,
    onChange,
    size = 'large',
    block = false,
}: {
    tipo: Tipo;
    onChange: (t: Tipo) => void;
    size?: 'large' | 'middle';
    block?: boolean;
}) => (
    <Segmented<Tipo>
        value={tipo}
        onChange={onChange}
        size={size}
        block={block}
        options={(Object.keys(TIPOS) as Tipo[]).map((k) => ({ value: k, label: <span className="px-3 font-semibold">{TIPOS[k].nombre}</span> }))}
    />
);

export default TipoToggle;
