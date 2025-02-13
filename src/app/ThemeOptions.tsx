import { createTheme, ThemeOptions } from '@mui/material/styles';



export const light: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#fff',
          },
          secondary: {
            main: '#121212',
          },
          background: {
              default: '#fff',
              paper: '#fff'
          },
        },
          
          components: {
            MuiSnackbarContent: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#fff',
                        color: '#000'
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'white',
                        color: 'black'
                    }
                }
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'white',
                        color: 'black'
                    }
                }
            },

            MuiTooltip : {
              styleOverrides: {
                tooltip: {
                  backgroundColor: 'black',
                  color: 'white'
                }
              }
            }

          },
  };

export const dark : ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#121212',
          },
          secondary: {
            main: '#fff',
          },
          background: {
              default: '#191919',
              paper: '#121212'
          },
        },
          typography: {
            allVariants: {
              color: "white"
            },
          },
          components: {
            MuiSnackbarContent: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'black',
                        color: 'white'
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'black',
                        color: 'white'
                    }
                }
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'black',
                        color: 'white'
                    }
                }
            },
            
            MuiCardActionArea: {
                styleOverrides: {
                    root: {
                        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                    }
                }
            },

            MuiTooltip : {
              styleOverrides: {
                tooltip: {
                  backgroundColor: 'white',
                  color: 'black'
                }
              }
            }

        }
  }

export const themeOptions: ThemeOptions = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#a320bf',
      },
      background: {
          default: '#a320bf'
      },
    },
    typography: {
      allVariants: {
        color: "white"
      },
    },
    components: {
      MuiButton: {
          styleOverrides: {
              root: {
                  backgroundColor: 'blue',
                  color: 'white'
              }
          }
      }
    }
  };



export const testTheme = createTheme(themeOptions)

export const darkTheme = createTheme(dark);
export const lightTheme = createTheme(light);