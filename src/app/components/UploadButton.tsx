import React from 'react';
import { Button } from '@mui/material';
import UploadPrompt from './UploadPrompt';
import { useState } from 'react';
import { useRef } from 'react';
import {db} from '../db'
import ErrorPrompt from './ErrorPrompt';
import {Tooltip} from '@mui/material';

const UploadButton = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const [errorIsOpen, setErrorIsOpen] = useState(false)
    const [isTitleError, setIsTitleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const textRef = useRef("")
    const fileRef = useRef(null)

    //Check whether uploaded file is valid .nes/.sfc file
    const validateFile = (fileName : string) => {
        if (fileName.slice(-3).localeCompare("nes") == 0 || fileName.slice(-3).localeCompare("sfc") == 0 || fileName.slice(-3).localeCompare("smc") == 0)
        {
            return true;
        }
        console.log(`This is the filename slice ${fileName.slice(-3)}`)
        return false;
    }

    const displayUploadError = (message : string) => {
        setErrorMessage(message)
        setErrorIsOpen(true)
    }

    //Once file has been uploaded this will fire
    const handleUpload = async (e) => {
        console.log("Upload button has been pressed!!!");
        if (e.target.files.length == 1)
        {
            const uploadedFile = e.target.files[0]
            const isValid = validateFile(uploadedFile.name)

            if (isValid === true)
            {
                //Check whether maximum upload limit of 3 has been reached
                const noPreloadedArray = await db.gameData.where('isPreloaded').equals(0).toArray()
                console.log("This is preloadedArray length: " + noPreloadedArray.length)
                if (noPreloadedArray.length >= 3)
                {
                    displayUploadError("Maximum upload limit of 3 has been reached")
                }
                else
                {
                    fileRef.current = uploadedFile
                    console.log(`This is fileRef.current name ${fileRef.current.name}`)
                    setIsOpen(true)
                }
                
            }
            else
            {
                displayUploadError('Only accept .nes, .sfc and .smc files')
            }
            
        }
        e.target.value = null // This will clear the buffer. So upload prompt shows up even if the same file is chosen
        console.log(`This is the textRef on open prompt: ${textRef.current}`)
    }

    //This is called to handle close of valid upload prompt
    const handleClose = () => {
        //console.log(`Before closing prompt textRef: ${textRef.current}`)
        textRef.current = ""
        fileRef.current = null
        //console.log(`After closing prompt textRef: ${textRef.current}`)
        setDisabled(true)
        setIsOpen(false)
        setTimeout(function() {
            setIsTitleError(false)
          }, 200);
        
    }

    //This is called to handle close of error prompt
    const handleErrorClose = () => {
        //console.log(`After closing prompt textRef: ${textRef.current}`)
        setErrorIsOpen(false)
    }
    return (
        <div>
            <Tooltip title={"Upload your Famicom and Super Famicom roms"}>
            <Button component="label" variant="contained" color="secondary" >Upload Game
            <input onChange={handleUpload} multiple={false} type='file'hidden/>
            </Button>
            </Tooltip>
            <UploadPrompt isTitleErrorState={{isTitleError, setIsTitleError}} fileRef={fileRef} disabled={disabled} setDisabled={setDisabled} textRef={textRef} isOpen={isOpen} handleClose={handleClose}/>
            <ErrorPrompt handleClose={handleErrorClose} isOpen={errorIsOpen} message={errorMessage}/>
        </div>
    );
};

export default UploadButton;