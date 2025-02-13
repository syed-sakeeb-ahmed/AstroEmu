'use client'

import { db } from '../db';

import StateNotification from './StateNotification';

import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material';
import { Nostalgist } from 'nostalgist';

const isValidButtonVariant = (variant : string) : boolean => {
    switch(variant) {
        case 'save':
            return true;
        case 'load':
            return true;
        default:
            throw new Error('Error: Invalid button variant inputted');
    }
}




const GameStateButton = ({gameID, emulationController, buttonVariant, style} : {gameID : number, emulationController : Nostalgist, buttonVariant : string, style : React.CSSProperties}) => {
    
    const [stateNotificationIsVisible, setStateNotificationIsVisible] = useState(false);
    const [stateNotificationMessage, setStateNotificationMessage] = useState('');

    const displayStateNotification = (stateOperationIsSuccessful) => {
        if (buttonVariant == 'save')
        {
            setStateNotificationMessage('Game saved');
            setStateNotificationIsVisible(true);
        }
        else if (buttonVariant == 'load')
        {
            if (stateOperationIsSuccessful)
            {
                setStateNotificationMessage('Game loaded');
                setStateNotificationIsVisible(true);
            }
            else if (!stateOperationIsSuccessful)
            {
                setStateNotificationMessage('Save file does not exist');
                setStateNotificationIsVisible(true);
            }
        }
    }


    const [cachedSaveState, setCachedSaveState] = useState(null);
    
    useEffect(() => {
        
        const setupCachedState = async () => {
            const gameDataObject = await db.gameData.get(gameID);
            const stateInDatabase = gameDataObject.saveFile;
            setCachedSaveState(stateInDatabase);
        }
        
        //setupCachedState()
    }, []);

    const [onCooldown, setOnCooldown] = useState(false);

    const startCooldownTimer = (timerDuration : number) => {
        setOnCooldown(true);
        setTimeout(() => {setOnCooldown(false)}, timerDuration);
    }
    
    const isSaveVariant = (isValidButtonVariant(buttonVariant) && buttonVariant === 'save') ? true : false;
    
    const createAndStoreSaveFileInDatabase = async () => {
        
        if (emulationController)
        {
            console.log(emulationController.current)
            const state = await emulationController.current.saveState();
            db.gameData.update(gameID, {
                "saveFile": state,
            });
        }
        
    }

    const handleSave : () => Promise<void> = async () => {
        if (!onCooldown)
        {
            
            await createAndStoreSaveFileInDatabase();
            displayStateNotification(true); // Assume save state is always successful
            startCooldownTimer(1000);
        }
    }

    const getSaveFileFromDatabase = async () => {
        let stateFromDatabase = null;
        if (true)
            {
                const gameDataObject = await db.gameData.get(gameID);
                stateFromDatabase = gameDataObject.saveFile;
                //setCachedSaveState(stateFromDatabase);
            }
        else
        {
            return cachedSaveState;
        }
        return stateFromDatabase;
    }

    /*
    TODO: 
    Put fetching logic from handleLoad function into getSaveFileFromDatabase function
    */
    const handleLoad : () => Promise<void> = async () => {
        let isLoadSuccess = false;
        
            const saveFile = await getSaveFileFromDatabase();
            //console.log("This is savefile: " + saveFile.state)
            if (saveFile !== null)
            {
                //console.log(saveFile.title)
                await emulationController.current.loadState(saveFile.state);
                startCooldownTimer(1000);
                isLoadSuccess = true;
            }
        
        displayStateNotification(isLoadSuccess);
    }

    return (
        <Box style={style}>
        <Button onClick={(isSaveVariant) ? handleSave : handleLoad} color="secondary"> 
          {(isSaveVariant) ? 'Save' : 'Load'}
        </Button>
        <StateNotification message={stateNotificationMessage} checked={stateNotificationIsVisible} setChecked={setStateNotificationIsVisible}/>
        </Box>
    );
};

export default GameStateButton;