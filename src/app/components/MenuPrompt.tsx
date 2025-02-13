import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import {Fade} from '@mui/material';
import UnstyledInputBasic from './UnstyledInputBasic';
import { useState } from 'react';
import { text } from 'stream/consumers';
import {Button} from '@mui/material';
import {Typography} from '@mui/material';


const MenuPrompt = ({gameID, isOpen, handleClose}) => {
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
        borderRadius: '10px',
        padding: '16px'
        },
        flex: {
            display: 'flex',
        }
      };

      


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
                    <Button component="label" variant="contained" color="secondary" >Upload Game
                        <input onChange={handleUpload} multiple={false} type='file'hidden/>
                    </Button>            
                    <Button color="secondary" style={{marginLeft: 'auto', marginTop: '10px', borderRadius: '20px'}} onClick={handleDownload} variant="contained">Download Save</Button>
                </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default MenuPrompt;