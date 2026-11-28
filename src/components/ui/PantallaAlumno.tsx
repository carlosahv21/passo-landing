import React from 'react';
import { Avatar, Button, Progress } from 'antd';
import { QrcodeOutlined, FireFilled } from '@ant-design/icons';
import CodigoQR from './CodigoQR';

// Pantalla de la app del alumno dibujada con componentes (datos de ejemplo)
const PantallaAlumno = () => (
    <div className="px-5 pt-3 pb-6 space-y-3.5">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-[17px] font-bold text-tinta leading-tight">¡Hola, Valeria!</p>
                <p className="text-[12px] text-gris">Salsa caleña · Intermedio</p>
            </div>
            <Avatar style={{ background: '#E8F3FF', color: '#0A84FF', fontWeight: 700 }}>V</Avatar>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-azul to-cielo p-4 text-white flex items-center justify-between">
            <div>
                <p className="text-[11px] text-white/80">Tu racha actual</p>
                <p className="text-[28px] font-extrabold leading-none mt-1">
                    12 <span className="text-[12px] font-medium text-white/80">clases seguidas</span>
                </p>
            </div>
            <FireFilled style={{ fontSize: 30, color: '#F2B33D' }} />
        </div>

        <div className="rounded-2xl border border-linea p-4 text-center">
            <p className="text-[11px] text-gris mb-3">Tu código para marcar asistencia</p>
            <CodigoQR className="w-24 h-24 mx-auto" />
        </div>

        <div className="rounded-2xl border border-linea p-4">
            <div className="flex justify-between text-[11px]">
                <span className="text-gris">Progreso del nivel</span>
                <span className="font-bold text-azul">75%</span>
            </div>
            <Progress percent={75} showInfo={false} size="small" className="!m-0" />
        </div>

        <Button type="primary" block icon={<QrcodeOutlined />}>
            Escanear QR
        </Button>
    </div>
);

export default PantallaAlumno;
