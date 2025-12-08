import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Tlo from './Tlo'; // Używamy Twojej nazwy pliku

export default function Layout() {
    const location = useLocation();

    // Sprawdzamy, czy jesteśmy na stronie głównej '/'
    const isHomePage = location.pathname === '/';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Tło w tle: Rozmyte na podstronach (!isHomePage), Ostre na Home */}
            <Tlo blur={!isHomePage} />

            {/* Pasek nawigacji */}
            <Navigation />

            {/* Treść strony */}
            <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                <Outlet />
            </main>
        </div>
    );
}