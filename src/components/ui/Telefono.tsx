import React from 'react';

// Marco de celular hecho en HTML (sin imagen): bisel, isla y barra de estado a las 9:41
const Telefono: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div
        className={`relative rounded-[46px] bg-[#1D2433] p-[10px] shadow-[0_30px_60px_-20px_rgba(29,36,51,0.45)] ${className}`}
        aria-hidden="true"
    >
        <div className="relative h-full rounded-[37px] bg-white overflow-hidden">
            <div className="flex items-center justify-between px-7 pt-3.5 pb-1 text-[13px] font-semibold text-tinta">
                <span>9:41</span>
                <span className="absolute left-1/2 top-2.5 -translate-x-1/2 w-[92px] h-[26px] rounded-full bg-[#1D2433]" />
                <span className="flex items-center gap-1.5">
                    {/* señal */}
                    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
                    {/* wifi */}
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 2.2c2.2 0 4.2.9 5.6 2.3l1.1-1.1A9.4 9.4 0 0 0 7.5.6 9.4 9.4 0 0 0 .8 3.4l1.1 1.1a7.8 7.8 0 0 1 5.6-2.3Zm0 3.2c1.3 0 2.5.5 3.4 1.4l1.1-1.1a6.4 6.4 0 0 0-9 0l1.1 1.1c.9-.9 2.1-1.4 3.4-1.4Zm0 3.2c-.5 0-.9.2-1.2.5L7.5 10.3l1.2-1.2c-.3-.3-.7-.5-1.2-.5Z" /></svg>
                    {/* batería */}
                    <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="16" height="8" rx="1.8" fill="currentColor" /><rect x="22.5" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.4" /></svg>
                </span>
            </div>
            {children}
        </div>
    </div>
);

export default Telefono;
