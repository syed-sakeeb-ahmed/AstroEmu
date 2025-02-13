import React from 'react';
import { IconButton } from '@mui/material';
import { ThemeStateContext } from '../ThemeStateContext';
import { useContext } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeletePrompt from "./DeletePrompt"
import { useState } from 'react';


const DeleteButton = ({style, gameId}) => {

    const setThemeStateObject = useContext(ThemeStateContext);
    const [deleteOpen, setDeleteOpen] = useState(false)

    const currentTheme = setThemeStateObject.currentTheme;

    const handleDelete = () => {
        setDeleteOpen(true)
    }

    return (
        <>
        <IconButton onClick={handleDelete} style={style} sx={[{ bgcolor: (currentTheme === 'dark') ?'#3d3b3b' : "#C0C0C0"},{
            '&:hover': {
              bgcolor: '#bf2519',
      
            },
          },]} size="large" disableRipple={false} ><DeleteForeverIcon color="inherit" fontSize='inherit'/></IconButton>
          <DeletePrompt gameID={gameId} isOpen={deleteOpen} handleClose={() => {setDeleteOpen(false)}}/>
          </>
    );
};

export default DeleteButton;