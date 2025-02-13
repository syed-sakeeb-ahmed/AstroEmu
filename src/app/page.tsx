'use client'
import React, { useState, useEffect, useContext } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from "next/image";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {default as B} from '@mui/material/Button';
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { RomContext } from './RomContext';




//create our styles
const classes = {
  root_box: { /*p: 2, border: '1px dashed grey'*/ },
  root_container: {/*p: 2, border: '3px dashed red'*/ },
  flex_display: {display: 'flex', flex: 1}
};

const SPLASH_ASSETS_DIRECTORY_PATH = "splash_assets"



export default function HomePage() {
    const classes = {
        root_box: { /*p: 2, border: '1px dashed grey'*/ },
        root_container: {/*p: 2, border: '3px dashed red'*/ },
        flex_display: {display: 'flex', flex: 1},
        flex_dcc: {display: 'flex', justifyContent: 'center', alignItems: 'center'}
      };
    


  return (
    <div style={classes.flex_display}>
  <Container maxWidth="xl" sx={[classes.flex_display, {overflow: 'hidden'}]}>
  <Grid container spacing={0} direction={"column"} sx={[classes.root_container, classes.flex_display, {
        
        }]}>
  
   <Box component="section" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  <Typography  gutterBottom variant="h6" align='center' component="div" sx={{fontWeight: 'regular', fontSize: 'h3.fontSize'}} style={{margin: '25px 0px 25px 0px'}}>
          Play retro games on your device
        </Typography>
  
  
    <Link href='/select'><B component='label' variant="contained" color="secondary" style={{width: '200px', height: '50px', textTransform: 'none', fontSize: '20px', marginBottom: '50px'}}>
    Play now</B></Link>
  
  
 


  
  <Box component='section' sx={[classes.root_box, {display: 'flex', flexDirection: 'column', flex: 1}]}>
  <Box
  component="img"
  style={{
    maxWidth: '100%',
  }}
  alt="Gameplay video of the SNES game Nekotako"
  src={`${SPLASH_ASSETS_DIRECTORY_PATH}/dt_bar.svg`}
/>
<video autoPlay muted loop>
  <source src={`${SPLASH_ASSETS_DIRECTORY_PATH}/finalClip.mp4`} type="video/mp4"/>
  Your browser does not support the video tag.
</video>

  </Box>
  </Box>
  
  
  

</Grid>
</Container>
</div>
);
}
