'use server'

import { redirect } from "next/navigation";
import Emulator from "../components/Emulator";
import EmulatorWrapperNoSSR from "../components/EmulatorWrapperNoSSR";


/* 
Note on searchParams:
*(url?g=string with spaces) will return "string with spaces" in searchParams.g. *Parentheses added for clarity
url?g=3 will return '3' in searchParams.g
url?g= will return "" in searchParams.g
url?g will return "" in searchParams.g
url? will return undefined in searchParams.g
url will return undefined in searchParams.g
*/

//Returns false on undefined or if platform not in list
const isSupportedPlatform = (platform) => {
    const platforms = ['nes', 'snes'];
    return platforms.includes(platform);
}

//Returns undefined if params is empty
const getPlatformViaParams = (params) => {
    return Object.values(params)[0];
}

//Note: IndexedDB ids start from 1 not 0
const isSupportedSearchParam = (searchParams) => {
    let output = false;
    let convertedNumber = null;
    if (searchParams.hasOwnProperty('g'))
    {
        if (searchParams.g !== undefined && searchParams.g !== '')
        {
            convertedNumber = Number(searchParams.g);
        }

    }

    if (convertedNumber !== null && !isNaN(convertedNumber)) output = true;

    return output;
}

const extractSearchParamValue = (searchParams, param) => {
    return searchParams[param];
}

const EmulatorOverlay = ({
    params,
    searchParams,
  }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }) => {

    const platformString = getPlatformViaParams(params);
    const searchParamNumber = Number(extractSearchParamValue(searchParams, 'g'));
    const isValidPlatform = isSupportedPlatform(platformString);
    const isValidSearchParam = isSupportedSearchParam(searchParams);

    
    if (!isValidPlatform || !isValidSearchParam)
    {
        redirect('/select')
    }
    
    return (
       <EmulatorWrapperNoSSR gameID={searchParamNumber} platform={platformString} />
    )
};


export default EmulatorOverlay;