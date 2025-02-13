

import { Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const tooltipTitle = "If you are experiencing any issues with the website, it may be helpful to clear the site data and cookies.\n WARNING: This will delete all games and saves"

const SiteErrorTooltip = () => {
    return (
        <Tooltip title={tooltipTitle}>
            <IconButton>
                <InfoIcon />
            </IconButton>
        </Tooltip>
    );
};

export default SiteErrorTooltip;