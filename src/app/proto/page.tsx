'use client'

import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';


const page = () => {
    const dataObjArr = useLiveQuery(() => db.gameData.toArray());
    return (
        <div>
           gamer
        </div>
    );
};

export default page;