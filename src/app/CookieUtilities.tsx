'use server'

import { cookies } from 'next/headers'

/*
Notes: 
Return values of all these functions are always Promise, regardless of whether
these are defined as async functions.
*/

export const setThemeCookie = async (theme) => {
    cookies().set({
        name: 'theme',
        value: theme,
        path: '/',
      })
}

export const hasThemeCookie = async () => {
    const cookieStore = cookies()
    const hasCookie = cookieStore.has('theme')
    return hasCookie;
}

//Notes:
//themeObject is an object [Not a Promise]
export const getThemeCookieObject = async () => {
    const cookieStore = cookies();
    let themeObject = cookieStore.get('theme');
    return themeObject;
}

//Notes:
//themeCookieObject is a promise
export const getThemeCookieValue = async () => {
    const themeCookieObject = await getThemeCookieObject();
    let value = 'light';
    if (themeCookieObject !== undefined) value = themeCookieObject.value;
    return value;
}
