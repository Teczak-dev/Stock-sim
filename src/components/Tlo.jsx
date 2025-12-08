import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Tlo({ blur = false }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Kolory dla SVG w zależności od motywu
    const accentColor = isDark ? '#34d399' : '#10b981';
    const bgColor = isDark ? '#0f172a' : '#ffffff';

    // Generowanie wykresu (tylko raz)
    const [chartPath, setChartPath] = useState("");

    useEffect(() => {
        let path = "M0,400";
        let height = 400;
        for (let i = 1; i <= 150; i++) {
            height += (Math.random() - 0.5) * 150;
            if (height < 50) height = 100;
            if (height > 550) height = 500;
            path += ` L${i * 40},${height}`;
        }
        setChartPath(path + " L6000,800 L0,800 Z");
    }, []);

    return (
        <>
            <div className="background-container" style={{
                position: 'fixed', // FIXED: Zawsze na całym ekranie, nie przewija się
                top: 0, left: 0, width: '100%', height: '100%',
                zIndex: -1, // Pod wszystkim
                backgroundColor: bgColor,
                transition: 'background 0.3s',
                // Rozmycie, jeśli parametr blur=true
                filter: blur ? 'blur(8px)' : 'none',
                opacity: blur ? 0.8 : 1
            }}>
                {/* Wykres */}
                <div className="animacja-tla" style={{
                    position: 'absolute', bottom: -50, left: 0, width: '200%', height: '80%',
                    opacity: 0.5
                }}>
                    <svg viewBox="0 0 4000 600" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                        <defs>
                            <linearGradient id="gradBg" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={bgColor} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d={chartPath} fill="url(#gradBg)" stroke={accentColor} strokeWidth="2" />
                    </svg>
                </div>
            </div>

            <style>{`
                .animacja-tla { animation: ruchTla 60s linear infinite; }
                @keyframes ruchTla { from {transform: translateX(0);} to {transform: translateX(-50%);} }
            `}</style>
        </>
    );
}