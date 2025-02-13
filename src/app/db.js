import Dexie from 'dexie';

export const db = new Dexie('GameData');

db.version(1).stores({
  gameData: '++id, title, platform, isPreloaded, saveFile, gameFile, extension' // Primary key and indexed props 
});

db.on("populate", function() {

    //Preloaded NES games
    db.gameData.add({title: 'Space Gulls', platform: 'nes', isPreloaded: 1, saveFile: null, gameFile: null, extension: null});
    db.gameData.add({title: 'Bobl', platform: 'nes', isPreloaded: 1, saveFile: null, gameFile: null, extension: null});    
    db.gameData.add({title: 'Twin Dragons', platform: 'nes', isPreloaded: 1, saveFile: null, gameFile: null, extension: null});

    //Preloaded SNES games
    db.gameData.add({title: 'SuperCooked', platform: 'snes', isPreloaded: 1, saveFile: null, gameFile: null, extension: null});
    db.gameData.add({title: 'Super Boss Gaiden', platform: 'snes', isPreloaded: 1, saveFile: null, gameFile: null, extension: null});
    db.gameData.add({title: 'Nekotako', platform: 'snes', isPreloaded: 1, saveFile: null, gameFile: null, extension: null});
    
  });