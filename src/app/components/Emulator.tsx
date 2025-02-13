'use client'

import dynamic from 'next/dynamic';
import { useEffect, useContext, useState, useRef } from 'react';
import { Nostalgist } from 'nostalgist';
import { RomContext } from '../RomContext';
import { AppBar } from '@mui/material';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link'
import ControlsModal from '../ControlsModal';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import { Icon, Box } from '@mui/material';
import KeyBoardIcons from './KeyBoardIcons';
import { useRouter } from 'next/navigation'  // Usage: App router
import ControlBar from './ControlBar';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { OverlayContext } from '../OverlayContext';
import '../styles/canvas.css'

import {db} from '../db'
import { loadGameFile } from '../utilities';
import { getPreloadedGameFilePath } from '../utilities';
import { WASM_FILE_LOCATION } from '../constants';

const classes = {
    full: {height: '100%', aspectRatio: 4/3},
    large: {height: '75%', aspectRatio: 4/3},
    default: {height: '50%', aspectRatio: 4/3}
}

let screenNum = 0

//This is to fix a quirk with nostalgist. The baseHeight class is exactly the same as
//modifiedHeight except one key difference. Height in baseHeight is set to auto whereas
//it is 100% in modifiedHeight.
//When the emulator boots on height auto it resizes to the correct dimensions needed for
//the object-fit property to have the intended effect. Directly booting the emulator at
//100% height will lead to incorrect dimensions and overflow on the page.
//So the solution is this: First load on auto, then when user presses fullscreen button
//permanently set height to 100% for duration of emulator runtime.
const heightClassArr = ['baseHeight', 'modifiedHeight'];

export default function Emulator ({gameID, platform}) {
    const API_ENDPOINT = process.env.LOCAL_API_ENDPOINT || '/'

    //const [emulationController, setEmulationController] = useState(null);
    const emulationControllerRef = useRef(null)
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const menuToggle = {
        menuIsOpen,
        setMenuIsOpen
    }
    


    const loadGameFileFromDisk = async (gameDataObject) => {
        const gameFilePath = getPreloadedGameFilePath(gameDataObject.title, gameDataObject.platform);
        const gameFile = await fetch(gameFilePath);
        return gameFile;
    }

    const storeGameFileInDatabase = async (gameDataObject, gameFile) => {
        const modifiedGameDataObject = {
            id: gameDataObject.id,
            title: gameDataObject.title,
            platform: gameDataObject.platform,
            isPreloaded: gameDataObject.isPreloaded,
            saveFile: gameDataObject.saveFile,
            gameFile
        }
        db.gameData.put(modifiedGameDataObject);
    }

    const handleFullScreen = () => {
        const screenArr = ["default", "large", "full"]
        screenNum = (screenNum + 1) % 3
        setScreenStyle(screenArr[screenNum])
    }

    const getGameFile = async (gameID) => {
        const gameDataObject = await db.gameData.get(gameID);
        let gameFile = gameDataObject.gameFile;
        if (gameFile == null)
        {
            gameFile = await loadGameFileFromDisk(gameDataObject);
            await storeGameFileInDatabase(gameDataObject ,gameID, gameFile);
        }

        return gameFile;
    }

    const addExtension = (gameFilePath, platform) => {
        console.log("platform in addext: " + platform.localeCompare("snes"))
        if (platform.localeCompare("nes") === 0)
        {
            return `${gameFilePath}.nes`
        }
        else if (platform.localeCompare("snes") === 0)
        {
            return `${gameFilePath}.sfc`
        }
        else {
            console.log("ERROR: This platform is not supported")
        }
    }

    const getEmulatorCoreFilePath = (platform) => {
        const emulatorCore  = getEmulatorCore(platform);
        const emulatorCoreFileNameWithoutExt = `${emulatorCore}_libretro`
        return `${WASM_FILE_LOCATION}/${emulatorCore}/${emulatorCoreFileNameWithoutExt}`
    }

    const getEmulatorCore = (platform) => {
        switch(platform) {
            case 'nes':
                return 'fceumm';
            case 'snes':
                return 'snes9x'
            default:
                throw new Error(`Emulator core does not exist for ${platform}`)
        }
    }

    const bootEmulationController = async () => {
        const gameDBObject = await db.gameData.get(gameID);
        
        let gameFile;
        if (gameDBObject.isPreloaded === 0)
        {
            gameFile = await getGameFile(gameID);
        }
        else
        {
            gameFile = getPreloadedGameFilePath(gameDBObject.title, gameDBObject.platform)
            gameFile = addExtension(gameFile, gameDBObject.platform)
        }

        if (gameDBObject.isPreloaded === 0)
        {
            gameFile = new Blob([gameFile], { type: 'application/octet-stream' })
            console.log("This is the newly made file: ")
        }
       
        const machineConfiguration = await Nostalgist.launch({
            element: document.querySelector('#emulator-canvas'),
          
            // Will load https://example.com/core/fbneo_libretro.js and https://example.com/core/fbneo_libretro.wasm as the launching core
            // Because of the custom `resolveCoreJs` and `resolveCoreWasm` options
            core: getEmulatorCore(platform),
          
            // Will load https://example.com/roms/mslug.zip as the ROM
            // Because of the custom `resolveRom` option
            rom: gameFile,
          
            // Custom configuration for RetroArch
            retroarchConfig: {
              rewind_enable: true,
            },

            resolveCoreWasm(core) {
                const emulatorCoreFilePath = getEmulatorCoreFilePath(platform);
                return `${emulatorCoreFilePath}.wasm`
            },
          
            // Specify where to load the core files
            resolveCoreJs(core) {
                const emulatorCoreFilePath = getEmulatorCoreFilePath(platform);
                return `${emulatorCoreFilePath}.js`
            },
            
            resolveRom(romFilePath) {
                return `${romFilePath}`
              },
            
          })
        console.log("Just set the emulation controller")
        emulationControllerRef.current = machineConfiguration
    }

    const [screenStyle, setScreenStyle] = useState('default');

    const [classHeight, setClassHeight] = useState('baseHeight');

      useEffect(() => {
        bootEmulationController();
        return () => {
            console.log("WRE ARE EXITING")
            
            console.log(emulationControllerRef.current)
            if (emulationControllerRef.current)
            {
                
                emulationControllerRef.current.exit()
            }
          }
      }, [])


    return (
        <div style={{width: '100%', height: '100%'}}>
            <ControlBar menuToggle={menuToggle} gameID={gameID} emulationController={emulationControllerRef} handleFullscreen={handleFullScreen} />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <canvas className="baseHeight" id="emulator-canvas" style={{...classes[screenStyle]}}></canvas>
            </div>
        </div>
        
    );
};
