
import ThemeButton from './ThemeButton';
import SiteErrorTooltip from './SiteErrorTooltip';
import UploadButton from './UploadButton';
import { AppBar, Toolbar, Button, Grid, Box } from '@mui/material';
import BackupButton from './BackupButton';
import Link from 'next/link';
import { useEffect } from 'react';
import {db} from "../db"


const style = {
    AppBar: {maxHeight: '64px'}
}

const SelectPageBar = () => {
    let game = null
    let ourl = null;

    

    useEffect(() => {
        const gg = async () => {
            const fileArray = await db.gameData.where("isPreloaded").equals(false).toArray()
            let zip = new JSZip();
            for (let i = 0; i < fileArray.length; i++)
            {
                zip.file(fileArray[i].title, fileArray[i].gameFile);
                if (fileArray[i].saveFile.state != null)
                {
                    zip.file(fileArray[i].title + ".save", fileArray[i].saveFile.state)
                }
            }
            zip.generateAsync({type:"blob"})
.then(function (blob) {
    saveAs(blob);
})
            /*game = file[0].gameFile
            console.log("Created file object url")
            ourl = URL.createObjectURL(game)
            console.log(ourl + "This is ourl")
            URL.revokeObjectURL(ourl)*/
        }
    }, [])
    
    const handleClick = () => {
        console.log("Revoked!!")
        
    }
    

    return (
        <AppBar position='fixed' style={style.AppBar}>
            <Toolbar>
                <SiteErrorTooltip/>
                <BackupButton/>
                <ThemeButton/>
                <Box sx={{marginLeft: 'auto'}}>
                    <UploadButton />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SelectPageBar;