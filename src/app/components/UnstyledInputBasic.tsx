import * as React from 'react';
import { Input as BaseInput, InputProps } from '@mui/base/Input';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useRef } from 'react';

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) 
{
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref}/>;
});



export default function UnstyledInputBasic({placeholder, setDisabled, textRef} : {placeholder : string, setDisabled : React.Dispatch<React.SetStateAction<boolean>>, textRef : React.MutableRefObject<String>}) {
  
  const [textValue , setTextValue] = useState('')


  //Get the value in the text box
  const getValue = (e : any) => {
    textRef.current = e.target.value
    console.log("onChange is getting triggered")
    if (!textRef.current)
    {
      setDisabled(true)
    }
    else
    {
      setDisabled(false)
    }
    //console.log(`Value: ${textValue} and boolean ${textRef.current}`)
  }
  return <div><Input onChange={getValue} slotProps={{input: {maxLength: 20}}} aria-label="Game Title" placeholder={placeholder}/></div>;
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputElement = styled('input')(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  /* firefox */
  &:focus-visible {
    outline: 0;
  }
`,
);
