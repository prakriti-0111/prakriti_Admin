import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import CartSection from './CartSection';
import SaleCartSection from './SaleCartSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import {isSuperAdmin, getUserDashboardRoute, getRoleName, hasPermission} from 'src/helpers/helper';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const auth = useSelector((state) => state.auth);
    console.log("auth : ", auth);
    const user = auth ? auth.user : null;
    const permissions = useSelector((state) => state.employee.permissions.permissions);
    const navigate = useNavigate();
    const _isSuperAdmin = isSuperAdmin();

    const haveCart = (user) => {
        return (user && (user.role_name == "Admin" || user.role_name == "Distributor" || user.role_name == "Sales Executive"));
    }

    const haveSaleCart = (user) => {
        return (user && (user.role_name == "Admin" || user.role_name == "Distributor" || user.role_name == "Super Admin" || user.role_name == "Sales Executive" || user.role_name == "Manager"));
    }

    const haveNotification = (user) => {
        return (user && (user.role_name == "Admin" || user.role_name == "Distributor" || user.role_name == "Super Admin" || user.role_name == "Sales Executive" || user.role_name == "Manager"));
    }


    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>

            </Box>

            <Box sx={{ flexGrow: 1, ml: 2 }} >
                <Link to={getUserDashboardRoute(getRoleName(auth)) + "/dashboard"} style={{ textDecoration: 'none' }}>
                <div className='super-admin-heading'>
                    <span>Welcome {user && user.role_name ? (user.role_name == 'Sales Executive' ? 'SE' : user.role_name) : ''} </span>
                    <h2 style={{ color: "#fff" }}>{user && (user.role_name == 'Sales Executive'? user.name : user.company_name)}</h2>
                </div>
                </Link>
            </Box>
            {/*<Box sx={{ flexGrow: 1 }} />*/}

            {
                !_isSuperAdmin || (_isSuperAdmin && hasPermission(permissions, ['sales', 'purchase'],  ['list', 'view'])) ?
                <Box sx={{ flexGrow: 1}} >
                    <SearchSection />
                </Box>
                : null
            }



            {/*{
                haveCart(user) ?
                    <CartSection />
                    : null
            }*/}

            {
                (!_isSuperAdmin || (_isSuperAdmin && hasPermission(permissions, ['sales'],  ['list', 'view', 'edit']))) && haveSaleCart(user) ?
                <SaleCartSection />
                : null
            }

            {/* notification & profile */
                haveNotification(user) ?
                <NotificationSection />
                : null
            }

            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
