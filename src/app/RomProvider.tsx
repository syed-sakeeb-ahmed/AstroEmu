'use client'

import { useState } from "react";
import { RomContext } from "./RomContext";

const RomProvider = ({children} : {children : React.ReactNode}) => {
    const [globalRom, setGlobalRom] = useState(null);
    const globalRomStateProviderValue = {
        globalRom,
        setGlobalRom
    } 

    return (
        <RomContext.Provider value={globalRomStateProviderValue}>
            {children}
        </RomContext.Provider>
    );
};

export default RomProvider;