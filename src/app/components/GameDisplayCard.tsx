import { useState } from 'react';

import { GAME_GIF_LOCATION } from '../constants';

import { preloadedGameFileNameMap } from '../utilities'; 
import DeleteButton from './DeleteButton';
import { Card, Typography, CardActionArea, CardMedia, CardActions} from '@mui/material';
import Link from 'next/link';
import {Button} from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';



const GameDisplayCard = ({gameDataObject}) => {

    const gamePlatform = gameDataObject.platform;
    const gameTitle = gameDataObject.title;
    const gameIsPreloaded = gameDataObject.isPreloaded;
    const gameFileName = preloadedGameFileNameMap(gameTitle);
    const gameID = gameDataObject.id;
    
    
    const gameGifLocation = (gameIsPreloaded) ? `${GAME_GIF_LOCATION}/${gamePlatform}/${gameFileName}.gif` : `${GAME_GIF_LOCATION}/default.webp`

    const [isMouseHoveringOnCard, setIsMouseHoveringOnCard] = useState(false);
    const [caaRippleIsDisabled, setCaaRippleIsDisabled] = useState(false) //CAA = Card Action Area

    const handleHoverEnter = () => {
      setIsMouseHoveringOnCard(true);
    }
    //style={{position: 'absolute', top: 0, right: 0, marginRight: '10px', marginTop: '10px'}} onClick={() => {console.log("GG")}} 
    const handleHoverLeave = () => {
      setIsMouseHoveringOnCard(false);
    }
    
    const styles = {
      CardActionArea: {height: '100%'},
      CardMedia: {height: '100%'},
      Typography: {fontWeight: '500', paddingTop: '7px'}
    }
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Card 
        onMouseOver={handleHoverEnter} 
        onMouseLeave={handleHoverLeave} 
        elevation={isMouseHoveringOnCard ? 24 : 0} 
        variant={isMouseHoveringOnCard ? 'elevation' : 'outlined'}
        sx={{ width: 300, height: 300, borderRadius: (isMouseHoveringOnCard ? 0 : 2) , transition: 'border-radius 1s, box-shadow 0.3s', position: 'relative'}}
        >
          { (gameDataObject.isPreloaded === 0) ? < DeleteButton gameId={gameDataObject.id} style={{position: 'absolute', top: 0, right: 0, marginRight: '10px', marginTop: '10px', zIndex: '3'} }/> : <></>}
          <CardActionArea disableRipple={true} style={styles.CardActionArea}>            
          <Link href={`${gamePlatform}?g=${gameID}`}>
            <CardMedia
              component="img"
              height="400"
              image={`${gameGifLocation}`}
              alt={`Short Gameplay Gif for the Game ${gameTitle}`}
              style={styles.CardMedia}
            />
            </Link>
          </CardActionArea>
        </Card>
              <Typography variant="h5" component="div" style={styles.Typography}>
              {gameTitle}
            </Typography>
            </div>
      );
};

export default GameDisplayCard;