
import { IconButton } from '@mui/material';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useState, useContext } from 'react';
import { changeTheme } from '../utilities';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeStateContext } from '../ThemeStateContext';
import {Tooltip} from '@mui/material';

import type { Nostalgist } from 'nostalgist';

let activeTapeButton : (string | null) = null;
let rewindIntervalID : (NodeJS.Timeout | null) = null;

const TAPE_ENUM = ['REWIND', 'SLOWMOTION', 'FAST_FORWARD'];

const styles = {
  containerStyles: {display: 'flex', flex: '1', justifyContent: 'center'},
}


const TapeButtons = ({emulationController} : {emulationController : Nostalgist}) => {

  const [isMuted, setIsMuted] = useState(false)

  //Theme states
  const setThemeStateObject = useContext(ThemeStateContext);
  const currentTheme = setThemeStateObject.currentTheme;
  const setCurrentTheme = setThemeStateObject.setCurrentTheme;
    

  const preliminaryTapeFunctionCheck = (pressedTapeButton : string) => {
    
    if (!canTapeButtonExecute(pressedTapeButton)) return false;
    modifyActiveTapeButton(pressedTapeButton);
    return true;
}

const canTapeButtonExecute = (pressedTapeButton : string) => {
    if (pressedTapeButton == activeTapeButton)
    {
        return true;
    }
    else if (activeTapeButton == null)
    {
        return true;
    }
    else {
        return false;
    }
}

const modifyActiveTapeButton = (pressedTapeButton : string) => {
    if (activeTapeButton == pressedTapeButton)
    {
        activeTapeButton = null;
    }
    else if (activeTapeButton == null)
    {
        activeTapeButton = pressedTapeButton;
    }
}

  const sendRewindCommand = () => {
    emulationController.current.sendCommand("REWIND");
}

const startRewind = () => {
    if (!rewindIntervalID)
    {
        if(!preliminaryTapeFunctionCheck(TAPE_ENUM[0])) return;
        rewindIntervalID = setInterval(sendRewindCommand);
    }
   
}

const abortRewind = () => {
    //console.log("Rewind Aborted")
    if (rewindIntervalID)
    {
        if(!preliminaryTapeFunctionCheck(TAPE_ENUM[0])) return;
        clearInterval(rewindIntervalID);
        rewindIntervalID = null;
    }
}

const handleSlowMo = () => {
    if(!preliminaryTapeFunctionCheck(TAPE_ENUM[1])) return;
    emulationController.current.sendCommand('SLOWMOTION');
}

const handleFastForward = () => {
    if(!preliminaryTapeFunctionCheck(TAPE_ENUM[2])) return;
    emulationController.current.sendCommand('FAST_FORWARD');
}

const handleMute = () => {
  if (isMuted)
    setIsMuted(false)
  else
    setIsMuted(true)
  emulationController.current.sendCommand('MUTE');
}
    return (
        <div style={styles.containerStyles}>
          <Tooltip title={(isMuted) ? "Unmute" : "Mute"}>
          <IconButton size="large"
            edge="end"
            color="inherit"
            aria-label="mute" onClick={handleMute}>
            {(isMuted) ? <VolumeOffIcon/> : <VolumeUpIcon/> }
          </IconButton>
          </Tooltip>
          <Tooltip title={"Rewind (Hold)"}>
            <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onMouseDown={startRewind}
            onMouseLeave={abortRewind}
            onMouseUp={abortRewind}
          >
            <FastRewindIcon/>
          </IconButton >
          </Tooltip>

          <Tooltip title={"Slow motion"}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleSlowMo}
          >
            <SlowMotionVideoIcon/>
          </IconButton >
          </Tooltip>

          <Tooltip title={"Fast forward"}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleFastForward}
          >
            <FastForwardIcon/>
          </IconButton >
          </Tooltip>

          <Tooltip title={"Change theme"}>
          <IconButton size="large"
            edge="end"
            color="inherit"
            aria-label="change theme" onClick={() => {changeTheme(currentTheme, setCurrentTheme)}}>
            {(currentTheme.localeCompare("light") === 0) ? <LightModeIcon/> : <DarkModeIcon/> }
          </IconButton>
          </Tooltip>
          
        </div>
    );
};

export default TapeButtons;