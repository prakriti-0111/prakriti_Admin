import { useState, useRef, useEffect, Component, React } from 'react';
import { useNavigate,useHistory,Redirect } from 'react-router-dom';


import { useSelector, connect } from 'react-redux';
import { logout as superadminLogout } from 'actions/superadmin/auth.actions';
import { logout as distributorLogout } from 'actions/distributor/auth.actions';
import { logout as adminLogout } from 'actions/admin/auth.actions';
import { logout as employeeLogout } from 'actions/employee/auth.actions';
import { logout as teamLogout } from 'actions/team/auth.actions';
import { bindActionCreators } from 'redux';
import withRouter from 'src/helpers/withRouter';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography,
    FormControl,
    Button,
    Collapse
} from '@mui/material';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import User1 from 'assets/images/users/user.jpg';
import { isSalesExecutive, isSuperAdmin, hasPermission, isEmployee } from 'src/helpers/helper';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser, IconUserCircle, IconLock, IconCalendarEvent } from '@tabler/icons';

// ==============================|| PROFILE MENU ||============================== //

class ProfileSection extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user,
            logoutSuccess: this.props.logoutSuccess,
            permissions: this.props.permissions,
            formValues: {
                lat: '22.5726',
                lng: '88.3639',
                city: 'Kolkata',
                state: 'WB',
                country: 'India',
                zipcode: '700091'
            },
            openDialog: false,
            location_permission: 1
            
        }
        this.isSalesExecutive = isSalesExecutive();
        this.isSuperAdmin = isSuperAdmin();
        this.isEmployee = isEmployee();
    }

    static getDerivedStateFromProps(props, state){
        let update = {};

        if(props.user !== state.user){
            update.user = props.user;
        }

        if(props.logoutSuccess !== state.logoutSuccess){
            update.logoutSuccess = props.logoutSuccess;
        }
        if(props.permissions !== state.permissions){
            update.permissions = props.permissions;
        }

        return update;
    }

    componentDidUpdate(){
        if(this.state.logoutSuccess){
            //this.props.navigate('/')
            //window.location.href = process.env.BASE_URL;
        }
    }

    
    loadLocation = async() => {
        try {
            let position = await this.fetchCoordinates();
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let latlng = new google.maps.LatLng(lat, lng);
            let _this = this;
            let geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                let city = '', state = '', country = '', zip = '';
                if (status == google.maps.GeocoderStatus.OK && (results[0])) {
                    zip = results[0].address_components[results[0].address_components.length - 1].long_name;
                    country = results[0].address_components[results[0].address_components.length - 2].long_name;
                    state = results[0].address_components[results[0].address_components.length - 3].long_name;
                    city = results[0].address_components[results[0].address_components.length - 4].long_name;
                }
                _this.setState({
                  formValues: {
                        ..._this.state.formValues,
                        city: city,
                        state: state,
                        country: country,
                        zipcode: zip,
                        lat: lat,
                        lng: lng
                    },
                    location_permission: 1
                })
    
            });
    
        }catch(err){
          this.setState({
            location_permission: 1 //2
          });
        }
    }

    fetchCoordinates = async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    getCurrentAddress = () => {
        let address = [];
        let formValues = this.state.formValues;
        if(formValues.city){
            address.push(formValues.city);
        }
        if(formValues.state){
            address.push(formValues.state);
        }
        if(formValues.country){
            address.push(formValues.country);
        }
        if(formValues.zipcode){
            address.push(formValues.zipcode);
        }
        return address.join(", ");
    }

    getCurrentDateTime = () => {
        const dt = new Date();
        const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
        let date_str = `${padL(dt.getMonth()+1)}/${padL(dt.getDate())}/${dt.getFullYear()} ${dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

        return date_str;
    }

    handleSubmit = () => {
        this.props.actions.teamLogout(this.state.formValues);
    }

    handleDialogClose = () => {
        this.setState({
            openDialog: false
        })
    }

    ProfileView = () => {
        const theme = useTheme();
        const customization = useSelector((state) => state.customization);
        const navigate = useNavigate();
        const [selectedIndex, setSelectedIndex] = useState(-1);
        const [subMenuOpen, setSubMenuOpen] = useState(false);
        const [open, setOpen] = useState(false);
        /**
         * anchorRef is used on different componets and specifying one type leads to other components throwing an error
         * */
        const anchorRef = useRef(null);
        const handleLogout = async () => {
            switch (this.state.user.role_name) {
                case 'Super Admin':
                    this.props.actions.superadminLogout();
                    break;

                case 'Distributor':
                    this.props.actions.distributorLogout();
                    break;

                case 'Admin':
                    this.props.actions.adminLogout();
                    break;

                case 'Sales Executive':
                    //this.props.actions.teamLogout();
                    this.setState({
                        openDialog: true
                    }, () => {
                        this.loadLocation();
                    })
                    break;

                default:
                    this.props.actions.employeeLogout();
                    break;
            }
        };

        const handleEditProfile = (event, index) => {
            setSelectedIndex(index);
            handleClose(event);
            switch (this.state.user.role_name) {
                case 'Super Admin':
                    navigate('/super-admin/edit-profile');
                    break;
                case 'Admin':
                    navigate('/admin/edit-profile');
                    break;
                case 'Distributor':
                    navigate('/distributor/edit-profile');
                    break;
                case 'Sales Executive':
                    navigate('/sales-executive/edit-profile');
                    break;
                default:
                    navigate('/employee/edit-profile');
                    break;
            }
        }

        const handleOrderHistory=(event)=>{
            window.location.href = 'https://Prakriti.one/login';
        }
        

        const handleChangePassword = (event, index) => {
            setSelectedIndex(index);
            handleClose(event);
            switch (this.state.user.role_name) {
                case 'Super Admin':
                    navigate('/super-admin/change-password');
                    break;
                case 'Admin':
                    navigate('/admin/change-password');
                    break;
                case 'Distributor':
                    navigate('/distributor/change-password');
                    break;
                case 'Sales Executive':
                    navigate('/sales-executive/change-password');
                    break;
                default:
                    navigate('/employee/change-password');
                    break;
            }
        }

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        const handleListItemClick = (event, index, route = '') => {
            setSelectedIndex(index);
            handleClose(event);

            if (route && route !== '') {
                navigate(route);
            }
        };
        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const prevOpen = useRef(open);
        useEffect(() => {
            if (prevOpen.current === true && open === false) {
                anchorRef.current.focus();
            }
            prevOpen.current = open;
        }, [open]);


        return (
            
            <>
                <Chip
                className='profile-user'
                    sx={{
                        height: '48px',
                        alignItems: 'center',
                        borderRadius: '27px',
                        transition: 'all .2s ease-in-out',
                        borderColor: theme.palette.primary.light,
                        backgroundColor: theme.palette.primary.light,
                        '&[aria-controls="menu-list-grow"], &:hover': {
                            borderColor: theme.palette.primary.main,
                            background: `${theme.palette.primary.main}!important`,
                            color: theme.palette.primary.light,
                            '& svg': {
                                stroke: theme.palette.primary.light
                            }
                        },
                        '& .MuiChip-label': {
                            lineHeight: 0
                        }
                    }}
                    icon={
                        <Avatar
                            
                            src={this.state.user && this.state.user.image ? this.state.user.image : User1}
                            sx={{
                                ...theme.typography.mediumAvatar,
                                cursor: 'pointer'
                            }}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                        />
                    }
                    // label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                    variant="outlined"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="primary"
                />
                <Popper
                    className='profile-dropdown'
                    placement="bottom-end"
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 14]
                                }
                            }
                        ]
                    }}
                >
                    {({ TransitionProps }) => (
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2 }}>
                                            <Stack>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                        {this.state.user.name}
                                                    </Typography>
                                                </Stack>
                                                {/* <Typography variant="subtitle2">{this.state.user.role_name}</Typography> */}
                                            </Stack>
                                        </Box>
                                        <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                     
                                                    <ListItemButton
                                                        className='profile-dropdown'
                                                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                        selected={selectedIndex === 0}
                                                        onClick={(event) => handleEditProfile(event, 0)}
                                                    >
                                                        <ListItemIcon className='edit-profile-icon'>
                                                            <IconUserCircle stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Edit Profile</Typography>} />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        className='profile-dropdown'
                                                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                        selected={selectedIndex === 1}
                                                        onClick={(event) => handleChangePassword(event, 1)}
                                                    >
                                                        <ListItemIcon className='edit-password-icon'>
                                                            <IconLock stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Change Password</Typography>} />
                                                    </ListItemButton>
                                                    {
                                                        this.isSalesExecutive || this.isEmployee ?
                                                        <>
                                                        <ListItemButton
                                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                            selected={selectedIndex === 0}
                                                            onClick={(event) => handleListItemClick(event, 0, '/sales-executive/my-performance')}
                                                        >
                                                            <ListItemIcon>
                                                                <IconSearch stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography variant="body2">My Performance</Typography>} />
                                                        </ListItemButton>
                                                        <ListItemButton
                                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                            selected={selectedIndex === 0}
                                                            onClick={(event) => handleOrderHistory(event)}
                                                        >
                                                            <ListItemIcon>
                                                                <IconSearch stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography variant="body2">Order History</Typography>} />
                                                        </ListItemButton>
                                                        <ListItemButton
                                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                            selected={selectedIndex === 0}
                                                            onClick={(event) => handleListItemClick(event, 0, '/sales-executive/attendence')}
                                                        >
                                                            <ListItemIcon>
                                                                <IconCalendarEvent stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography variant="body2">Attendence</Typography>} />
                                                        </ListItemButton>
                                                        </>
                                                        : null
                                                    }
                                                   
                                                    <ListItemButton
                                                        className='profile-dropdown'
                                                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={handleLogout}
                                                    >
                                                        <ListItemIcon className='edit-logout-icon'>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                    </ListItemButton>
                                                </List>
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        </Transitions>
                    )}
                </Popper>

                <Dialog
                    className="ratn-dialog-wrapper"
                    open={this.state.openDialog}
                    onClose={this.handleDialogClose}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogContent>
                    <DialogContentText></DialogContentText>
                        <Box sx={{ flexGrow: 1, m: 0.5 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} className='create-input pt-0'>
                                    {
                                        this.state.location_permission == 2 ? 
                                        <Alert severity="error" sx={{marginBottom: '10px'}}>Please allow location permission.</Alert>
                                        :
                                        <>
                                        <FormControl fullWidth>
                                            <p><WatchLaterIcon /> {this.getCurrentDateTime()}</p>
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <p><FmdGoodIcon /> {this.getCurrentAddress()}</p>
                                        </FormControl>
                                        </>
                                    }
                                </Grid>
                                <Grid item xs={12} className="text-center pt-5">
                                    <Stack spacing={1} direction="row" justifyContent="center">
                                        <Button variant="contained" type="button" onClick={this.handleSubmit} disabled={this.state.location_permission != 1}>
                                            Logout
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    render() {
        return (
            <this.ProfileView />
        )
    }
    
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    logoutSuccess: 'logoutSuccess' in state.auth ? state.auth.logoutSuccess : false,
    permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({superadminLogout, adminLogout, distributorLogout, employeeLogout, teamLogout}, dispatch)
});

  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileSection));
