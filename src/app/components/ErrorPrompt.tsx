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

const ErrorPrompt = ({isOpen, handleClose, message}) => {
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
            flexDirection: 'column'
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
            <Typography variant='h5'>An error has occured</Typography>
            <Typography style={{marginTop: '10px'}}>{message}</Typography>
            <Button color="secondary" style={{marginLeft: 'auto', marginTop: '10px', borderRadius: '20px'}} onClick={handleClose} variant="contained">Ok</Button>
                </Box>
                </Fade>
            </Modal>
        </div>
    );
};
//
export default ErrorPrompt;