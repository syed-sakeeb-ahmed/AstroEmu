import React from 'react';
import { Button } from '@mui/material';
import MenuPrompt from './MenuPrompt';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { saveAs } from 'file-saver';
import { db } from '../db';
import StateNotification from './StateNotification';
import { useState, useContext } from 'react';
import zIndex from '@mui/material/styles/zIndex';
import { changeTheme } from '../utilities';



const MenuButton = ({emulationController, gameID, menuToggle}) => {

    const [checked, setChecked] = useState(false)
    const [message, setMessage] = useState("gg")
    
    /*const handleClose = () => {
        menuToggle.setMenuIsOpen(false)
    }*/
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (anchorEl == null)
        {
            setAnchorEl(event.currentTarget);
        }
        setOpen(true)
    };
    const handleClose = () => {
      setOpen(false)
    };

    const validateFile = (filename : string) => {
        if (filename.slice(-5).localeCompare(".save") === 0)
        {
            return true
        }
        return false
      }

      const handleDownload = async () => {
        //console.log(typeof gameID)
        handleClose()
        const gameObject = await db.gameData.get(gameID)
        //console.log("This is gameobject" + gameObject.title)
        const saveFile = gameObject.saveFile
        if (saveFile === null)
        {
            console.log("Save file does not exist")
            return
        }
        const state = saveFile.state
        //console.log(`${gameObject.title}`)
        saveAs(state, `${gameObject.title}.save`)
      }

      const handleUpload = async (e) => {
        console.log("Upload button has been pressed!!!");
        console.log("This is the files array: " + e.target.files)
        if (e.target.files && e.target.files.length == 1)
        {
            //console.log("This is the file name " + e.target.files[0].name)
            const uploadedFile = e.target.files[0]
            const isValid = validateFile(uploadedFile.name)

            if (isValid === true)
            {
                await db.gameData.update(gameID, {saveFile: {state: uploadedFile, thumbnail: {}}});
                setMessage('Success')
            }
            else
            {
                setMessage("Something went wrong. Please try again.")
            }
            setChecked(true)
            console.log("Set it to true")
        }
        e.target.value = null // This will clear the buffer. So upload prompt shows up even if the same file is chosen
        //console.log(`This is the textRef on open prompt: ${textRef.current}`)
    }
  
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color='secondary'
        >
          Menu
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          variant='selectedMenu'
        >
          <MenuItem component="label" htmlFor="test" onClick={handleClose}>
          Upload save
          </MenuItem>
          <MenuItem onClick={handleDownload}>Download save</MenuItem>
        </Menu>
        
        <input id="test" onChange={handleUpload} multiple={false} type='file'hidden/>
        <StateNotification message={message} checked={checked} setChecked={setChecked}></StateNotification>
      </div>
    );
};

/*
<Button onClick={() => {menuToggle.setMenuIsOpen(true)}} color='secondary'>Menu</Button>
            <MenuPrompt gameID={gameID} isOpen={isOpen} handleClose={handleClose}></MenuPrompt>
*/

export default MenuButton;