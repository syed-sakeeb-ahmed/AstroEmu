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
import {db} from "../db"

const ErrorPrompt = ({isOpen, handleClose, gameID}) => {
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
        padding: '20px',
        borderRadius: '10px'
        },
        flex: {
            display: 'flex',
            flexDirection: 'column'
        }
      };

      const deletePermanently = () => {
        handleClose()
        console.log("Deleted Permanently")
        db.gameData.delete(gameID)
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
                    <Typography variant="h5">Delete permanently?</Typography>
            <Typography style={{marginTop: '10px', marginBottom: '10px'}}>Game will be permanently deleted</Typography>
            <div style={{display: 'flex'}}>
            <Button onClick={handleClose} style={{borderRadius: '15px', marginLeft: 'auto', textTransform: 'none'}} color="secondary" variant="text">Cancel</Button>
            <Button onClick={deletePermanently} style={{borderRadius: '15px', marginLeft: '10px', textTransform: 'none'}} color="secondary" variant="contained">Delete permanently</Button>
            </div>
                </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ErrorPrompt;