import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    Badge
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell, IconUserCircle } from '@tabler/icons';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { SUPERADMIN_NOTIFICATION_READ } from '../../../../actionTypes/superadmin/notification.types';
import { readNotifiaction } from 'actions/superadmin/notification.actions';
import { getRoleName, getUserDashboardRoute } from 'src/helpers/helper';
import { RadarController } from 'chart.js';

// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];


// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [notifications, setNotification] = useState([]);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notification = useSelector((state) => state.superadmin.notification);
    //const notificationList = notification.items;
    //const notificationTotal = notification.total;
    //const notificationNew = notification.new;

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
    };

    const handleNotificationClick = (grp_index, index, item) => {
        if (!item.is_read) {
            if (item.type != 'purchase_due' && item.type != 'sale_due' && item.type != 'sale_settlement') {
                dispatch({ type: SUPERADMIN_NOTIFICATION_READ, payload: { index: grp_index, item_index: index } });
                dispatch(readNotifiaction(item.id))
            }
        }
        if (auth) {
            setOpen(false);
            navigate(getUserDashboardRoute(getRoleName(auth)) + item.redirect_url);
        }
    }

    console.log('notification', notification)

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
                className="cart_header_sec"
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        className='header-avatar'
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <div className='c-heading'>
                            <Badge badgeContent={notification.new} color="secondary">
                                <IconBell stroke={1.5} size="1.3rem" />
                            </Badge>
                        </div>
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                className='notifation-list'
                placement={matchesXs ? 'bottom' : 'bottom-end'}
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
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>



                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2 }} className='notification'>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center" className='notification_wrapper'>
                                                <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                    <h2 className='notification_header'> Notifications </h2>
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                    <List
                                        component="nav"
                                        className='single-notification'
                                        sx={{
                                            width: '100%',
                                            maxWidth: 400,
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
                                        <div className='wrapper_notification'>
                                            {notification.items.map((row, index) => (

                                                <ListItemButton key={index}
                                                    className={!row.is_read ? "active" : ""}
                                                >
                                                    <h6>{row.label}</h6>
                                                    {
                                                        row.items ?
                                                            <>
                                                                {row.items.map((r, i) => (
                                                                    <React.Fragment key={i}>
                                                                        <div className='notification_items' onClick={() => handleNotificationClick(index, i, r)}>
                                                                            <ListItemIcon>
                                                                                <CircleNotificationsIcon stroke={1.5} size="1.3rem" />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={<Typography variant="body2">{r.message}</Typography>} />
                                                                        </div>
                                                                        <div className='notification_date'>{r.created_at}</div>
                                                                    </React.Fragment>
                                                                ))}
                                                            </>
                                                            : null
                                                    }
                                                </ListItemButton>

                                            ))}

                                        </div>

                                    </List>
                                </MainCard>





                                {/*<MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        {/*<Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle1">All Notification</Typography>
                                                        <Chip
                                                            size="small"
                                                            label="01"
                                                            sx={{
                                                                color: theme.palette.background.default,
                                                                bgcolor: theme.palette.warning.dark
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Typography component={Link} to="#" variant="subtitle2" color="primary">
                                                        Mark as all read
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                                        </Grid>
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                <Grid container direction="column" spacing={2}>
                                                   <Grid item xs={12}>
                                                        <Box sx={{ px: 2, pt: 0.25 }}>
                                                            <TextField
                                                                id="outlined-select-currency-native"
                                                                select
                                                                fullWidth
                                                                value={value}
                                                                onChange={handleChange}
                                                                SelectProps={{
                                                                    native: true
                                                                }}
                                                            >
                                                                {status.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{ my: 0 }} />
                                                                </Grid>
                                                                hello there
                                                </Grid>
                                                <NotificationList />
                                            </PerfectScrollbar>
                                                                </Grid>
                                    </Grid>
                                    <Divider />
                                     <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button size="small" disableElevation>
                                            View All
                                        </Button>
                                                                </CardActions>
                                </MainCard> */}
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};


export default NotificationSection;
