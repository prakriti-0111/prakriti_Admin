import React from 'react';
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { useRoutes, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { getPermissions } from 'actions/employee/permissions.actions';

// routing
import routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import Pusher from 'pusher-js';
import { checkIsTokenExpired } from 'src/helpers/helper';
import {
    LOGOUT_SUCCESS
} from './actionTypes/global.types';
import secureLocalStorage  from  "react-secure-storage";

// ==============================|| APP ||============================== //

const App = (props) => {

    const customization = useSelector((state) => state.customization);
    const auth = useSelector((state) => state.auth);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { permissions } = useSelector((state) => state.employee.permissions);
    const location = useLocation();
    const dispatch = useDispatch();
    const prevAuth = usePrevious(auth);

    React.useEffect(() => {
        if(isLoggedIn){
            const isExpired = checkIsTokenExpired(auth);
            if(isExpired){
                secureLocalStorage.removeItem("auth");
                dispatch({type: LOGOUT_SUCCESS});
            }
        }
    }, [location]);

    const routing = useRoutes(routes(isLoggedIn, permissions));

    React.useEffect(() => {
        props.actions.getPermissions();
    }, []);

    /**
     * Pusher
     */
    // const pusher = new Pusher(process.env.PUSHER_KEY, {
    //     cluster: 'ap2'
    // });
    const pusher = new Pusher('09f950cd54a3bae697ec', {
        cluster: 'ap2'
    });
    const channel = pusher.subscribe('Prakriti_channel');
    channel.bind('permission_updated', (data) => {
        props.actions.getPermissions();
    });

    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1700}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        {routing}
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </SnackbarProvider>
    );
};

function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = React.useRef();
    // Store current value in ref
    React.useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ getPermissions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
