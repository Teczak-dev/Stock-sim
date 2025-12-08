import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    // 1. Ładujemy ulubione z pamięci przeglądarki (żeby nie znikały po odświeżeniu)
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('myFavorites');
        return saved ? JSON.parse(saved) : [];
    });

    // 2. Zapisujemy do pamięci za każdym razem, gdy coś się zmieni
    useEffect(() => {
        localStorage.setItem('myFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // 3. Funkcja: Dodaj lub Usuń (Przełącznik)
    const toggleFavorite = (coin) => {
        // Sprawdzamy czy już jest na liście
        const exists = favorites.find((fav) => fav.id === coin.id);

        if (exists) {
            // Jeśli jest -> usuń go (zrób nową listę bez niego)
            setFavorites(favorites.filter((fav) => fav.id !== coin.id));
        } else {
            // Jeśli nie ma -> dodaj go
            setFavorites([...favorites, coin]);
        }
    };

    // 4. Funkcja pomocnicza: Czy to krypto jest ulubione?
    const isFavorite = (coinId) => {
        return favorites.some((fav) => fav.id === coinId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Hook ułatwiający życie
export const useFavorites = () => useContext(FavoritesContext);