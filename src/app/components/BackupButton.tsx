import React from 'react';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { IconButton } from '@mui/material';
import {db} from "../db"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Tooltip } from '@mui/material';

const BackupButton = () => {

    const handleZip = async () => {
        const fileArray = await db.gameData.where("isPreloaded").equals(0).toArray()
        let zip = new JSZip();
            for (let i = 0; i < fileArray.length; i++)
            {
                const ext = fileArray[i].extension
                const gameFileArrayBuffer = fileArray[i].gameFile
                const gameFileBlob = new Blob([gameFileArrayBuffer], { type: 'application/octet-stream' })
                zip.file(fileArray[i].title + ext, gameFileBlob);
            }
        const preloadedArray = await db.gameData.where("isPreloaded").equals(1).toArray()
        for (let i = 0; i < preloadedArray.length; i++)
            {
                const ext = ".save"
                if (preloadedArray[i].saveFile !== null)
                {
                    const saveFile = new Blob([preloadedArray[i].saveFile],{ type: "application/octet-stream" })
                    zip.file(preloadedArray[i].title + ext, saveFile);
                }
            }
            for (let i = 0; i < fileArray.length; i++)
                {
                    const ext = ".save"
                    if (fileArray[i].saveFile !== null)
                    {
                        const saveFile = new Blob([fileArray[i].saveFile],{ type: "application/octet-stream" })
                        zip.file(fileArray[i].title + ext, saveFile);
                    }
                }
            zip.generateAsync({type:"blob"})
.then(function (blob) {
    saveAs(blob);
})

        
    }

    return (
        <div>
            <Tooltip title={"Backup games and saves"}>
            <IconButton onClick={handleZip}>
                <DownloadingIcon/>
            </IconButton>
            </Tooltip>
        </div>
    );
};

export default BackupButton;