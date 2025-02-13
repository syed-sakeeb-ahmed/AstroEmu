import React from 'react';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { IconButton } from '@mui/material';
import {db} from "../db"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Tooltip } from '@mui/material';

const BackupButton = () => {

    const getExtension = (filename : string) => {
        const ext = filename.slice(-4);
        return ext;
    }

    const handleZip = async () => {
        const fileArray = await db.gameData.where("isPreloaded").equals(0).toArray()
        let zip = new JSZip();
            for (let i = 0; i < fileArray.length; i++)
            {
                const ext = getExtension(fileArray[i].gameFile.name)
                zip.file(fileArray[i].title + ext, fileArray[i].gameFile);
            }
        const preloadedArray = await db.gameData.where("isPreloaded").equals(1).toArray()
        for (let i = 0; i < preloadedArray.length; i++)
            {
                const ext = ".save"
                if (preloadedArray[i].saveFile !== null)
                {
                    zip.file(preloadedArray[i].title + ext, preloadedArray[i].saveFile.state);
                }
            }
            zip.generateAsync({type:"blob"})
.then(function (blob) {
    saveAs(blob, "backup.zip");
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