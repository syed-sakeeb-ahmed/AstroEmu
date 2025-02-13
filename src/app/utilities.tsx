
import { GAME_ROM_LOCATION } from "./constants";
import { setThemeCookie } from './CookieUtilities';

export const preloadedGameFileNameMap = (gameTitle) => {
    switch(gameTitle) {
      case 'Space Gulls':
        return 'Space_Gulls';
      case 'Bobl':
        return 'Bobl';
      case 'Twin Dragons':
        return 'Twin_Dragons';
      case 'SuperCooked':
        return 'SuperCooked';
      case 'Super Boss Gaiden':
        return 'Super_Boss';
      case 'Nekotako':
        return 'Nekotako';
    }
  }


  export const getPreloadedGameFilePath = (gameTitle, platform) => {
    const gameFileName = preloadedGameFileNameMap(gameTitle);
    const gameFileFullPath = `${GAME_ROM_LOCATION}/${platform}/${gameFileName}`
    return gameFileFullPath;
  }

  
  export const loadGameFile = {
    serverSide: async (filePath) => {
      const fileData = await fetch(filePath);
      return fileData;
    }
  }

  export const changeTheme = (currentTheme, setCurrentTheme) => {
    if (currentTheme === 'dark')
    {
        setCurrentTheme('light');
        setThemeCookie('light');
    }
    else if (currentTheme === 'light')
    {
        setCurrentTheme('dark');
        setThemeCookie('dark');
    }
    
  }


  export const createAscendingArray = (n : number) => {
    const ascArray = [];
    for (let i = 1; i <= n; i++)
    {
      ascArray.push(i);
    }
    return ascArray;
  }