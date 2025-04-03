import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import PrakritiLogo from 'assets/images/logo_prakriti2.jpeg'; /* logo_ratn.png */
import RatnviharLogo from 'assets/images/logo_ratn.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const hostname = window.location.hostname;
    const Logo = hostname.includes("patna")?RatnviharLogo:PrakritiLogo;

    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            {/*--- <Logo /> ----*/}
            <img src={Logo} className='nav_logo' alt='' />
        
        </ButtonBase>
    );
};

export default LogoSection;
