import { useState, useRef, useEffect, Component, React } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import navigation from 'menu-items';
import { drawerWidth } from 'store/constant';
import { SET_MENU } from 'store/actions';
import withRouter from 'src/helpers/withRouter';
import { bindActionCreators } from 'redux';

// assets
import { IconChevronRight } from '@tabler/icons';

//pusher
import Pusher from 'pusher-js';

import { getNotifiactions } from 'actions/superadmin/notification.actions';
import {SUPERADMIN_NOTIFICATION_ADD} from '../../actionTypes/superadmin/notification.types';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //

class MainLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            logoutSuccess: this.props.logoutSuccess,
            permissions: this.props.permissions
        }
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};

        if (props.user !== state.user) {
            update.user = props.user;
        }

        if (props.logoutSuccess !== state.logoutSuccess) {
            update.logoutSuccess = props.logoutSuccess;
        }

        if (props.permissions !== state.permissions) {
            update.permissions = props.permissions;
        }

        return update;
    }

    componentDidMount(){
        this.props.actions.getNotifiactions();

        /**
         * Pusher
         */
        const pusher = new Pusher('09f950cd54a3bae697ec', {
            cluster: 'ap2'
        });
        const channel = pusher.subscribe('Prakriti_channel');

        //notification
        const notification_key = this.state.user ? (this.state.user.id + '-notification') : 'notification';
        //console.log('notification_key', notification_key)
        //console.log('process.env.PUSHER_KEY', process.env.PUSHER_KEY)
        channel.bind(notification_key, (data) => {
            //this.props.dispatch({type: SUPERADMIN_NOTIFICATION_ADD, payload: data})
            this.props.actions.getNotifiactions();
        });
    }

    MainLayoutView = () => {
        const theme = useTheme();
        const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

        // Handle left drawer
        const leftDrawerOpened = useSelector((state) => state.customization.opened);
        const dispatch = useDispatch();
        const handleLeftDrawerToggle = () => {
            dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
        };

        useEffect(() => {
            dispatch({ type: SET_MENU, opened: !matchDownMd });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [matchDownMd]);

        let navigationObj = navigation(this.state.user.role_name, this.state.permissions);

        return (
            <Box className='theme-wrapper' sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* header */}
                <AppBar
                    className='menubar '
                  
                    enableColorOnDark
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    sx={{
                        bgcolor: theme.palette.background.default,
                        transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                    }}
                >
                    <Toolbar>
                        <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                    </Toolbar>
                </AppBar>

                {/* drawer */}
                <div className='sidemenu'>
                    <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
                </div>

                {/* main content */}
                <Main className='ratn-content' theme={theme} open={leftDrawerOpened}>
                    {/* breadcrumb */}
                    <Breadcrumbs separator={IconChevronRight} navigation={navigationObj} icon title rightAlign />
                    <Outlet />
                </Main>
            </Box>
        );
    };
    render() {
        return (
            <this.MainLayoutView />
        )
    }

};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    logoutSuccess: 'logoutSuccess' in state.auth ? state.auth.logoutSuccess : false,
    permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({getNotifiactions}, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));