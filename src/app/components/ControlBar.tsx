'use client'
import React, { useEffect } from 'react';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import ControlsModal from '../ControlsModal';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { Slide } from '@mui/material';
import { useState } from 'react';
import {Box} from '@mui/material';
import StateNotification from './StateNotification';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Fade from '@mui/material/Fade'
import MenuButton from './MenuButton';

import TapeButtons from './TapeButtons';
import GameStateButton from './GameStateButton';
import zIndex from '@mui/material/styles/zIndex';

const ControlBar = ({gameID, emulationController, handleFullscreen, menuToggle}) => {
    const [checked, setChecked] = useState(true);
    const [timerId, setTimerId] = useState(null);
    const [message, setMessage] = useState('');
    const [clicked, setClicked] = useState(false)
    const [testChecked, setTestChecked] = useState(true)

    const [saveTimer, setSaveTimer] = useState(null);
    const [loadTimer, setLoadTimer] = useState(null);

    const [stateNotification, setStateNotification] = useState(false);

    const handleMouseLeave = (time) => {
        if (timerId == null)
        {
            let tempTimerId = setTimeout(() => {
                setTestChecked(false);
            }, time)
            setTimerId(tempTimerId);
        }
    }

    const handleTestClicked = () => {
        setTestChecked((testChecked) => !testChecked)
    }

    const handleMouseEnterAndHover = () => {
        if (timerId != null)
        {
            clearTimeout(timerId);
            setTimerId(null);
        }
        if (!testChecked) setTestChecked(true);
    }

    const timer = (timer, setTimer, delay, func) => {
        if (!timer)
        {
            func();
            let tempTimer = setTimeout(() => {
                setTimer(null);
            }, delay);
            setTimer(tempTimer);
        }
    }

    const router = useRouter();

    

    return (
        <div style={{position: 'absolute', left: 0, right: 0, height: '100%', display: 'flex', flexDirection: 'column', zIndex: 0}}>
            <div style={{position: 'absolute', left: 0, right: 0, height: '80px'}}>
            <Slide in={testChecked}>
            <AppBar>
                
                <Toolbar variant='regular'>

                    
                <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {router.back()}}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon/>
          </IconButton>
            <MenuButton emulationController={emulationController} gameID={gameID} menuToggle={menuToggle}></MenuButton>
            <GameStateButton 
            gameID={gameID} 
            emulationController={emulationController} 
            buttonVariant='save'
            />
            
            <TapeButtons
            emulationController={emulationController}
            />
            
            <GameStateButton 
            gameID={gameID} 
            emulationController={emulationController} 
            buttonVariant='load'
            style={{marginLeft: 'auto'}}
            />
          <ControlsModal></ControlsModal>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => handleFullscreen(clicked, setClicked)}
          >
            {clicked ? <FullscreenExitRoundedIcon/>: <FullscreenRoundedIcon/>}
          </IconButton >

          

                </Toolbar>
            </AppBar>
            
            </Slide>
            </div>
            <div onClick={handleTestClicked} style={{height: '100%'}}>
            </div>
            
            </div>
    );
};

export default ControlBar;