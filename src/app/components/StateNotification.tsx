'use client'
import React from 'react';
import { Snackbar, Fade, Box, Typography, Slide } from '@mui/material';
import { useState } from 'react';


const StateNotification = ({message, checked, setChecked}) => {

    const handleClose = () => {
        setChecked(false);
    }

    return (
        <div>
            <Snackbar
            message={message}
            open={checked}
            key={message}
            onClose={handleClose}
            autoHideDuration={1200}
            />
        </div>
    );
};

export default StateNotification;
