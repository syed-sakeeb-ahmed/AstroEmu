
import dynamic from 'next/dynamic'

const EmulationMachine = dynamic(() => import('./Emulator'), {
    ssr: false,
  })
  
const EmulatorWrapperNoSSR = ({gameID, platform}) => {
return (
    <EmulationMachine gameID={gameID} platform={platform} />
);
};
  
export default EmulatorWrapperNoSSR;