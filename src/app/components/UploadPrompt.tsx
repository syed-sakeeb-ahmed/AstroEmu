import React, { useEffect } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import {Fade} from '@mui/material';
import UnstyledInputBasic from './UnstyledInputBasic';
import { useState } from 'react';
import { text } from 'stream/consumers';
import {Button} from '@mui/material';
import {Typography} from '@mui/material';
import {db} from "../db"
import { platform } from 'os';


const style = {
    base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
    },
    flex: {
        display: 'flex',
        flexDirection: 'column'
    }
  };

const UploadPrompt = ({isTitleErrorState, fileRef, isOpen, handleClose, textRef, setDisabled, disabled}) => {
    
    
    const getPlatform = (fileName : string) => {
        if (fileName.slice(-3).localeCompare("nes") == 0)
        {
            return "nes";
        }
        else if (fileName.slice(-3).localeCompare("sfc") == 0 || fileName.slice(-3).localeCompare("smc") == 0)
        {
            return "snes"
        }
        else
        {
            throw new Error("Invalid file extension")
            return
        }
    }
    
    const handleSubmit = async () => {
        const userUploadedFile = fileRef.current
        const userDefinedTitle = textRef.current
        //Check whether name already exists
        const noPreloadedArray = await db.gameData.where("isPreloaded").equals(0).toArray()
        for (let i = 0; i < noPreloadedArray.length; i++)
            {
                if (noPreloadedArray[i].title.localeCompare(userDefinedTitle) === 0)
                {
                    isTitleErrorState.setIsTitleError(true)
                    return
                }
            }
        isTitleErrorState.setIsTitleError(false)
        const platform = getPlatform(userUploadedFile.name)
        handleClose(); //Close Prompt and Reset Refs
        console.log(`Adding ${userUploadedFile.name} to database with title ${userDefinedTitle}...`)
        await db.gameData.add({title: userDefinedTitle, platform: platform, isPreloaded: 0, saveFile: null, gameFile: userUploadedFile})
    }
    

    return (
        <div>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
            >
                <Fade in={isOpen}>
                <Box sx={[style.base, style.flex]}>
            <Typography variant='h5' style={{marginBottom: '20px'}}>Upload Game</Typography>
            {(isTitleErrorState.isTitleError) ? <Typography style={{color: 'red'}}>Title already exists</Typography> : <></>}
            <UnstyledInputBasic textRef={textRef} setDisabled={setDisabled} placeholder='Title'/>
            <div style={{display: 'flex'}}>
            <Button style={{borderRadius: '15px', marginLeft: 'auto', marginTop: '20px', textTransform: 'none', padding: '6px 16px 6px 16px'}} onClick={handleClose} color="secondary" variant="text">Cancel</Button>
            <Button style={{borderRadius: '15px', marginLeft: '10px', marginTop: '20px', textTransform: 'none', padding: '6px 16px 6px 16px'}} disabled={disabled} onClick={handleSubmit} color="secondary" variant="contained">Submit</Button>
            </div>
                </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default UploadPrompt;

