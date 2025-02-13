import React, { useState, useContext } from 'react';
import { IconButton } from '@mui/material';
import { ThemeStateContext } from '../ThemeStateContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {Tooltip} from '@mui/material';
import { changeTheme } from '../utilities';

const ThemeButton = () => {

    const setThemeStateObject = useContext(ThemeStateContext);

    const currentTheme = setThemeStateObject.currentTheme;
    const setCurrentTheme = setThemeStateObject.setCurrentTheme;
    
    

    return (
        <div>
          <Tooltip title={"Change theme"}>
            <IconButton
            size="large"
            edge={false}
            color="inherit"
            aria-label="theme"
            onClick={() => {changeTheme(currentTheme, setCurrentTheme)}}
          >
            {currentTheme === 'light' ? <DarkModeIcon/>: <LightModeIcon/>}
          </IconButton >
          </Tooltip>
        </div>
    );
};

export default ThemeButton;