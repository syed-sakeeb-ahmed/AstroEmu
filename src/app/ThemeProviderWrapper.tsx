'use client'

import { useState, createContext } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeStateContext } from './ThemeStateContext';
import { getThemeCookieObject } from './CookieUtilities';
import { darkTheme, lightTheme } from './ThemeOptions';

const getThemePalette = (theme) => {
    if (theme === 'light')
    {
        return lightTheme;
    }
    else if (theme === 'dark')
    {
        return darkTheme;
    }
}
  
const ThemeProviderWrapper = ({themeCookieValue, children} : {children : React.ReactNode}) => {

    const [currentTheme, setCurrentTheme] = useState(themeCookieValue);
    
    const ThemeStateProviderValue = {
        currentTheme,
        setCurrentTheme
    }


    return (
        <ThemeProvider theme={getThemePalette(currentTheme)}>
            <ThemeStateContext.Provider value={ThemeStateProviderValue}>
                <CssBaseline/>
                    {children}
            </ThemeStateContext.Provider>
        </ThemeProvider>
    );
  };
  
  export default ThemeProviderWrapper;