import React, { createContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Create a provider component
const ThemeProvider = ({ children }) => {
    // Initialize state based on localStorage
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedPreference = localStorage.getItem('dark-mode');
        return savedPreference === 'true' ? 'false' : 'true';
    });

    // Update theme based on localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const savedPreference = localStorage.getItem('dark-mode');
            setIsDarkTheme(savedPreference === 'true' ? 'false' : 'true');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Update localStorage when theme changes
    const toggleTheme = () => {
        const newTheme = isDarkTheme === 'true' ? 'false' : 'true';
        localStorage.setItem('dark-mode', newTheme);
        setIsDarkTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };