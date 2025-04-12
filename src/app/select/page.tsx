'use client'
import React, { useState, useEffect, useContext, cache } from 'react';
import Image from "next/image";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, ImageList, Skeleton } from '@mui/material';
import {default as B} from '@mui/material/Button';
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { RomContext } from '../RomContext';
import { useLiveQuery } from "dexie-react-hooks";
import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {db} from '../db'
import ThemeButton from '../components/ThemeButton';
import GameDisplayCardItem from '../components/GameDisplayCard';
import GameDisplayCard from '../components/GameDisplayCard';
import SelectPageBar from '../components/SelectPageBar';

import { createAscendingArray } from '../utilities';




//create our styles
const classes = {
  root_box: { p: 2, border: '1px dashed grey' },
  root_container: {p: 2, border: '3px dashed red'},
  flex_display: {display: 'flex', flex: 1},
  select_styles: {flexDirection: 'column'},
};

async function addGame(event) {
  try {
    const file = event.target.files[0];
    const file_type = file.name.slice(-3);
    let type;
    if (file_type.localeCompare('nes'))
    {
      type = 'nes'
    }
    else if (file_type.localeCompare('sfc') || file_type.localeCompare('smc'))
    {
      type = 'snes'
    }
    else{
      throw new Error("Invalid file type");
    }

    // Add the new friend!
    const id = await db.games.add({
      file: file,
      name: file.name,
      save: null,
      type: type
    });
    console.log("This is the game id: " + id)
    
  } catch (error) {
    console.log("OOPS! Something went wrong while trying to create a game entry");
  }
}


async function deleteGame(id) {
  try {
    // Add the new friend!
    await db.games.delete(id);

    
  } catch (error) {
    console.log("OOPS! Something went wrong while trying to delete a game entry");
  }
}




export default function Home() {




  const router = useRouter();
  const gameDataObjectArray = useLiveQuery(() => db.gameData.toArray());
  console.log("This is gameDataObjectArray: " + gameDataObjectArray)
  const {globalRom, setGlobalRom} = useContext(RomContext);
  


  const API_ENDPOINT = process.env.LOCAL_API_ENDPOINT || '/';

  const handleUpload = (event) => {
  console.log("Handle upload is runnign")
  const file = event.target.files[0];
  const file_name = file.name;
  const reader = new FileReader();
  reader.onload = () => {
      const rom_data = reader.result;
      const rom_arr = new Uint8Array(rom_data);
      setGlobalRom(rom_arr);
      router.push(`/emu`)

  }

  if (file_name.endsWith('.nes'))
  {
    reader.readAsArrayBuffer(event.target.files[0]);
  }
  else if (file_name.endsWith('.sfc') || file_name.endsWith('.smc'))
  {
    setGlobalRom(file);
    router.push(`/snes`)
  }
}

const libraryGameStart = async (id, type) => {
  //console.log("Start the game!!!")
  let route = (type.localeCompare('nes')) ? '/emu' : '/snes'
  route += `?g=${id}`
  router.push(route);
  
}

const libraryGameStartNES = async (event) => {
  //console.log("Start the game!!!")
  const gameFile = event.target.files[0];
  console.log(gameFile)
  const gameObj = {
    id: 322,
    file: gameFile,
    name: 'TestNES',
    save: 'saveFile'
  }
  setGlobalRom(gameObj);
  router.push('/emu')
  
}


  const startGame = async (rom, gameId, type) => {
    let ext;
    let myRoute;
    let routeInfo;
    if (type == 'snes')
    {
      ext = '.sfc'
      myRoute = '/snes'
    }
    else if (type == 'nes')
    {
      ext = '.nes'
      myRoute = '/emu'
    }
    const rom_string = rom + ext
    //const romBlob = await fetch(API_ENDPOINT + rom_string).then(res => res.blob());
    //const romFile = new File([romBlob], rom_string)
    //console.log(romFile)
    
    const dummyGameObj = {
      id: gameId,
      file: {name: rom_string},
      name: 'dummyName',
      save: 'dummyState',
      defaultGame: true
    }
    setGlobalRom(dummyGameObj);
    router.push(myRoute + `?dg=${gameId}`)
  }

  const gameInLibrary = (title) => {
    const games = {
      'sp_gulls': 0,
      'bobli': 1,
      'twin_d': 2,
    };
    for (const [key, value] of Object.entries(games)) {
      if (key.localeCompare(title) === 0)
      {
          return true;
      }
    }
    return false;
  }

  



  return (
    <Box>
      <SelectPageBar/>
      
      <Box style={{paddingTop: '128px'}}>
    <Grid container direction='row' justifyContent={'center'} gap={1}>
      {gameDataObjectArray ? 
      
      (
      
        gameDataObjectArray.map((gameDataObject) => (
        <GameDisplayCard gameDataObject={gameDataObject} key={gameDataObject.id}/>
      ))
      
      )
       : 
       (
        createAscendingArray(7).map((item) => (
        <Box key={item}>
       <Skeleton variant='rectangular' width={300} height={300}/>
       <Skeleton width="60%" />
       </Box>
        ))
        
       )}
    </Grid>
    </Box>
    
    
    </Box>
  );
}
