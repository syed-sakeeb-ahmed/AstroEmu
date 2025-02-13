
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";
import { useMemo, useState, useEffect, use } from "react";
import { RomContext } from "./RomContext";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from "./ThemeOptions";
import { Analytics } from "@vercel/analytics/react"
import { createTheme } from '@mui/material/styles';
import { getThemeCookieValue } from "./CookieUtilities";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import RomProvider from "./RomProvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Working Title",
  description: "Web-based Emulator",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  //Holds the last theme set by the user
  //If no cookie exists then default to light mode
  let themeCookieValue = await getThemeCookieValue();

  return (
    
    <html lang="en" style={{height: '100%', display: 'flex', flexWrap: 'wrap', backgroundColor: 'black'}}>
      <body className={`${inter.className} display_flex`} style={{flexWrap: 'wrap', justifyContent: 'center'}}>
      <ThemeProviderWrapper themeCookieValue={themeCookieValue}>
        <RomProvider>
        <AppRouterCacheProvider>
          
          
            

          
          {children}
          
          
        </AppRouterCacheProvider>
        </RomProvider>
        </ThemeProviderWrapper>
        <Analytics />
        </body>
    </html>
    
  );
}
