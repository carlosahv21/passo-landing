import React from 'react';
import { Avatar, Modal } from 'antd';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    width?: number;
}

// Modal base de la landing (Ant Design). El tema lo pone ModalManager.
const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, icon, children, width = 640 }) => (
    <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={width}
        destroyOnHidden
        title={
            <span className="flex items-center gap-3">
                {icon && <Avatar size={36} style={{ background: '#E8F3FF', color: '#0A84FF' }} icon={icon} />}
                <span>{title}</span>
            </span>
        }
    >
        <div className="pt-2 text-gris leading-relaxed max-h-[70vh] overflow-y-auto">{children}</div>
    </Modal>
);

export default InfoModal;
