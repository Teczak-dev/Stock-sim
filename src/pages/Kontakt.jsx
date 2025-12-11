import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
    // 1. Pobieramy motyw (żeby wiedzieć czy tło ciemne czy jasne)
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // 2. Tu trzymamy to, co wpisuje użytkownik
    const [dane, setDane] = useState({ name: '', email: '', message: '' });
    
    // 3. Tu trzymamy błędy (np. "Brak imienia")
    const [bledy, setBledy] = useState({});
    
    // 4. Czy udało się wysłać?
    const [wyslano, setWyslano] = useState(false);

    // Funkcja: Aktualizuje stan, gdy piszesz w polach
    const wpisywanie = (e) => {
        const pole = e.target.name;  // np. "email"
        const wartosc = e.target.value; // np. "jan@wp.pl"
        
        // Kopiujemy stare dane (...dane) i nadpisujemy tylko to jedno pole
        setDane({ ...dane, [pole]: wartosc });
    };

    // Funkcja: Sprawdza błędy i "wysyła"
    const wyslij = (e) => {
        e.preventDefault(); // Zatrzymuje przeładowanie strony
        
        const noweBledy = {};

        // Proste sprawdzanie (Walidacja)
        if (!dane.name) noweBledy.name = "Podaj swoje imię!";
        if (!dane.email.includes('@')) noweBledy.email = "To nie jest email (brak @)!";
        if (dane.message.length < 5) noweBledy.message = "Wiadomość jest za krótka.";

        // Jeśli są błędy -> Pokaż je
        if (Object.keys(noweBledy).length > 0) {
            setBledy(noweBledy);
        } else {
            // Jeśli jest OK -> Wyślij
            console.log("Dane wysłane do bazy:", dane); // Tu widać dane w konsoli (F12)
            setWyslano(true);
            setBledy({});
        }
    };

    // Ustawienia kolorów (Proste zmienne)
    const kolorTekstu = isDark ? 'white' : 'black';
    const tloPola = isDark ? '#333' : 'white';
    const ramka = isDark ? '1px solid #555' : '1px solid #ccc';

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', color: kolorTekstu }}>
            
            <h1 style={{ textAlign: 'center' }}>Napisz do nas</h1>

            {/* --- WARUNEK: Jeśli wysłano, pokaż sukces. Jeśli nie, pokaż formularz --- */}
            {wyslano ? (
                <div style={{ padding: '20px', backgroundColor: 'green', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
                    <h2>✅ Sukces!</h2>
                    <p>Twoja wiadomość została wirtualnie wysłana.</p>
                    <button onClick={() => setWyslano(false)} style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }}>
                        Wyślij nową
                    </button>
                </div>
            ) : (
                <form onSubmit={wyslij} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    {/* POLE IMIĘ */}
                    <div>
                        <label>Imię:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={dane.name} 
                            onChange={wpisywanie} 
                            style={{ width: '100%', padding: '10px', backgroundColor: tloPola, color: kolorTekstu, border: ramka, borderRadius: '5px' }} 
                        />
                        {/* Wyświetl błąd jeśli istnieje */}
                        {bledy.name && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '14px' }}>{bledy.name}</p>}
                    </div>

                    {/* POLE EMAIL */}
                    <div>
                        <label>Email:</label>
                        <input 
                            type="text" 
                            name="email" 
                            value={dane.email} 
                            onChange={wpisywanie} 
                            style={{ width: '100%', padding: '10px', backgroundColor: tloPola, color: kolorTekstu, border: ramka, borderRadius: '5px' }} 
                        />
                        {bledy.email && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '14px' }}>{bledy.email}</p>}
                    </div>

                    {/* POLE WIADOMOŚĆ */}
                    <div>
                        <label>Wiadomość:</label>
                        <textarea 
                            name="message" 
                            value={dane.message} 
                            onChange={wpisywanie} 
                            rows="5"
                            style={{ width: '100%', padding: '10px', backgroundColor: tloPola, color: kolorTekstu, border: ramka, borderRadius: '5px' }} 
                        />
                        {bledy.message && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '14px' }}>{bledy.message}</p>}
                    </div>

                    {/* PRZYCISK */}
                    <button type="submit" style={{ padding: '15px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                        WYŚLIJ WIADOMOŚĆ
                    </button>

                </form>
            )}
        </div>
    );
}