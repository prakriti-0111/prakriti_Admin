import { useState, useRef, useEffect, Component, React } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

class MenuList extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user,
            logoutSuccess: this.props.logoutSuccess,
            permissions: this.props.permissions
        }
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

    MenuListView = () => {
        const navItems = menuItem(this.state.user.role_name, this.state.permissions).items.map((item) => {
            switch (item.type) {
                case 'group':
                    return <NavGroup key={item.id} item={item} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            Menu Items Error
                        </Typography>
                    );
            }
        });
    
        return <>{navItems}</>;
    };

    render() {
        return (
            <this.MenuListView />
        )
    }

}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    logoutSuccess: 'logoutSuccess' in state.auth ? state.auth.logoutSuccess : false,
    permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
    
});

  
export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
